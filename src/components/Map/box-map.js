import MapboxGLHelper from "./helpers/mapboxgl-helper";
import MapInteractionHelper from "./helpers/mapinteraction-helper";
import DrawHelper from "./helpers/draw-helper";
import DataEditorHelper from "./helpers/dataeditor-helper";
import MapGeoJSONHelper from "./helpers/geojson-helper";
import BaseMapContainer from "./containers/base-map-container";
import  "mapbox-gl";
import { html } from "lit";

import './map-tool-panel';
import { dataEditorStore } from "../../libs/dataeditor-store";

export default class BoxMap extends BaseMapContainer {
    static get properties() {
        return {
            className: {type: String},
            stateId: { type: String },
            dataSource: { type: Object },
            glStyle: { type: Object },
            showScale: { type: Boolean },
            navPosition: { type: String },
            interactionBufferSize: { type: Number },
            fitBounds: { type: Array },
            fitBoundsOptions: { type: Object },
            dataEditorState: { type: Object, state: true },
            showMapTools: { type: Boolean },
            selectedFeature: { type: Object, state: true },
            selected: { type: Boolean, state: true },
            mapLoaded: { type: Boolean, state: true },
            enableMeasurementTools: { type: Boolean, state: true }
        }
    }

    constructor() {
        super();

        this.className = '';
        this.interactive = true;
        this.overlayMapStyle = {};
        this.stateId = '';
        this.dataSource = null;
        this.mapBox =  undefined;
        this.interactionBufferSize = 10;
        this.containers = {baseMapState: {}, dataEditorState: {}, mapState: {}};
        this.showScale = true;
        this.navPosition = 'top-right';
        this.showMapTools = true;
        this.glStyle = {};

        this.mapLoaded = false;
        this.selected = false;
        this.selectedFeature = null;
        this.enableMeasurementTools = false;

        this.fetchTempoSource = this.fetchTempoSource.bind(this);
        this.loadMap = this.loadMap.bind(this);

        // EVENTS
        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);

        // GeoJSON HELPER
        this.initGeoJSON = this.initGeoJSON.bind(this);

        // MapboxGL HELPER
        this.getBounds = this.getBounds.bind(this);
        this.getPosition = this.getPosition.bind(this);

        // DataEditor HELPER
        this.startEditingTool = this.startEditingTool.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.containers.mapState = this;
        console.log(this.containers.mapState);

        dataEditorStore.subscribe(this.containerStateChanged);
        this.containerStateChanged();

