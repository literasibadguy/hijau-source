
import { mapMakerStore, initialState, tempMakerStore } from "./mapmaker-store";
import MapStyles from '../components/Map/styles/index';

export const reset = mapMakerStore.action(() => {
    return initialState;
});

export const toggleMapLayerDesigner = tempMakerStore.action((state) => {

    state.setState({showMapLayerDesigner: true });
    return { showMapLayerDesigner: true }
})

export const setMapLayers = mapMakerStore.action((state, mapLayers, update = true) => {
    if (update) {
        this.updateMap(mapLayers);
    } else {
        mapLayers = JSON.parse(JSON.stringify(mapLayers));
    }

    return { mapLayers: mapLayers };
})

export const removeFromMap = mapMakerStore.action((state, layer) => {
    const layers = state.getState().mapLayers.filter(evLayer => evLayer.layer_id != layer.layer_id);
    updateMap(layers);
})
  
export const updateMap = mapMakerStore.action((state, mapLayers, rebuild = true) => {
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