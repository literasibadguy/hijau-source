import { html, LitElement } from "lit";


customElements.define('editor-tool-button', class extends LitElement {
    
    render() {
        return html`
            <div>
                <a>
                    <img src="icons/undo.svg" />
                </a>
                <a>
                    <img src="icons/redo.svg" />
                </a>

            </div>
        `
    }
})