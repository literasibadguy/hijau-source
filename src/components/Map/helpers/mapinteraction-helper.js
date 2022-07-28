import { debounce } from "../../../utils/debounce";


export default {
    clickHandler(e) {
        const map = this.mapBox;
        if (!map) return;

        console.log(e);

        if (!this.enableMeasurementTools) {
            if (!this.selected && this.selectedFeature) {
                this.selected = true;
            } 
        }

    },

    mousemoveHandler(e) {
        const map = this.mapBox
        const _this = this;
        if (!map) return;

        if (!this._enableMeasurementTools) {
            const debounced = debounce(() => {
                if (_this.mapLoaded && _this.restoreBounds) {
                    this.restoreBounds = undefined;
                }
                try {
                    const features = map.queryRenderedFeatures(
                        [
                            [e.point.x - _this.interactionBufferSize / 2, e.point.y - _this.interactionBufferSize / 2],
                            [e.point.x + _this.interactionBufferSize / 2, e.point.y + _this.interactionBufferSize / 2]
                        ],
                        {layers: this.interactiveLayers})
                    if (features && features.length > 0) {
                        if (this._selected) {
                            // .mapboxgl-canvas-container cursor css crosshair
                            console.log('Selected');
                        } else if (this.hoverInteraction) {
                            // .mapboxgl-canvas-container cursor css crosshair
                        } else {
                            // .mapboxgl-canvas-container cursor pointer
                        }
                    }
                } catch (err) {
                    console.log(err)
                }
            }, 300)
            debounced();
        }
    }
}