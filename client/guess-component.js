export class GuessComponent extends HTMLElement {

    constructor() {
        super();
        this.onChange = () => {
            const value = +this.inputElement.value;
            const isRight = value === (this.row * this.col);
            if (isRight) {
                this.inputElement.classList.add('right')
                this.inputElement.classList.remove('wrong')
                this.inputElement.readOnly = true;
            } else {
                this.inputElement.classList.remove('right')
                this.inputElement.classList.add('wrong')
            }
            this.dispatchEvent(new CustomEvent('answer', {detail: {isRight}}));
        };
    }

    connectedCallback() {
        this.render();
        this.setEventandlers();
    }

    static get observedAttribute() {
        return ['row', 'col']
    }

    get row() {
        return +this.attributes['row'].value
    }

    get col() {
        return +this.attributes['col'].value
    }
    get inputElement() {
        return this.querySelector('input')
    }




    setEventandlers() {
        this.querySelector('input').addEventListener('change', this.onChange)
    }

    render() {
        this.innerHTML = `<label><div style="max-width: 0; max-height: 0; color: white; overflow: hidden">${this.row}X${this.col}</div><input type="text"></label>`
    }
}

customElements.define('guess-component', GuessComponent);
