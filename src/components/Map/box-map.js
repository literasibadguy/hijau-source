import MapboxGLHelper from "./helpers/mapboxgl-helper";
import BaseMapContainer from "./containers/base-map-container";
import  "mapbox-gl";

class BoxMap extends BaseMapContainer {
    
    static get properties() {
        return {
            className: {type: String},
            stateId: { type: String },
            data: { type: Object },
            map: { type: Object },
            showScale: { type: Boolean },
            navPosition: { type: String },
            containers: {
                baseMapState: { type: Object },
                dataEditorState: { type: Object },
                mapState: { type: Object }
            }
        }
    }

    constructor() {
        super();

        this.className = '';
        this.interactive = true;
        this.overlayMapStyle = {};
        this.stateId = '';
        this.map = null;
        this.containers = {baseMapState: {}, dataEditorState: {}, mapState: {}};
        this.showScale = true;
        this.navPosition = 'top-right';
    }

    connectedCallback() {
        super.connectedCallback();
        this.containers.mapState = this;
        console.log(this.containers.mapState);

        this._loadMap();
    }

    willUpdate(changedProperties) {
        console.log('CHANGED PROPERTIES', changedProperties);
    }

    update(changedProperties) {
        console.log('CHANGED PROPERTIES', changedProperties);
        if (this.map.dragPan) {
            this.map.dragPan.enable();
        }
    }


    _loadMap() {
        // eslint-disable-next-line no-undef
        mapboxgl.accessToken = this.mapboxAccessToken;

        // eslint-disable-next-line no-undef
        this.map = new mapboxgl.Map({
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

        this.map.on('error', (err) => {
            console.log(err.error);
        })


        this.map.on('load', () => {
            console.log('MAP LOADED');
            
            setTimeout(() => {
                this.getRootNode().documentElement.querySelector('body').append('<div id="map-load-complete" style="display: none;"></div>');
            }, 5000);
        });

        this.map.on('moveend', this._moveEndHandler)

        if (this.interactive) {
            console.log("ITS INTERACTIVE");
            // eslint-disable-next-line no-undef
            this.map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), this.navPosition);
        }
    }

    _moveEndHandler = () => {
        console.log('mouse up fired');
    }

    getBounds = () => {
        return MapboxGLHelper.getBounds.bind(this)()
    }
}

customElements.define('box-map', BoxMap);