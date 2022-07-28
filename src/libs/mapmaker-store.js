import createStore from 'unistore'
import devtools from 'unistore';

export const initialState = {
    map_id: -1,
    mapLayers: [],
    settings: {},
    mapStyle: {},
    position: {},
    isPrivate: false,
    basemap: 'default',
    editingLayer: false
}

// eslint-disable-next-line no-undef
let mapMakerStore = devtools(createStore(initialState));

export {mapMakerStore};