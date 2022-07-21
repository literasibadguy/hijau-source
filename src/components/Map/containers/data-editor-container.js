import { LitElement } from "lit";

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

    createFeature(feature) {
        const edits = JSON.parse(JSON.stringify(this.edits));
        console.log(feature);
        console.log(edits);
    }
}