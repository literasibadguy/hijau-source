import { html, LitElement, css } from "lit";


export class ResizeBar extends LitElement {

    static styles = css`
        :host {
            z-index: 1;
            position: relative;
        }

        :host([dimension='width']) {
            width: 3px;
        }

        :host([dimension='height']) {
            height: 3px;
        }

        :host([dimension='width']) > #touchTarget {
            cursor: col-resize;
            position: absolute;
            top: 0;
            left: calc(var(--resize-bar-touch-size, 6px) / -2);
            width: var(--resize-bar-touch-size, 6px);
            height: 100%;
        }

    `
    
    static get properties() {
        return {
            target: { type: String },
            property: { type: String },
            active: { type: Boolean, reflect: true },
            dimension: { type: String },
            resizing: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.dimension = "width";
        this.target = '';
        this.property = '';
        this.active = false;
        this._hoverTimer = null;
        this.resizing = false;
        this._updateSizeRafId = null;
    }

    _onPointerOver() {
        setTimeout(() => {
            this.active = true;
        }, 300);
    }

    _onPointerLeave() {
        if (this.active && !this.resizing) {
            this.active = false;
        }
        if (this._hoverTimer !== undefined) {
            clearTimeout(this._hoverTimer);
            this._hoverTimer = undefined;
        }
    }

    _onPointerDown(pointerEvent) {
        console.log(pointerEvent);

        console.log(this.target);

        const target = this.getRootNode().documentElement.querySelector(`#${this.target}`);
        console.log(target);

        if (!target) {
            return;
        }

        console.log('Is there any target', target);

        this.active = true;
        this.resizing =  true;
        this.setPointerCapture(pointerEvent.pointerId);
        const isWidthDimension = this.dimension === 'width';
        const { left, right, top, bottom } = target.getBoundingClientRect();
        const oldSize = isWidthDimension ? right - left : bottom - top;

        let clientX = 0;
        let clientY = 0;

        const onPointerMove = (event) => {
            clientX =  event.clientX;
            clientY = event.clientY;
            requestAnimationFrame(() => {
                // this._updateSizeRafId = undefined;
                if (!this.property) {
                    return;
                }

                const newSize = Math.max(0, isWidthDimension ? oldSize  + clientX - right :  oldSize - clientY + top);
                document.documentElement.style.setProperty(this.property, `${newSize}px`)
            })
        }

        this.addEventListener('pointermove', onPointerMove);
        this.addEventListener('pointerup', () => {
            this.releasePointerCapture(pointerEvent.pointerId);
            this.active = false;
            this.resizing = false;
        }, {once: true})
    }

    render() {
        return html`
            <div
                id="touchTarget"
                @pointerover=${this._onPointerOver}
                @pointerleave=${this._onPointerLeave}
                @pointerdown=${this._onPointerDown}
            ></div>
        `
    }
}

customElements.define('resize-bar', ResizeBar);