import { debounce } from "../../../utils/debounce";


export default {
    clickHandler(e) {
        const map = this.mapBox;
        if (!map) return;

        console.log(e);

    },

    mousemoveHandler(e) {
        const map = this.mapBox
        const _this = this;
        if (!map) return;

        if (!this._enableMeasurementTools) {
            console.log('NO MEASURE MENT');
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