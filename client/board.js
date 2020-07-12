import './guess-component.js';

export class MultiplictionBoard extends HTMLElement {
    constructor() {
        super();
        this.answer = (evt) => {
            const {isRight} = evt.detail;
            if (isRight) {
                this.querySelector('progress').value++;
                if (this.querySelector('progress').value === this.guesses) {
                    this.dispatchEvent(new CustomEvent('play-all-success'));
                } else {
                    this.dispatchEvent(new CustomEvent('play-success'))
                }
            } else {
                this.dispatchEvent(new CustomEvent('play-mistake'))
            }
        }
    }
    connectedCallback() {
        this.render();
    }

    renderCell(row, col) {
        const random = Math.round( Math.random() * 2);
        if (random % 2 === 0 || row === 0 || col === 0) {
            return `${(row + 1) * (col + 1)}`;
        }
        this.guesses++;
        return `<guess-component col="${col + 1}" row="${row + 1}"></guess-component>`;
    }
    cells() {
        let result = '';
        for (let rows = 0; rows < 10; rows++) {
            result += `<div class="row">`;
            for (let cols = 0; cols < 10; cols ++) {
                result += `<div class="cell">${this.renderCell(rows, cols)}</div>`
            }
            result += `</div>`;

        }
        return result;
    }



    render() {
        this.guesses = 0;
        this.innerHTML = `<div>
            ${this.cells()}
            <progress max="${this.guesses}" value="0"></progress>
</div>

`
        this.querySelectorAll('guess-component').forEach(item => {
            item.addEventListener('answer', this.answer);
        })
    }

}

customElements.define('multipliction-board', MultiplictionBoard);
