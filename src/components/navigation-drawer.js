import { LitElement } from "lit";
import { enablePage } from "../libs/view-actions";

// INSPIRED BY WEB.DEV

export const NAVIGATION_DRAWER_TYPE = {
    standard: 'standard',
    modal: 'modal',
  };
  

export class NavigationDrawer extends LitElement {

    static get properties() {
        return {
            type: { type: String, reflect: true },
            open: {type: Boolean, reflect: true},
        }
    }

    set open(val) {
        if (this._open === val) {
            return;
        }

    const oldVal = this._open;
    this._open = val;
    this.animating = true;
    if (this._open) {
    //   document.addEventListener('keyup', this.onKeyUp);
    }
    // this.addEventListener('transitionend', this.onTransitionEnd);
    this.requestUpdate('open', oldVal);
    }

    constructor() {
        super();

        this._open = true;
    }

    get open() {
        return this._open;
    }

    connectedCallback() {
        this.tabIndex = -1;

        if (this.type === NAVIGATION_DRAWER_TYPE.modal) {
            this.inert = true;
        }

        this.drawerContainer = this.querySelector('[data-drawer-container]');
        this.closeBtn = this.querySelector('[data-drawer-close-button]');

        this.addEventListeners();
        super.connectedCallback();
    }

    addEventListeners() {
        this.drawerContainer.addEventListener('click', this.onBlockClicks);
        this.addEventListener('click', enablePage);
    }

    onBlockClicks(e) {
        const link = e.target.closest('a');
        if (!link) {
            e.stopPropagation();
        }
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('navigation-drawer', NavigationDrawer);