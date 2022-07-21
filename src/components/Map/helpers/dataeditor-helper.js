
import "@mapbox/mapbox-gl-draw";
import theme from "@mapbox/mapbox-gl-draw/src/lib/theme";

export default {

    getEditorStyles() {
        return theme;
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
                    // ADD CREATE FEATURE
                    console.log(feature);
                })
            }
        })

        this.map.on('draw.update', e => {
            console.log('draw update')
            this.updateEdits(e)
        })

        
    },

    // createFeature(feature)  {
    //     const edits = JSON.parse(JSON.stringify(this.edits));

    // }
}