


export default {
    getBounds() {
        if (this.map) {
            return this.map.getBounds().toArray();
        }
    }
}