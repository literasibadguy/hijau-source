import createStore from 'unistore'
import devtools from 'unistore';

const initialDataEditorState = {
    editing: true,
    editingLayer: {},
    originals: [],
    edits: [],
    redo: [],
    selectedEditFeature: undefined
}

// eslint-disable-next-line no-undef
let dataEditorStore = devtools(createStore(initialDataEditorState));

export {dataEditorStore};