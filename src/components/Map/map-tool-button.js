import { css, html, LitElement } from "lit";


export default class MapToolButtton extends LitElement {

    static styles = css`
        #tool-link {
            position: absolute;
            top: 10px;
            right: 10px;
            bottom: auto;
            left: auto;
            display: 'table-cell';
            height: 30px;
            z-index: 100;
            line-height: 28px;
            border-radius: 4px;
            text-align: center;
            color: white;
            width: 30px;
            background-color: royalblue;
        }
    `

    static get properties() {
        return {
            top: { type: String },
        }
    }

    constructor() {
        super();
        this.top = '10px';
    }

    onClick(e) {
        e.preventDefault();

        console.log('ON CLICK MAP TOOL BUTTON');

    }

    render() {
        return html`
            <a @click=${this.onClick} id="tool-link">
                
            </a>
        `
    }
}

customElements.define('map-tool-button', MapToolButtton);