import { html, LitElement, css } from "lit";

import '../switch';

export default class LayerListItem extends LitElement {

    static get properties() {
        return {
            itemLayer: { type: Object }
        }
    }

    static styles = css`
        .layer-list-item {
            border-bottom: 1px solid #ddd;
            height: 65px;
            width: 100%;
            padding: 1em;
            position: relative;
            background-color: white;
        }
    `;

    constructor() {
        super();

        this.itemLayer = {};
    }

    editLayer() {

        this.dispatchEvent(new CustomEvent('need-edit-layer', {
            bubbles: true,
            composed: true,
            detail: { editItem: this.itemLayer }
        }))
    }

    toggleVisibility() {
        this.dispatchEvent(new CustomEvent('need-visible', {
            bubbles: true,
            composed: true,
            detail: { editItem: this.itemLayer }
        }))
    }

    render() {
        return html`
            <div>
                <h3>Layer Name</h3>
                <p>Layer Source: ${this.itemLayer.source}</p>
                <div class="cluster">
                    <button @click=${this.editLayer}>Edit</button>
                    <switch-toggle
                     name="Visibility"
                      value="visible"
                       @switch-change=${this.toggleVisibility}></switch-toggle>
                </div>
            </div>
        `
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('layer-list-item', LayerListItem);