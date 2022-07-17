import MapboxGLHelper from "./helpers/mapboxgl-helper";
import MapInteractionHelper from "./helpers/mapinteraction-helper";
import DrawHelper from "./helpers/draw-helper";
import DataEditorHelper from "./helpers/dataeditor-helper";
import BaseMapContainer from "./containers/base-map-container";
import  "mapbox-gl";
import { html } from "lit";

export default class BoxMap extends BaseMapContainer {
    
    static get properties() {
        return {
            className: {type: String},
            stateId: { type: String },
            data: { type: Object },
            showScale: { type: Boolean },
            navPosition: { type: String },
            interactionBufferSize: { type: Number },
            containers: {
                baseMapState: { type: Object },
                dataEditorState: { type: Object },
                mapState: { type: Object }
            },
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

        this.enableMeasurementTools = false;

        // EVENTS
        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);

        // MapboxGL HELPER
        this.getBounds = this.getBounds.bind(this);
        this.getPosition = this.getPosition.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.containers.mapState = this;
        console.log(this.containers.mapState);

        this.loadMap();
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

        // eslint-disable-next-line no-undef
        const mapBox = new mapboxgl.Map({
            container: this.stateId,
            style: 'mapbox://styles/mapbox/satellite-v9',
            zoom: 0,
            interactive: this.interactive,
            minZoom: 0,
            maxZoom: 22,
            touchZoomRotate: true,
            touchPitch: false,
            center: [0, 0],
        });

        mapBox.on('error', (err) => {
            console.log(err.error);
        })


        mapBox.on('load', () => {
            console.log('MAP LOADED');
            setTimeout(() => {
                this.getRootNode().documentElement.querySelector('body').append('<div id="map-load-complete" style="display: none;"></div>');
            }, 5000);
        });


        if (this.interactive) {
            // eslint-disable-next-line no-undef
            mapBox.addControl(new mapboxgl.NavigationControl({ showCompass: false }), this.navPosition);
        }

        this.mapBox = mapBox;
        console.log("IS IT INITIALIZED", this.mapBox);

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
            <slot></slot>
        `;
    }
    
}

customElements.define('box-map', BoxMap);