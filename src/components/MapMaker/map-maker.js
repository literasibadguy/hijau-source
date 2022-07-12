import { LitElement } from "lit";

class MapMaker extends LitElement {

    static get properties() {
        return {
            _canSave: { type: Boolean, state: true },
            _showMapLayerDesigner: { type: Boolean, state: true },
            
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
    }

    connectedCallback() {
        super.connectedCallback();

    }
}

customElements.define('map-maker', MapMaker);