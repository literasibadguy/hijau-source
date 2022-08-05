import { DataEditorContainer } from "../Map/containers/data-editor-container";
import '../Map/box-map';
import { html } from "lit";
import { startEditing } from "../../libs/dataeditor-actions";

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
        startEditing(layer);
        console.log('Editing Layer', layer);
    }

    _initEditLayer(e) {
        console.log('MAP IS LOADED ITS TIME TO LOADED', e);
        this.editLayer(e.detail.layer);
    }

    addLayer(layer) {
        layer = JSON.parse(JSON.stringify(layer));
        if (find(this.mapLayers, {layer_id: layer.layer_id})) {
            return false;
        } else {
            return true;
        }
    }

    onStateChanged({edits}) {
        console.log("WHAT LIST OF MY LAYERS", edits);
    }

    render() {
            
        return html`
            <div>
                 <box-map
                    id='map-interactive'
                    stateId='mapbox-container'
                    @map-onload=${this._initEditLayer}
                >
                    <h4>Tool Panels</h4>
                    <!-- <layer-list-item></layer-list-item> -->
                    </box-map>
            </div>
        `
    }  

    createRenderRoot() {
        return this;
    }
}

customElements.define('map-maker', MapMaker);