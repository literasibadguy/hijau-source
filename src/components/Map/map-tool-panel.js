import { html, LitElement } from "lit";
import { openNavigationDrawer } from "../../libs/view-actions";

import '../navigation-drawer';
import './toolpanels/coordinate-panel';

export default class MapToolPanel extends LitElement {

    

    render() {
        return html`
        <div id="map-tool-panel">
        <!-- <div id="map-tool-button">
            <button @click=${openNavigationDrawer} data-open-drawer-button class="w-button--svg w-button--round" aria-label="Map Tools">
                <img src="icons/tools.svg" />
            </button>
         </div>
        <navigation-drawer type="standard">
            <div id="tool-panel" data-drawer-container>
                <coordinate-panel>

                </coordinate-panel>
            </div>
        </navigation-drawer> -->
        </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('map-tool-panel', MapToolPanel);