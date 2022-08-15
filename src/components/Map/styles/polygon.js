

export default {
    getPolygonLayers(layerId, shortId, color, hoverColor, hoverOutlineColor, interactive, showBehindBaseMapLabels) {
        return [
            {
                id: `hijau-data-polygon-${layerId}-${shortId}`,
                type: 'fill',
                metadata: {
                    'hijau:layer_id': layerId,
                    'hijau:globalid': shortId,
                    'hijau:interactive': interactive,
                    'hijau:showBehindBaseMapLabels': showBehindBaseMapLabels
                },
                source: 'hijau-' + shortId,
                'source-layer': 'data',
                filter: ['in', '$type', 'Polygon'],
                paint: {
                    'fill-color': color,
                    'fill-outline-color': color,
                    'fill-opacity': 1
                }
            }
        ]
    }
}