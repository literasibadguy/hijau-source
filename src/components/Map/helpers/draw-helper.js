import MapboxDraw from "@mapbox/mapbox-gl-draw";


export default {
    toggleMeasurementTools(enable) {
        if (enable && this.enableMeasurementTools) {
            this.startDrawTool();
        }
    },

    measureFeatureClick() {
        const map =  this.mapBox;

        const disableClick = function () {
            map.off('click', this.onMeasureFeatureClick)
        }

        this.onMeasureFeatureClick = function (e) {
            e.originalEvent.stopPropagation();

            const features = map.queryRenderedFeatures(
                [
                    [e.point.x  - this.interactionBufferSize  / 2, e.point.y - this.interactionBufferSize / 2],
                    [e.point.x - this.interactionBufferSize / 2, e.point.y + this.interactionBufferSize / 2]
                ], {layers: this.state.interactiveLayers})
            
            if (features && features.length > 0) {
                const feature =  features[0];
                this.enableMeasurementTools = true;
                this.updateDrawMeasurement([feature])
                disableClick();
            }
        }

        map.on('click', this.onMeasureFeatureClick);
    },

    startDrawTool() {
        if (!this.mapBox) {
            return;
        }

        const draw = new MapboxDraw({displayControlsDefault: false});

        this.draw = draw;
        this.mapBox.addControl(draw, 'top-right');

        this.mapBox.on('draw.create', (e) => {
            console.log('DRAW CREATE', e);
            const data = this.draw.getAll();
            this.updateDrawMeasurement(data.features);
        })

        this.mapBox.on('draw.update', (e) => {
            console.log('DRAW UPDATE', e);
            const data = this.draw.getAll();
            this.updateDrawMeasurement(data.features);
        })

        this.mapBox.on('draw.delete', () => {
            this.measurementMessage = 'Use the drawing tools below';
        })

        this.enableMeasurementTools = true;
        this.measurementMessage = 'Use the drawing tools below';
    },

    updateDrawMeasurement(features) {
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