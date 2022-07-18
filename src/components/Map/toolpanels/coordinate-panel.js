import { html, LitElement } from "lit";


export class CoordinatePanel extends LitElement {

    static get properties() {
        return {
            lot: { type: String, state: true },
            lon: { type: String, state: true },
        }
    }

    constructor() {
        super();

        this.lat = "0";
        this.lon = "0";

        this.changeLatitude = this.changeLatitude.bind(this);
        this.changeLongitude = this.changeLongitude.bind(this);
    }

    changeLatitude(e) {
        e.preventDefault();

        console.log("WHAT HAPPEN LATITUDE", e.target.value);

        this.lat = e.target.value;
    }

    changeLongitude(e)  {
        e.preventDefault();

        console.log("WHAT HAPPEN LONGITUDE", e.target.value);

        this.lon = e.target.value;
    }

    submittedCordinate(e) {
        e.preventDefault();

        this.dispatchEvent(new CustomEvent('cord-submit', {bubbles: true, composed: true, detail: {lat: this.lat, lon: this.lon}}));
    }

    render() {
        return html`
            <div class="row-coordinates">
                <form>
                    <input type="text" placeholder="Latitude" @change=${this.changeLatitude}
                    />
                    <input type="text" placeholder="Longitude" @change=${this.changeLongitude} />
                    <button id="cord-button"  @click=${this.submittedCordinate}></button>
                </form>
            </div>
        `
    }

    createRenderRoot() {
        // Disable shadow DOM.
        // Instead templates will be rendered in the light DOM.
        return this;
      }
}

customElements.define('coordinate-panel', CoordinatePanel);