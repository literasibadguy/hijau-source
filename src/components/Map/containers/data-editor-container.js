import { LitElement } from "lit";
import { dataEditorStore } from "../../../libs/dataeditor-store";

export class DataEditorContainer extends LitElement {

    static get properties() {
        return {
            editing: { type: Boolean, state: true },
            editingLayer: {type: Object, state: true },
            originals: { type: Array, state: true },
            edits: { type: Array, state: true },
            redo: { type: Array, state: true },
            selectedEditFeature: { type: Object }
        }
    }

    constructor() {
        super();

        this.editing = false;
        this.originals = [];
        this.edits = [];
        this.redo = [];
    }

    connectedCallback() {
        super.connectedCallback();
        dataEditorStore.subscribe(this.onStateChanged);
        this.onStateChanged(dataEditorStore.getState());
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        dataEditorStore.unsubscribe(this.onStateChanged);
    }

    reset() {
        this.editing = false;
        this.originals = [];
        this.edits = [];
        this.redo = [];
    }

    startEditing(layer) {
        this.editing = true;
        this.editingLayer = layer;
    }

    stopEditing() {
        
    }

    getUniqueFeatureIds() {
        const uniqueIds = []
        this.edits.forEach((edit) => {
            const id = edit.geojson.id;
            if (id && !uniqueIds.includes(id)) {
                uniqueIds.push(id)
            }
        })
        return uniqueIds
    }

    /**
     * 
     * @param {!Objct<string, *>} state 
     */
    // eslint-disable-next-line no-unused-vars
    onStateChanged(state) {}
}