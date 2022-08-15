
/*

GeoJSON format

{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}

*/

export default {
    initGeoJSON(data) {
        if (this.mapBox) {
            if (data && data.features && Array.isArray(data.features) && data.features.length > 0) {
                this.mapBox.addSource('urban-areas', {type: 'geojson', data})
                
            } else {
              console.debug('Empty/Missing GeoJSON Data')
            }
        } else {
          console.debug('Map not initialized');
        }
    },

    resetGeoJSON() {
        const geoJSONData = this.mapBox.getSource('hijau-geojson');
        geoJSONData.setData({
            type: 'FeatureCollection',
            features: []
          })
        this.mapBox.flyTo({center: [0, 0], zoom: 0})
    }
}