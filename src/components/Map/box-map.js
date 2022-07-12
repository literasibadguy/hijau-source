import MapboxGLHelper from "./helpers/mapboxgl-helper";
import MapInteractionHelper from "./helpers/mapinteraction-helper";
import BaseMapContainer from "./containers/base-map-container";
import  "mapbox-gl";

class BoxMap extends BaseMapContainer {
    
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
            _enableMeasurementTools: { type: Boolean, state: true }
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

        // EVENTS
        this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
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

    update(changedProperties) {
        console.log('CHANGED PROPERTIES', changedProperties);
        if (this.mapBox.dragPan) {
            this.mapBox.dragPan.enable();
        }
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
        
        console.log('mouse up fired');
    }

    getBounds = () => {
        return MapboxGLHelper.getBounds.bind(this)()
    }
}

customElements.define('box-map', BoxMap);