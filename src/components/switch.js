import { css, html, LitElement } from "lit";

export default class SwitchToggle extends LitElement {

    static styles = css`

        .switch--input {
            width: 1px;
            height: 1px;
            display: none ;
        }

        .switch---input__label {
            display: flex;
            flex-direction:column ;
            align-items: center ;
        }

        .toggle__switch {
            position: relative;
            display: flex;
            width: 3rem;
            height: 1.5rem;
            cursor: pointer;
            align-items: center
        }

        .toggle__switch::before {
            position: absolute;
            background-color: gray;
            width: 3rem;
            
            height: 1.5rem;
            box-sizing: border-box;
            border-radius: 1rem;
            content: "";
            will-change: box-shadow;
         }

         .switch--input:checked + .switch---input__label > .toggle__switch::before {
            background-color: green;
        }

         .toggle__switch::after {
            position: absolute;
            left: 2px;
            display: block;
            width: 1.125rem;
            height: 1.125rem;
            box-sizing: border-box;
            border-radius: 50%;
            content: "";
            transition: transform 70ms cubic-bezier(0.2, 0, 1, 0.9) 0s, transform 70ms cubic-bezier(0.2, 0, 1, 0.9) 0s ;
            background-color: black;
         }

         .switch--input:checked + .switch---input__label > .toggle__switch::after {
            transform: translateX(1.5rem) ;
        }

         .switch__text--off, .switch__text--on {
            position: absolute;
            margin-left: 3.5rem;
            font-size: 1rem;
            font-weight: 400;
            user-select: none;
            white-space: nowrap;
         }

         .switch--input:checked + .switch---input__label > .toggle__switch > .switch__text--off {
            visibility: hidden;
        }

        .switch--input:not(:checked) + .switch---input__label > .toggle__switch > .switch__text--on {
            visibility: hidden;
        }
    `

    static get properties() {
        return {
            name: { type: String },
            value: { type: String },
            labelText: { type: String, attribute: 'label-text' },
            checked: { type: Boolean, reflect: true },
            indeterminate: { type: Boolean, reflect: true },
            checkedText: { type: String, attribute: 'checked-text' },
            uncheckedText: { type: String, attribute: 'unchecked-text' },
            size: { type: String, reflect: true }
        }
    }

    constructor() {
        super();

        this.labelText = '';
        this.checked = false;
        this.indeterminate = false;
        this.checkedText = 'On';
        this.uncheckedText = 'Off';
    }

    _handleChange(e) {
        this.checked = e.target.checked;
        this.indeterminate = e.target.indeterminate;
        this.dispatchEvent(new CustomEvent('switch-change', {
            bubbles: true,
            composed: true,
            detail: {
                indeterminate: e.target.indeterminate,
            }
        }))
    }

    render() {
        const { name, value, labelText, checked, indeterminate, uncheckedText, checkedText, _handleChange:  handleChange} = this;

        return html`
            <input 
                id="checkbox"
                class="switch--input"
                type="checkbox"
                .checked="${checked}"
                .indeterminate="${indeterminate}"
                name="${name}"
                value="${value}"
                @change="${handleChange}"
            />
            <label for="checkbox" class="switch---input__label">
                <slot name="label-text">${labelText}</slot>
                <span class="toggle__switch">
                    <span class="switch__text--off" aria-hidden="true">
                        <slot name="unswitch-text">${uncheckedText}</slot>
                    </span>
                    <span class="switch__text--on" aria-hidden="true">
                        <slot name="switch-text">${checkedText}</slot>
                    </span>
                </span>
            </label>
        `
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('switch-toggle', SwitchToggle);