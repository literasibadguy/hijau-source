import { LitElement } from "lit";

class MapMaker extends LitElement {

    static get properties() {
        return {
            edit: { type: Boolean }
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