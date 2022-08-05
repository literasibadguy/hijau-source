
import { mapMakerStore, initialState  } from "./mapmaker-store";
import MapStyles from '../components/Map/styles/index';

export const reset = mapMakerStore.action(() => {
    return initialState;
});

export const setMapLayers = mapMakerStore.action((mapLayers, update = true) => {
    if (update) {
        this.updateMap(mapLayers);
    } else {
        mapLayers = JSON.parse(JSON.stringify(mapLayers));
    }

    return { mapLayers: mapLayers };
})
  
export const updateMap = mapMakerStore.action((mapLayers, rebuild = true) => {
    mapLayers = JSON.parse(JSON.stringify(mapLayers));
    let mapStyle
    if (rebuild) {
        // mapStyle = this.buildMapStyle(layers);
    } else {
        mapStyle = mapMakerStore.getState({mapStyle})
    }
    return {mapLayers, mapStyle};
})

/**
 * 
 * @param {Array} layers 
 * @returns 
 */
export const buildMapStyle = (layers) => {
    return MapStyles.style.buildMapStyle(layers);
}

export const startEditing = mapMakerStore.action(() => {
    return {editingLayer: true }
})

export const stopEditing = mapMakerStore.action(() => {
    return {editingLayer: false }
})