import { html, LitElement } from "lit";

import './layer-list-item';

export default class LayerList extends LitElement {
    
    static get properties() {
        return {
            layers: { type: Array, state: true }
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
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('layers')) {
            console.log('layers will update', this.layers);
        }
    }

    layerNeedEdit(eL) {
        console.log('LAYER NEED EDIT', eL);
    }

    render() {
        // const { layers } = this;

        return html`
            <div id="layer-list-inner">
                ${this.layers.map(item => {
                    return html`
                        <div class="layer-list-item" id="${item.id}">
                            <layer-list-item @need-edit-layer=${this.layerNeedEdit} .itemLayer=${item}></layer-list-item>
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