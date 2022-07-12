import { LitElement } from "lit";

export class DataEditorContainer extends LitElement {

    static get properties() {
        return {
            editing: { type: Boolean },
            editingLayer: {type: Object},
            originals: { type: Array },
            edits: { type: Array },
            redo: { type: Array },
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
}