import { LitElement } from "lit";
import { startEditing } from "../../libs/editor-actions";

class MapMaker extends LitElement {

    static get properties() {
        return {
            edit: { type: Boolean },
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
    }

    connectedCallback() {
        super.connectedCallback();

    }

    editLayer() {
        startEditing();
    }
}

customElements.define('map-maker', MapMaker);