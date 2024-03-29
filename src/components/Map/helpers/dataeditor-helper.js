
import "@mapbox/mapbox-gl-draw";
import theme from "@mapbox/mapbox-gl-draw/src/lib/theme";
import { createFeature, deleteFeature, selectFeature, updateFeatures } from "../../../libs/dataeditor-actions";

export default {

    getEditorStyles() {
        return theme;
    },

    /**
     * 
     * @param {Object} editFeature 
     */
    async editFeature(editFeature) {
        console.log('DATA EDIT FEATURE', editFeature);
        const feature = selectFeature(editFeature.properties.id)
        if (this.draw) {
            if (!this.draw.get(feature.id)) {
                this.draw.add(feature)

            }
        }
    },

    startEditingTool(layer) {
        if (this.enableMeasurementTools) {
            console.log('MEASUREMENT TOOLS ARE ENABLED');

        }

        // eslint-disable-next-line no-undef
        const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                point: layer.type === 'point',
                polygon: layer.type === 'fill',
                line_string: layer.type === 'line',
                trash: true
            },
            styles: this.getEditorStyles()
        })
        this.draw = draw;

        this.mapBox.addControl(draw, 'top-left')

        this.mapBox.on('draw.create', e => {
            console.log('draw create');
            const features = e.features;
            if (features && features.length > 0) {
                features.forEach(feature => {
                    console.log(feature);
                    createFeature(feature);
                    this.dataSource.features.push(feature);
                    const geojsonSource = this.mapBox.getSource('urban-areas');
                    geojsonSource.setData(this.dataSource);
                })
            }
        })

        this.mapBox.on('draw.update', e => {
            console.log('draw update', e);
            this.updateEdits(e);
        })

        this.mapBox.on('draw.delete', e => {
            console.log('draw delete', e);
            const features = e.features
            if (features && features.length > 0) {
                features.forEach(feature => {
                    deleteFeature(feature);
                })
            }
            deleteFeature(e);
        })

        this.mapBox.on('draw.selectionchange', async (e) => {
            console.log('draw selection', e);
            const mode = this.draw.getMode();
            if (mode === 'simple_select') {
                const features = e.features
                if (features && features.length > 0) {
                    // eslint-disable-next-line no-undef
                    await Promise.all(features.map(feature => {
                        return selectFeature(feature.id);
                    }))
                }
            }
        })
    },

    stopEditingTool() {
        this.mapBox.removeControl(this.draw)
        
    },

    updateEdits(e) {
        if (e.features.length > 0) {
            updateFeatures(e.features);
        }
    }

    // createFeature(feature)  {
    //     const edits = JSON.parse(JSON.stringify(this.edits));

    // }
}