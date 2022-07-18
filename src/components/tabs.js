import { LitElement, html } from "lit";
import { generateIdSalt } from "../utils/generate-salt";

export class Tabs extends LitElement {
    static get properties() {
        return {
            label: { type: String },
            activeTab: { type: Number, reflect: true }
        }
    }

    constructor() {
        super();
        this.label = '';
        this.activeTab = 0;
        this.overflow = false;
        this.prerenderedChildren = null;
        this.tabs = null;
        this.idSalt = generateIdSalt('map-tab-');
    }

    panelTemplate(i, child) {
        const index = i - 1;
        return html`
            <div
                data-index=${index}
                id="hijau-tab-${this.idSalt}-${i}-panel"
                class="hijau-tabs__panel"
                role="tabpanel"
                aria-labelledby="hijau-tab-${this.idSalt}-${i}"
                hidden
            >
                ${child}
            </div> 
        `
    }

    onFocus(e) {
        const tab = e.currentTarget;
        const tabs = this.querySelectorAll('.hijau-tabs__tab');
        const index = Array.from(tabs).indexOf(tab);

        tab.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
        this.activeTab = index;
    }

    tabTemplate(i, tabLabel) {
        return html`
            <button
                @click=${this.onFocus}
                @focus=${this.onFocus}
                class="hijau-tabs__tab"
                role="tab"
                aria-selected="false"
                id="hijau-tab-${this.idSalt}-${i}"
                tabindex="-1"
                data-category="Site-Wide Custom Events"
                data-label="tab, ${tabLabel}"
            >
                <span class="hijau-tabs__text-label">${tabLabel}</span>
            </button>
        `
    }

    updated(changedProperties) {
        if (changedProperties.has('activeTab')) {
            this._changeTab();
        }
    }

    _changeTab() {
        const tabs = this.querySelectorAll('.hijau-tabs__tab');
        const panels = this.querySelectorAll('.hijau-tabs__panel');
        const activeTab = tabs[this.activeTab];
        const activePanel = panels[this.activeTab];

        if (activeTab) {
            for (const tab of tabs) {
                tab.setAttribute('aria-selected', false);
                tab.setAttribute('tabindex', '-1');
            }

            activeTab.removeAttribute('aria-selected', 'true');
            activeTab.removeAttribute('tabindex');
        }

        if (activePanel) {
            for (const panel of panels) {
                panel.hidden = true;
            }

            activePanel.hidden = false;
        }
    }

    render() {
        if (!this.prerenderedChildren) {
            this.prerenderedChildren = [];
            this.tabs = [];
            let i = 1;

            for (const child of this.children) {
                this.prerenderedChildren.push(this.panelTemplate(i, child));

                const tabLabel = child.getAttribute('data-label');
                this.tabs.push(this.tabTemplate(i, tabLabel));
                i++;
            }
        }

        return html`
            <div class="hijau-tabs__tablist"
            role="tablist"
            aria-label="${this.label || 'tabs'}"
            >
                ${this.tabs}
            </div>
            ${this.prerenderedChildren}
        `
    }

    createRenderRoot() {
        // Disable shadow DOM.
        // Instead templates will be rendered in the light DOM.
        return this;
      }
}

customElements.define('hijau-tabs', Tabs);