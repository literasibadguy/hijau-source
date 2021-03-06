import MapboxGLHelper from "./helpers/mapboxgl-helper";
import MapInteractionHelper from "./helpers/mapinteraction-helper";
import DrawHelper from "./helpers/draw-helper";
import DataEditorHelper from "./helpers/dataeditor-helper";
import BaseMapContainer from "./containers/base-map-container";
import  "mapbox-gl";
import { html } from "lit";

import './map-tool-panel';

export default class BoxMap extends BaseMapContainer {
    static get properties() {
        return {
            className: {type: String},
            stateId: { type: String },
            data: { type: Object },
            glStyle: { type: Object },
            showScale: { type: Boolean },
            navPosition: { type: String },
            interactionBufferSize: { type: Number },
            fitBounds: { type: Array },
            fitBoundsOptions: { type: Object },
            containers: {
                baseMapState: { type: Object },
                dataEditorState: { type: Object },
                mapState: { type: Object }
            },
            showMapTools: { type: Boolean },
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
        this.mapBox =  undefined;
        this.interactionBufferSize = 10;
        this.containers = {baseMapState: {}, dataEditorState: {}, mapState: {}};
        this.showScale = true;
        this.navPosition = 'top-right';
        this.showMapTools = true;

        this.mapLoaded = false;
        this.enableMeasurementTools = true;

        // EVENTS
        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);

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

        this.loadMap();
    }

    disconnectedCallback() {
        if (this.mapBox) {
            this.mapBox.remove();
        }
        super.disconnectedCallback();
    }

    willUpdate(changedProperties) {
        console.log('CHANGED PROPERTIES', changedProperties);
    }

    updated(changedProperties) {
        console.log('CHANGED PROPERTIES', changedProperties);
        
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

            // SAMPLE SOURCE
            mapBox.addSource('urban-areas', {
                'type': 'geojson',
                'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_50m_urban_areas.geojson'
                });

            sampleLayer = {
                'id': 'urban-areas-fill',
                'type': 'fill',
                'source': 'urban-areas',
                'layout': {},
                'paint': {
                'fill-color': '#f08',
                'fill-opacity': 0.4
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

    // Data Editor Helper

    getEditorStyles = () => {
        return DataEditorHelper.getEditorStyles.bind(this)();
    }

    startEditingTool = (layer) => {
        return DataEditorHelper.startEditingTool.bind(this)(layer);
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