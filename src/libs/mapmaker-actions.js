
import { mapMakerStore, initialState  } from "./mapmaker-store";

export const reset = mapMakerStore.action(() => {
    return initialState;
});
  
export const startEditing = mapMakerStore.action(() => {
    return {editingLayer: true }
})

export const stopEditing = mapMakerStore.action(() => {
    return {editingLayer: false }
})