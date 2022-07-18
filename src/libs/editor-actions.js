import { editorStore } from "./editor-store";

export const startEditing = editorStore.action(() => {
    return {editingLayer: true};
})