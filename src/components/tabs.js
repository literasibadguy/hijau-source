import { LitElement, html } from "lit";

export class Tabs extends LitElement {
    static get properties() {
        return {
            label: { type: String },
            activeTab: { type: Number, reflect: true }
        }
    }

    panelTemplate(i, child) {
        const index = i - 1;
        return html`
            <div
                data-index=${index}
                id="map-tab-${this.idSalt}-${i}-panel"
                class="web-tabs__panel"
                role="tabpanel"
                aria-labelledby="web-tab-${this.idSalt}-${i}"
                hidden
            >
                ${child}
            </div>
        `
    }

    render() {
        if (!this.prerenderedChildren) {
            this.prerenderedChildren = [];
            this.tabs = [];
            let i = 1;

            for (const child of this.children) {
                this.prerenderedChildren.push(this.panelTemplate(i, child));
            }
        }
    }
}