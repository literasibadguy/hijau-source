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

export const tempMakerState = {
    showMapLayerDesigner: false,
    canSave: true,
    editLayerLoaded: false,
    saved: false,
    activeTab: 'overlays'
}

// eslint-disable-next-line no-undef
let mapMakerStore = devtools(createStore(initialState));

let tempMakerStore = devtools(createStore(tempMakerState));

export {mapMakerStore, tempMakerStore};