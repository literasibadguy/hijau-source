

import { dataEditorStore } from "./dataeditor-store";

export const startEditing = 
    dataEditorStore.action((state, feature) => {
        // const edits = JSON.parse(state.getState().edits);
        const created = {
            status: 'create',
            geojson: JSON.parse(JSON.stringify(feature))
        }

        console.log('CREATED FEATURE', created);

        // edits.push(created)
        const edits = state.getState().edits;
        edits.push(created);
        state.setState({ edits, selectedEditFeature: created })
    })

export const updateFeatures = dataEditorStore.action((state, features) => {
    features.forEach(feature => {
        console.log('Updating feature: ' + feature.id);

        const edit = {
            status: 'modify',
            geojson: JSON.parse(JSON.stringify(feature))
        }

        if (state.getState().selectedEditFeature) {
            state.setState({selectedEditFeature: edit})
        }

        

    })
})