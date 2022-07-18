import createStore from 'unistore';
import devtools from 'unistore/devtools';

const initialState = {
    map_id: -1,
    mapLayers: [],
    position: {},
    editingLayer: false
}

let editorStore = devtools(createStore(initialState));

export {editorStore};