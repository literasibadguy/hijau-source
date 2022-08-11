import { html, LitElement } from "lit";

import '../tabs';

export default class MapLayerDesigner extends LitElement {

    static get properties() {
        return {
            layer: { type: Object },
            style: { state: true },
            legend: { state: true }
        }
    }

    constructor() {
        super();

        if (this.layer && this.layer.style) {
            this.style = this.layer.style;
        }

        if (this.layer && this.layer.legend_html) {
            this.legend = this.layer.legend_html;
        }
    
    }

    colorSelected(e) {
        
        this.dispatchEvent(new CustomEvent('design-color-select', {
            bubbles: true,
            composed: true,
            detail: { color: e.target.value }
        }));
    }

    changedLabels(e) {
        this.dispatchEvent(new CustomEvent('design-label-change', {
            bubbles: true,
            composed: true,
            detail: { label: e.target.value }
        }))
    }

    changedMarkers(e) {
        console.log('Layer Designer Changed Marker', e);

        this.dispatchEvent(new CustomEvent('design-change-marker', {
            bubbles: true,
            composed: true,
            detail: { label: e.target.value }
        }))
    }

    render() {
        const { colorSelected, changedLabels, changedMarkers } = this;

        return html`
            <hijau-tabs>
                    <div id="base-map-select" title="Base Map" data-label="Base map">
                        <h2>Color</h2>
                        <input @input=${colorSelected} type="color" value="#000000" />
                    </div>
                    <div id="list-layers" title="List Layers" data-label="List Layers">
                        <h2>Label</h2>
                        <input @input=${changedLabels} type="text" value="Testing" />
                    </div>
                    <div id="edit-layers" title="Edit Layers" data-label="Edit Layers">
                        <h2>Marker</h2>
                        <marker-settings @marker-setting-changed=${changedMarkers}></marker-settings>
                    </div>
            </hijau-tabs>
        `
    }

    createRenderRoot()  {
        return this;
    }
}

customElements.define('map-layer-designer', MapLayerDesigner);