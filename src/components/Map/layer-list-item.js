import { html, LitElement, css } from "lit";


export default class LayerListItem extends LitElement {

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


    render() {
        return html`
            <div class="layer-list-item">
                <h2>Layer Name</h2>
                <p>Layer Source</p>
            </div>
        `
    }
}

customElements.define('layer-list-item', LayerListItem);