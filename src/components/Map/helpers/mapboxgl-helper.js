


export default {
    getBounds() {
        if (this.mapBox) {
            console.log("WHATS THE BOUNDS", this.mapBox.getBounds().toArray());
            return this.mapBox.getBounds().toArray();
        }
    },

    getPosition() {
        if (!this.mapBox) {
            return;
        }

        const center = this.mapBox.getCenter();
        const zoom = this.mapBox.getZoom();

        return {
            zoom,
            lng: center.lng,
            lat: center.lat
        }
    }
}