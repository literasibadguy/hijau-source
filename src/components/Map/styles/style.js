import Settings from './settings';
import Polygon from './polygon';


export default {
    /**
     * 
     * @param {number} layerId 
     * @param {string} shortId 
     * @param {GLSource} source 
     * @param {string} dataType 
     */
    defaultStyle(layerId, shortId, source, dataType) {
        const settings = Settings.defaultLayerSettings();
        return this.styleWithColor(layerId, shortId, source, 'rgba(255,0,0,0.5)', dataType, settings.interactive, settings.showBehindBaseMapLabels)
    },

    styleWithColor(layerId, shortId, source, color, dataType, interactive, showBehindBaseMapLabels) {

        const hoverColor = 'yellow';
        const hoverOutlineColor = 'black';

        let layers = []
        if (dataType === 'polygon') {
            layers = Polygon.getPolygonLayers(layerId, shortId, color, hoverColor, hoverOutlineColor, interactive, showBehindBaseMapLabels)
        }

        const styles = {
            sources: {},
            layers,
        }

        if (source)  {
            if (source.type === 'geojson')  {
                styles.sources['urban-' + shortId] = {
                    type: 'geojson',
                    data: source.data
                }
                styles.layers.map(layer => {
                    delete layer['source-layer']
                })
            }
        }
        return styles;
    }
}