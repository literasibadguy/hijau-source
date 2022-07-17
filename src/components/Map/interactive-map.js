import { html, LitElement } from "lit";

import '../Map/box-map';
import '../Map/layer-list-item';

export class InteractiveMap extends LitElement {


    render() {
        return html`
            <div>
            <h4>Map Tool button</h4>
                <box-map
                    id='map-interactive'
                    stateId='mapbox-container'
                >
                    <h4>Tool Panels</h4>
                    <layer-list-item></layer-list-item>
                </box-map>
            </div>
        `
    }
}

customElements.define('interactive-map', InteractiveMap);