        this.fetchTempoSource();
        this.loadMap();
    }

    disconnectedCallback() {
        if (this.mapBox) {
            this.mapBox.remove();
        }
        dataEditorStore.unsubscribe(this.containerStateChanged);
        super.disconnectedCallback();
    }

    willUpdate(changedProperties) {
        console.log('CHANGED PROPERTIES', changedProperties);

        if (changedProperties.has('data')) {
            this.initGeoJSON(this.data);
        }
    }

    updated(changedProperties) {
        console.log('CHANGED PROPERTIES', changedProperties);
        
    }

    fetchTempoSource() {
        const response = fetch('https://docs.mapbox.com/mapbox-gl-js/assets/ne_50m_urban_areas.geojson');

        response.then((dataSources) => {
            const dataJSON = dataSources.json();
            dataJSON.then((dataFeatures) => {
                this.dataSource = dataFeatures;
                console.log('WHAT FETCH TEMPO DO', this.data);
            })
        }).catch((error) => {
            console.log('FETCH TEMPO ERROR', error);
        })
    }


    containerStateChanged() {
        const editorState = dataEditorStore.getState();
        this.dataEditorState = editorState.getState();

        console.log('IS THERE ANY DATA EDITOR STATE', this.dataEditorState);
    }

    addMapData(map, glStyle, geoJSON, cb) {
        const style = this.overlayMapStyle || glStyle;
        if (style && style.sources) {
            console.log('STYLE SOURCES');
        } else if (geoJSON) {
            this.initGeoJSON(geoJSON);
            cb();
        } else {
            cb();
        }
    }

    loadMap() {
        // eslint-disable-next-line no-undef
        mapboxgl.accessToken = this.mapboxAccessToken;
        const { data, mapLoaded, fitBounds, fitBoundsOptions } = this;

        // eslint-disable-next-line no-undef
        const mapBox = new mapboxgl.Map({
            container: this.stateId,
            style: 'mapbox://styles/mapbox/satellite-v9',
            zoom: 4,
            interactive: this.interactive,
            minZoom: 0,
            maxZoom: 22,
            touchZoomRotate: true,
            touchPitch: false,
            center: [-88.137343, 35.137451],
        });

        mapBox.on('error', (err) => {
            console.log(err.error);
        })


        let sampleLayer;

        mapBox.on('load', () => {
            console.log('MAP LOADED');
            setTimeout(() => {
                this.getRootNode().documentElement.querySelector('body').append('<div id="map-load-complete" style="display: none;"></div>');
            }, 5000);

            const layers = mapBox.getStyle().layers;
                // Find the index of the first symbol layer in the map style.
                let firstSymbolId;
                for (const layer of layers) {
                    if (layer.type === 'symbol') {
                        firstSymbolId = layer.id;
                        break;
                    }
                }

            this.requestUpdate();
            console.log('IS THERE ANY DATA HERE', this.dataSource);

            // SAMPLE SOURCE
            this.initGeoJSON(this.dataSource);

            sampleLayer = {
                'id': 'urban-areas-fill',
                'type': 'fill',
                'source': 'urban-areas',
                'layout': {},
                'paint': {
                'fill-color': '#f08',
                'fill-opacity': 1
                },
                // This is the important part of this example: the addLayer
                // method takes 2 arguments: the layer as an object, and a string
                // representing another layer's name. If the other layer
                // exists in the style already, the new layer will be positioned
                // right before that layer in the stack, making it possible to put
                // 'overlays' anywhere in the layer stack.
                // Insert the layer beneath the first symbol layer.
                    firstSymbolId
                },
            
            mapBox.addLayer(sampleLayer);

            this.dispatchEvent(new CustomEvent('map-onload', {detail: { layer: sampleLayer }, composed:  true, bubbles: true }))

            this.startEditingTool(sampleLayer);
        });

        mapBox.on('style.load', () => {
            if (!data && !mapLoaded && fitBounds) {
                let bounds = fitBounds;
                if (bounds.length > 2) {
                    bounds = [[fitBounds[0], fitBounds[1]], [fitBounds[2], fitBounds[3]]]
                }
                console.log(`fitting map to bounds: ${bounds.toString()}`)
                mapBox.fitBounds(fitBounds, fitBoundsOptions);
            }
        })


        if (this.interactive) {
            // eslint-disable-next-line no-undef
            mapBox.addControl(new mapboxgl.NavigationControl({ showCompass: false }), this.navPosition);
        }

        this.mapBox = mapBox;
        console.log("IS IT INITIALIZED", this.mapBox);

        this.mapLoaded = true;
        console.log("MAP LOADED", this.mapLoaded);

        this.mapBox.on('mousemove', this._mouseMoveHandler)
        this.mapBox.on('moveend', this._moveEndHandler)
        this.mapBox.on('click', this._clickHandler)
    }


    _mouseMoveHandler(e) {
        e.preventDefault();
        if (!this.mapBox) {
            return;
        }
        return MapInteractionHelper.mousemoveHandler.bind(this)(e);
    }

    _moveEndHandler = () => {
        console.log('mouse up fired', this.getPosition());
        this.updateMapPosition(this.getPosition());
    }

    _clickHandler = (e) => {
        if (!this.mapBox) {
            return;
        }
        return MapInteractionHelper.clickHandler.bind(this)(e);
    }

    // Geo JSON Helper

    initGeoJSON = (data) => {
        return MapGeoJSONHelper.initGeoJSON.bind(this)(data);
    }

    // Data Editor Helper

    getEditorStyles = () => {
        return DataEditorHelper.getEditorStyles.bind(this)();
    }

    /**
     * 
     * @param {Layer} layer 
     * @returns 
     */
    startEditingTool = (layer) => {
        return DataEditorHelper.startEditingTool.bind(this)(layer);
    }

    /**
     * 
     * @param {any} e 
     * @returns 
     */
    updateEdits = (e) => {
        return DataEditorHelper.updateEdits.bind(this)(e);
    }

    /**
     * 
     * @param {Object} feature 
     * @returns 
     */
    editFeature = (feature) => {
        return DataEditorHelper.editFeature.bind(this)(feature);
    }

    // MapboxGL Helper

    getPosition = () => {
        return MapboxGLHelper.getPosition.bind(this)();
    }

    getBounds = () => {
        return MapboxGLHelper.getBounds.bind(this)();
    }

    // Draws Helper

    toogleMeasurementTools = (enable) => {
        return DrawHelper.toggleMeasurementTools.bind(this)(enable);
    }

    render() {
       return  html`
            <div>
            ${this.showMapTools ? html`
                <map-tool-panel>
                    </map-tool-panel>
            ` : ``}
            ${this.enableMeasurementTools ? html`
                <div id="measurement-tools">
                    <span>Measurement Message</span>
                </div>
            ` : ``}
            ${this.mapLoaded && html`<slot></slot>`}
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
    
}

customElements.define('box-map', BoxMap);