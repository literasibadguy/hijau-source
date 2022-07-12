import { LitElement } from "lit";

// INSPIRED BY WEB.DEV

export class NavigationDrawer extends LitElement {

    static get properties() {
        return {
            open: {type: Boolean, reflect: true},
        }
    }

    connectedCallback() {
        this.drawerContainer = this.querySelector('[data-drawer-container]');
        this.closeBtn = this.querySelector('[data-drawer-close-button]');

        this.addEventListeners();
        super.connectedCallback();
    }

    addEventListeners() {
        if (this.drawerContainer) {
            console.log('IS IT EXITS DRAWER CONTAINER');
        }
    }
}

customElements.define('navigation-drawer', NavigationDrawer);