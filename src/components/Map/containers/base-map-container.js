
import { LitElement } from "lit";


export default class BaseMapContainer extends LitElement {
    static get properties() {
        return {
            baseMap: {type: String, state: true },
            mapboxAccessToken: {type: String}
        }
    }

    constructor() {
        super();

        this.baseMap = 'default';
        this.mapboxAccessToken = '';
    }


    
}