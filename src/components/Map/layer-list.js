import { html, LitElement } from "lit";
import { dataEditorStore } from "../../libs/dataeditor-store";
import { removeFromMap } from "../../libs/mapmaker-actions";
import { openNavigationDrawer } from "../../libs/view-actions";

import './layer-list-item';

export default class LayerList extends LitElement {
    
    static get properties() {
        return {
            layers: { type: Array, state: true },
            showMapLayerDesigner: { type: Boolean, state: true },
        }
    }

    constructor() {
        super();

        this.layers = [{id: 'urban-areas-fill',
         type: 'fill',
          source: 'urban-areas',
           layout: {},
            paint: {'fill-color': '', 'fill-opacity': '0.4'},
          }];
        this.showMapLayerDesigner = false;

        this.onStateChanged = this.onStateChanged.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        dataEditorStore.subscribe(this.onStateChanged)
        this.onStateChanged();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        dataEditorStore.unsubscribe(this.onStateChanged)
    }

    onStateChanged()  {
        const state = dataEditorStore.getState();

        this.layers = state.getState().edits;
        this.requestUpdate();
    }

    showLayerDesigner(e) {
        console.log(e);

        this.showMapLayerDesigner = true;
        openNavigationDrawer();
    }

    removeLayer(e) {
        console.log("REMOVE FROM MAP", e);
        removeFromMap(e);
    }

    render() {
        // const { layers } = this;
        const { showMapLayerDesigner } = this;
        const { showLayerDesigner, removeLayer } = this;

        return html`
            ${showMapLayerDesigner && html`
                <navigation-drawer type="standard">
                    <div id="layer-designer" data-drawer-container>
                        <map-layer-designer></map-layer-designer>
                    </div>
                </navigation-drawer>
                `}
            <div id="layer-list-inner">
                ${this.layers.map(item => {
                    return html`
                        <div class="layer-list-item" id="${item.id}">
                            <layer-list-item @need-edit-layer=${this.layerNeedEdit}
                            @need-remove-layer=${removeLayer}
                             @need-show-design=${showLayerDesigner}
                              .itemLayer=${item}></layer-list-item>
                        </div>`;
                })}
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('layer-list', LayerList);