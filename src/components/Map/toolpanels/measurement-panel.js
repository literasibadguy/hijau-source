import { html, LitElement } from "lit";


export class MeasurementPanel extends LitElement {

    constructor() {
        super();

        this.measureFeaturesClick = this.measureFeaturesClick.bind(this);
        this.checkboxClicked = this.checkboxClicked.bind(this);
    }

    checkboxClicked(e) {
        
        const scalesChecked = this.querySelector('input#scales');

        if (scalesChecked.checked) {
            console.log("CHECKBOX CLICKED", e);
        }
    }

    toggleMeasurementTools(e) {
        e.preventDefault();

        console.log('WHEN MEASUREMENT TOOL', e);

        if (e.target.value) {
            // this.dispatchEvent('close-panel', {detail: { opened: false }})
        }
        // this.dispatchEvent('open-panel', { detail: {opened: true }})
    }

    measureFeaturesClick(e) {
        e.preventDefault();

        console.log('MEEASURE FEATURES CLICK');
    }

    render() {
        return html`
            <div style="text-align: center;">
                <h2>Show Measurement Tools</h2>
                <input type="checkbox" id="scales" name="scales"
             checked @change=${this.toggleMeasurementTools} @input=${this.checkboxClicked}>
                <input value="Select a features" type="button" @click=${this.measureFeaturesClick} />
            </div>
        `
    }
}

customElements.define('measurement-panel', MeasurementPanel);