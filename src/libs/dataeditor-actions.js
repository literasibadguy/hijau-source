

import { dataEditorStore } from "./dataeditor-store";


export const startEditing = dataEditorStore.action((state, layer) => {
    state.setState({ editing: true, editingLayer: layer });

    return { editing: true, editingLayer: layer }
})

export const createFeature = 
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

        return {edits, selectedEditFeature: created }
    })

export const updateFeatures = dataEditorStore.action((state, features) => {
    let ddEdit
    features.forEach(feature => {
        console.log('Updating feature: ' + feature.id);

        const edit = {
            status: 'modify',
            geojson: JSON.parse(JSON.stringify(feature))
        }

        ddEdit = edit;

        if (state.getState().selectedEditFeature) {
            state.setState({selectedEditFeature: edit})
        }
    })

    return { selectedEditFeature: ddEdit }
})

/**
 * 
 * @param {string} id 
 * @param {any} edits 
 */
function getLastEditForID(id, edits) {
    const matchingEdits = [];
    edits.forEach(edit => {
        if (edit.geojson.id === id) {
            matchingEdits.push(edit);
        }
    });
    if (matchingEdits.length > 0) {
        return JSON.parse(JSON.stringify(matchingEdits[0]))
    } else {
        let original
        dataEditorStore.getState().originals.foreach(orig => {
            if (orig.geojson.id === id) {
                original = orig
            }
        })
        if (original) {
            return JSON.parse(JSON.stringify(original))
        }
        return null;
    }
} 

export const saveEdits = dataEditorStore.action((state, _csrf, cb) => {
    console.log('SAVING EDITS');
    console.log(state.getState().edits);
    const editsToSave = []
    const featureIds = getUniqueFeatureIds();
    featureIds.forEach(id => {
        console.log(id);
        const featureEdits = getAllEditsForFeatureId(id)
        const lastFeatureEdit = featureEdits[featureEdits.length - 1]
        if (featureEdits.length > 1) {
            if (featureEdits[0].status === 'create') {
                lastFeatureEdit.status = 'create'
            }
        }
        editsToSave.push(lastFeatureEdit)
        // editsToSave.push(lastFeatureEdit);
    })
    const layer_id = (state.getState().editingLayer && state.getState().editingLayer.id) ? state.getState().editingLayer.id : 0
    if (editsToSave.length > 0) {
        console.log('EDITS TO SAVE', {layer_id, edits: editsToSave, _csrf});
        cb();
    } else {
        console.error('NO PENDING EDITS FOUND');
    }
})


const getUniqueFeatureIds = dataEditorStore.action((state) => {
    const uniqueIds = [];
    state.getState().edits.forEach(edit => {
        const id = edit.geojson.id
        if (id && !uniqueIds.includes(id)) {
            uniqueIds.push(id)
        }
    })
    return uniqueIds
});

const getAllEditsForFeatureId = dataEditorStore.action((state, id) => {
    const featureEdits = []
    state.getState().edits.forEach(edit => {
        if (edit.geojson.id === id) {
            featureEdits.push(edit)
        }
    })
    return featureEdits;
})


export const selectFeature = dataEditorStore.action((state, mhid) => {
    const selected = getLastEditForID(mhid, state.getState().edits);

    if (selected) {
        state.setState({selectedEditFeature: selected})
        return selected.geojson;
    } else {
        const id = mhid.split(':')[1]
        const layer_id = (state.editingLayer && state.editingLayer.layer_id) ? state.editingLayer.layer_id : 0

       console.log("id: ", id);
       console.log("layer id: %d", layer_id);
    }
})

export const deleteFeature = dataEditorStore.action((state, feature) => {
    console.log('DELETING FEATURE', feature);

    const edit = {
        status: 'delete',
        geojson: JSON.parse(JSON.stringify(feature))
    }

    const edits = JSON.parse(JSON.stringify(state.getState().edits))
    edits.push(edit)
    state.setState({ edits, redo: [] })
})

