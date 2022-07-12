
import { LitElement } from "lit";
import { debounce } from "../../../utils/debounce";

import _distance from "@turf/distance";

export default class BaseMapContainer extends LitElement {
    static get properties() {
        return {
            baseMap: {type: String, state: true },
            mapboxAccessToken: {type: String},
            updateWithMapPosition: { type: Boolean, state: true }
        }
    }

    constructor() {
        super();

        this.baseMap = 'default';
        this.mapboxAccessToken = 'pk.eyJ1IjoibGl0ZXJhc2liYWRndXkiLCJhIjoiY2w0cm16aWh4MGxreTNqcW45ZGxrM2lubyJ9.M7v7Ze_WKrz8BYKdt3_L0g';
        this.position = null;
        this.updateWithMapPosition = false;

        this._debouncedUpdateMapPosition = this._debouncedUpdateMapPosition.bind(this);
        this.updateMapPosition = this.updateMapPosition.bind(this);
    }


    _debouncedUpdateMapPosition = debounce((position) => {
        if (this.position) {
            const from = {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [this.position.lng, this.position.lat]
                }
              }
              const to = {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [position.lng, position.lat]
                }
              }
              
              let distance = 0;
              try {
                distance = _distance(from, to, {units: 'kilometers'})
              } catch (err) {
                console.error('error calculating map move distance')
              }

              console.log('map moved: ' + distance + 'km')

              if (distance < 50 && Math.abs(this.position.zoom - position.zoom) < 1) {
                this.position = position;
                return;
              }
        }   
    }, 1000);

    updateMapPosition(position) {
        // ignore unless using a service that needs this... like Bing
        if (this.updateWithMapPosition) {
          this._debouncedUpdateMapPosition(position)
        }
    }
}