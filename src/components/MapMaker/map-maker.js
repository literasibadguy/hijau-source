import { DataEditorContainer } from "../Map/containers/data-editor-container";
import '../Map/box-map';
import { html } from "lit";
import { startEditing } from "../../libs/dataeditor-actions";

import '../navigation-drawer';
import '../LayerDesigner/map-layer-designer';
import './editor-tool-button';

export class MapMaker extends DataEditorContainer {

    static get properties() {
        return {
            edit: { type: Boolean },
            mapLayers: { type: Array },
            popularLayers: { type: Array },
            showVisibility: { type: Boolean, reflect: true },
            activeTab: { type: String, state: true },
            showMapLayerDesigner: { type: String, state: true },
            data: { type: Object, state: true },
            editLayer: { type: Object },
        }
    }

    constructor() {
        super();

        this.edit = false;

        this.mapLayers = [];
        this.popularLayers = [];
        this.showVisibility = true;
        this.mapLayers = [];
        this.settings = {};
        this.editLayer = {};
        this.showMapLayerDesigner = true;
        this.data = null;
        

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

    _editLayer(layer) {
        startEditing(layer);
        console.log('Editing Layer', layer);
    }

    _initEditLayer(e) {
        console.log('MAP IS LOADED ITS TIME TO LOADED', e);
        this._editLayer(e.detail.layer);
    }

    addLayer(layer) {
        layer = JSON.parse(JSON.stringify(layer));
        if (find(this.mapLayers, {layer_id: layer.layer_id})) {
            return false;
        } else {
            return true;
        }
    }

    onStateChanged({edits, selectedEditFeature}) {
        console.log("WHAT LIST OF MY LAYERS", edits);

        this.mapLayers = edits;
        this.editLayer = selectedEditFeature;
    }

    render() {
        const { data } = this;
        
        return html`
            <div>
                 <box-map
                    id='map-interactive'
                    stateId='mapbox-container'
                    @map-onload=${this._initEditLayer}
                    dataSource=${data}
                >
                    <h4>Tool Panels</h4>
                        <editor-tool-button></editor-tool-button>
                    </box-map>
            </div>
        `
    }  

    createRenderRoot() {
        return this;
    }
}

customElements.define('map-maker', MapMaker);