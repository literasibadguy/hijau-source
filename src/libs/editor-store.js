import createStore from 'unistore'
import devtools from 'unistore';

const initialState = {
    map_id: -1,
    mapLayers: [],
    position: {},
    editingLayer: false
}

// eslint-disable-next-line no-undef
let editorStore = devtools(createStore(initialState));

export {editorStore};