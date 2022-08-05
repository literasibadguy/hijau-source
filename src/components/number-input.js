
import { html, LitElement } from "lit";
import '../../node_modules/lit/directives/class-map';
import { classMap } from "../../node_modules/lit/directives/class-map";

export class NumberInput extends LitElement {

    static get properties()  {
        return {
            invalid: { type: Boolean, reflect: true },
            disabled: { type: Boolean, reflect: true },
        }
    }

    set value(value) {
        this._value = value;

    }

    constructor() {
        super();

        this.invalid = false;
        this.disabled = false;
        this._value = '';
        this.pattern = /^\d+$/;
    }

    connectedCallback() {
        super.connectedCallback();
    }

    /**
     * Handles `input` event on the `<input>` in the Shadow DOM.
     * @param {Event} e 
     */
    _handleInput(e) {
        const { target } = e;
        const { value } = target;

        if (!this.pattern.test(value)) {
            this.invalid = true;
        } else {
            this.invalid = false;
        }

        this.dispatchEvent(new CustomEvent('number-input'), {
            bubbles: true,
            composed: true,
            cancelable: false,
            detail: {
                value
            }
        });
    }

    _handleUserStepUp() {
        this._input = this.querySelector('#input');
        if (!this._input) {
            console.log("INPUT NOT CONNECTED TO STEP UP");
            return;
        }

        this._input.stepUp();
    }

    _handleUserStepDown() {
        this._input = this.querySelector('#input');
        if (!this._input) {
            console.log("INPUT NOT CONNECTED TO STEP UP");
            return;
        }

        this._input.stepDown();
    }

    render() {
        const {
            _handleInput: handleInput,
            _handleUserStepUp: handleUserStepUp,
            _handleUserStepDown: handleUserStepDown,
        }  = this;

        const wrapperClasses = classMap({
            ['hijau--number']: true,
            ['hijau--number-input--invalid']: this.invalid
        })

        const incrementButton = html`
            <button
                class="hijau--number__control-btn up-icon"
                aria-live="polite"
                aria-atomic="true"
                type="button"
                ?disabled=${this.disabled}
                @click=${handleUserStepUp}
            >
            <img src="icons/chevron-up.svg" />
            </button>
        `

        const decrementButton = html`
            <button
                class="hijau--number__control-btn down-icon"
                aria-live="polite"
                aria-atomic="true"
                type="button"
                ?disabled=${this.disabled}
                @click=${handleUserStepDown}
            >
                <img src="icons/chevron-down.svg" />
            </button>
        `

        
        return html`
            <div class="${wrapperClasses}" ?data-invalid=${this.invalid}>
                <input 
                    class="hijau-number-input"
                    ?data-invalid=${this.invalid}
                    id="input"
                    .pattern=${this.pattern}
                    .value="${this._value}"
                    type="number"
                    role="alert"
                    @input=${handleInput}
                    aria-atomic="true"
                />
                <div class="hijau--number__controls">
                        ${incrementButton} ${decrementButton}
                </div>
            </div>
        `
    }

    createRenderRoot() {
        return this;
    }

}

customElements.define('number-input', NumberInput);