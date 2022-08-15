import { debounce } from "../../../utils/debounce";
import MapStyles from "../styles";

export default {
    setSelectionFilter(features) {
        // ADDING GL STYLE
        console.log(features);
    },
    clearSelection() {
        this.selected = false;
        this.selectedFeature = undefined;
    },
    clickHandler(e) {
        const map = this.mapBox;
        if (!map) return;

        console.log(e);

        if (!this.enableMeasurementTools) {
            if (!this.selected && this.selectedFeature) {
                this.selected = true;
            }  else {
                const mapTarget = this.getRootNode().documentElement.querySelector('.mapboxgl-canvas-container');
                mapTarget.style.cursor = 'crosshair';

                const features = map.queryRenderedFeatures(
                    [
                      [e.point.x - this.interactionBufferSize / 2, e.point.y - this.interactionBufferSize / 2],
                      [e.point.x + this.interactionBufferSize / 2, e.point.y + this.interactionBufferSize / 2]
                    ], {layers: this.interactiveLayers})
                
                if (features && features.length > 0) {
                    if (this.selected) {
                        this.clearSelection()
                    }

                    const feature = features[0];
                    if (feature.layer && feature.layer.source) {
                        console.log('Feature layer', feature);
                        let presets = MapStyles.settings.getSourceSetting(this.mapBox.getStyle(), feature.layer.source, 'presets');
                        console.log('PRESETS', presets);
                        if (!presets) {
                            console.log(`presets not found in source ${feature.layer.source}`)
                            const source = this.glStyle.sources[feature.layer.source]
                            let data
                            if (source) {
                                data = source.data
                            }
                            if (data) {
                                if (data.metadata) {
                                    presets = data.metadata['hijau:presets']
                                    if (presets) {
                                        console.log('Presets FOUND for source');
                                    } else {
                                        console.loog('Presets not found in data.metadata');
                                    }
                                }
                            } else {
                                console.log(`data not found in source ${feature.layer.source}`);
                            }
                        }
                        console.log('SELECTED FEATURE', feature);
                    }

                    if (this.dataEditorState.editing) {
                        if (feature.properties.id && this.dataEditorState.id === feature.properties.id) {
                            this.editFeature(feature);
                        }
                        return
                    }

                    this.selectedFeature = feature;
                    this.selected = true;
                }
                
                
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
                    const mapTarget = this.getRootNode().documentElement.querySelector('.mapboxgl-canvas-container');
                    if (features && features.length > 0) {
                        if (this.selected) {
                            mapTarget.style.cursor = 'crosshair';
                            console.log('Selected');
                        } else if (this.hoverInteraction) {
                            mapTarget.style.cursor = 'crosshair';
                        } else {
                            mapTarget.style.cursor = 'pointer';
                        }
                    } else if (!_this.selected && _this.selectedFeatures) {
                        _this.clearSelection();
                        mapTarget.style.cursor = '';
                    } else {
                        mapTarget.style.cursor = '';
                    }
                } catch (err) {
                    console.log(err)
                }
            }, 300)
            debounced();
        }
    }
}