import { html, LitElement } from "lit";

export default class MarkerSettings extends LitElement {

    constructor() {
        super();

        this.options = {
            shape: 'MAP_PIN',
            size: '32',
            width: 32,
            height: 32,
            shapeFill: 'red',
            shapeFillOpacity: 1,
            shapeStroke: '#323333',
            shapeStrokeWidth: 1,
            icon: 'none',
            iconFill: 'white',
            iconFillOpacity: 1,
            iconStroke: '#323333',
            iconStrokeWidth: 0,
            inverted: false
        }


    }

    /**
     * Form Change Submitted
     * @param {Event} e 
     */
    formChangeSubmitted(e) {
        console.log('MARKER SETTINGS', e);

        this.dispatchEvent(new CustomEvent('marker-setting-changed', {
            bubbles: true,
            composed: true,
            detail: {
                marker: e.target.value
            }
        }))
    }

    render() {
        const shapeOptions = [
            {value: 'MAP_PIN', label: 'Map Pin'},
            {value: 'SQUARE_PIN', label: 'Square Pin'},
            {value: 'SQUARE_ROUNDED', label: 'Rounded Square'},
            {value: 'SQUARE', label: 'Square'},
            {value: 'CIRCLE', label: 'Circle'}
          ]

          const sizeOptions = [
            {value: '16', label: '16'},
            {value: '24', label: '24'},
            {value: '32', label: '32'},
          ]

        return html`
            <div>
                <form @input=${this.formChangeSubmitted}>
                    <select name='shape' required>
                        ${shapeOptions.forEach((shape) => {
                            return html`
                                <option value=${shape.value}></option>
                            `
                        })}
                    </select>
                    <select name='size' required>
                        ${sizeOptions.forEach((shape) => {
                            return html`
                                <option value=${shape.value}></option>
                            `
                        })}
                    </select>
                    <button type='submit'>CHANGE MARKER</button>
                </form>
            </div>
        `
    }
}

customElements.define('marker-settings', MarkerSettings);