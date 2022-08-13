
export default {
    /**
     * 
     * @param {Object} object 
     * @param {string} key 
     * @param {any} value
     * @returns 
     */
    get(object, key, value) {
        if (!object) return

        object = JSON.parse(JSON.stringify(object))

        if (!object.metadata) {
            object.metadata = {}
        }
        object.metadata[`hijau:${key}`] = value
        return object
    },
    /**
     * 
     * @param {Object} style 
     * @param {string} id 
     * @param {string} key 
     */    
    getLayerSetting(style, id, key) {
        const index = style.layers.findIndex({id});
        if (typeof index !== 'undefined') {
            const layer = style.layers[index]
            return this.get(layer, key);
        }
    },
    /**
     * 
     * @param {Object} style 
     * @param {string} id 
     * @param {string} key 
     */
    getSourceSetting(style, id, key) {
        const source  = style.sources[id];
        return this.get(source, key);
    }
}