import { html, LitElement } from "lit";
import { dataEditorStore } from "../../libs/dataeditor-store";

import settings from "../Map/styles/settings";

export default class EditLayerPanel extends LitElement {

    static get properties() {
        return {
            selectedEditFeature: { type: Object, state: true },
            editingLayer: { type: Object, state: true }
        }
    }

    constructor() {
        super();

        this.editingLayer = null;

        this.stateGetChanged = this.stateGetChanged.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        dataEditorStore.subscribe(this.stateGetChanged)
        this.stateGetChanged();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        dataEditorStore.unsubscribe(this.stateGetChanged)
    }

    stateGetChanged() {
        const dataEditorState = dataEditorStore.getState();
        this.editingLayer = dataEditorState.getState().editingLayer;
        this.selectedEditFeature = dataEditorState.getState().selectedEditFeature;

        if (this.editingLayer.style) {
            console.log('EDITING LAYER', this.editingLayer);
            const firstSource = this.editingLayer.style.sources[0].key;
            const presets = settings.getSourceSetting(this.editingLayer, firstSource, 'presets');
            console.log('SELECTED EDIT FEATURE HERE: ', presets);
        }
    
    }

    render() {
        return html`
            <div>
                <p>Editing: </p>
                <form>
                <input class="coord-input" type="text" placeholder="Longitude" />
                </form>
            </div>
        `
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('edit-layer-panel', EditLayerPanel);