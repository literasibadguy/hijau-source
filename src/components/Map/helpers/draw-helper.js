import MapboxDraw from "@mapbox/mapbox-gl-draw";


export default {
    toggleMeasurementTools(enable) {
        if (enable && this.enableMeasurementTools) {
            this.startMeasurementTool();
        }
    },

    startMeasurementTool() {
        if (!this.mapBox) {
            return;
        }

        const draw = new MapboxDraw({displayControlsDefault: false});

        this.draw = draw;
        this.mapBox.addControl(draw, 'top-right');

        this.mapBox.on('draw.create', (e) => {
            console.log('DRAW CREATE', e);
            const data = this.draw.getAll();
            this.updateMeasurement(data.features);
        })
        
    },

    updateMeasurement(features) {
        if (features.length) {
            const lines = {
                type: 'FeatureCollection',
                features: []
            }

            const polygons = {
                type: 'FeatureCollection',
                features: []
            }

            features.forEach((feature) => {
                if (feature.geomety.type === 'LineString') {
                    lines.features.push(feature);
                } else if (feature.geomety.type === 'Polygon') {
                    polygons.features.push(feature);
                }
            })


            
        }
    }

}