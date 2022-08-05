import { editorStore } from "./editor-store";

export const startEditing = editorStore.action((state) => {
    state.setState({editingLayer: true})
    return {editingLayer: true};
})