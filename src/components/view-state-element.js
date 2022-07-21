
import { LitElement } from "lit";
import { viewStore } from "../libs/view-store";

export class ViewStateElement extends LitElement {
    constructor() {
        super();
        this.onStateChanged = this.onStateChanged.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        viewStore.subscribe(this.onStateChanged);
        this.onStateChanged(viewStore.getState());
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        viewStore.unsubscribe(this.onStateChanged);
    }

    createRenderRoot() {
        return this;
    }

    // eslint-disable-next-line no-unused-vars
    onStateChanged(state) {}
}