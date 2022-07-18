import { startEditing } from "../../libs/editor-actions";
import { DataEditorContainer } from "../Map/containers/data-editor-container";

export class MapMaker extends DataEditorContainer {

    static get properties() {
        return {
            edit: { type: Boolean },
            popularLayers: { type: Array },
            showVisibility: { type: Boolean, reflect: true },
            mapLayers: { type: Array },
            activeTab: { type: String, state: true },
        }
    }

    constructor() {
        super();

        this.edit = false;
        this.popularLayers = [];
        this.showVisibility = true;
        this.mapLayers = [];
        this.settings = {};
        

        // State
        this._canSave = false;
        this.activeTab = 'overlays';

        this.listenCoordinatePanel = this.listenCoordinatePanel.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();

        this.coordinatePanel = this.getRootNode().documentElement.querySelector('coordinate-panel');

        this.coordinatePanel.addEventListener('cord-submit', this.listenCoordinatePanel);
    }
    
    disconnectedCallback() {
        this.coordinatePanel.removeEventListener('cord-submit', this.listenCoordinatePanel);

        super.disconnectedCallback();
    }

    listenCoordinatePanel(e) {
        console.log('WHAT COORDINATE PANEL DO', e);
    }

    editLayer(layer) {
        startEditing();
        this.startEditing(layer);
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('map-maker', MapMaker);