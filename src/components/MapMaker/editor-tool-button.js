import { css, html, LitElement } from "lit";


customElements.define('editor-tool-button', class extends LitElement {
    

    static styles = css`

        .list-edit-buttons {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 200px;
            width: 25px;
            background-color: white;
            padding: 1rem;
        }

        .map-edit-button {
            bottom: auto;
            left: auto;
        }
    `

    undoClicked(e) {
        console.log(e);
    }

    redoClicked(e) {
        console.log(e);
    }

    render() {
        return html`
            <div class="list-edit-buttons">
                <a class="map-edit-button" @click=${this.undoClicked}>
                    <img src="icons/undo.svg" />
                </a>
                <a class="map-edit-button" @click=${this.redoClicked}>
                    <img src="icons/redo.svg" />
                </a>
                <a class="map-edit-button">
                    <img src="icons/redo.svg" />
                </a>
            </div>
        `
    }
})