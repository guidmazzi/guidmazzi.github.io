import { getData } from './utils.js';
import { createEventsProducts, getCarrinho } from './carrinho.js';

sessionStorage.setItem('carrinho', [])
// export const URL = 'https://90d9-2804-431-d77c-de59-51a4-a7b5-de76-4562.ngrok-free.app/'
export const URL = 'https://7ed9-2804-431-d77d-aac7-4157-cf84-5b39-460e.ngrok-free.app/'

class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.items.length == 0)
            return 0;
        return this.items.pop();
    }
    peek() {
        if (!this.items[this.items.length - 1]) {
            return 1;
        } else {
            return this.items[this.items.length - 1]
        };
    }
    isEmpty() {
        return this.items.length == 0;
    }
    consultStack(step) {
        switch (step) {
            case 1:
                return document.querySelector('#initial');
            case 2:
                return document.querySelector('.choice');
            case 3:
                return document.querySelector('.type-choice');
            case 4:
                return document.querySelector('.snack-choice');
            case 5:
                return document.querySelector('.settings');
            case 6:
                return document.querySelector('#finalize-cart');
        }
    }
}

const pedido = document.querySelector('#pedido');
const accessibilidade = document.querySelector('#accessibiliade');
const choice = document.querySelector('.choice');
const comer = document.querySelector('#comer');
const levar = document.querySelector('#levar');
const configuracoes = document.querySelector('.settings');
const escolhaLanche = document.querySelector('.type-choice');
const initial = document.querySelector('.initial');
const voltar = document.querySelectorAll('.icon');

export const pile = new Stack();
pile.push(1);

accessibilidade.addEventListener('click', function() {
    initial.style.display = 'none'
    configuracoes.style.display = 'block';
    pile.push(5);
    console.log(pile)
})

pedido.addEventListener('click', function () {
    initial.style.display = 'none'
    choice.style.display = 'block';
    pile.push(2);
    console.log(pile)
})

comer.addEventListener('click', function () {
    choice.style.display = 'none';
    escolhaLanche.style.display = 'block';
    pile.push(3)
    console.log(pile)
})

levar.addEventListener('click', function () {
    choice.style.display = 'none';
    escolhaLanche.style.display = 'block';
    pile.push(3);
    console.log(pile)
})

const lanche = document.querySelector('#snack');
const snackChoice = document.querySelector('.snack-choice');
const bebida = document.querySelector('#drink');
const drinkChoice = document.querySelector('.drink-choice')
const porcao = document.querySelector('#portion');
const portionChoice = document.querySelector('.portion-choice');
const combo = document.querySelector('#combo');
const comboChoice = document.querySelector('.combo-choice');
const settings = document.querySelector('.settings');
const cart = document.querySelector('#finalize-cart');


lanche.addEventListener('click', function () {
    escolhaLanche.style.display = 'none';
    snackChoice.style.display = 'block';
    pile.push(4)
    console.log(pile)
})

bebida.addEventListener('click', function () {
    escolhaLanche.style.display = 'none';
    drinkChoice.style.display = 'block';
    pile.push(4)
    console.log(pile)
})

porcao.addEventListener('click', function () {
    escolhaLanche.style.display = 'none';
    portionChoice.style.display = 'block';
    pile.push(4)
    console.log(pile)
})

combo.addEventListener('click', function () {
    escolhaLanche.style.display = 'none';
    comboChoice.style.display = 'block';
    pile.push(4)
    console.log(pile)
})

voltar.forEach((div) => {
    div.addEventListener('click', function () {
        console.log(pile)
        clearAllDivs()
        pile.pop()
        const lastPeek = pile.peek()
        console.log(lastPeek)
        const div = pile.consultStack(lastPeek)
        console.log(div)
        div.style.display = 'block';
    })
});

window.addEventListener('carrinhoUpdated', function () {
    console.log('carrinho updated:', getCarrinho());
    const carrinho = getCarrinho();
    let price = 0;
    carrinho.forEach((obj) => {
        price += obj.preco;
    })
    price = price.toFixed(2);
    document.querySelector('.preco-total').innerHTML = `Preço Total: R$ ${price}` 
});

const prefix = 'products'
getData(URL+prefix).then(data => {
    const snacks = data.filter(row => row.category === 'lanche');
    const drinks = data.filter(row => row.category === 'bebida');
    const portions = data.filter(row => row.category === 'porcao');
    const combos = data.filter(row => row.category === 'combo');

    snacks.sort((a, b) => a.id - b.id);
    drinks.sort((a, b) => a.id - b.id);
    portions.sort((a, b) => a.id - b.id);
    combos.sort((a, b) => a.id - b.id);
    
    console.log('snacks: ', snacks)
    console.log('drinks: ', drinks)
    console.log('portions: ', portions)
    console.log('combos: ', combos)
    // const snacks = snack + snacks2

    createOptionDivs(snacks, 'sn');
    createOptionDivs(drinks, 'dr');
    createOptionDivs(portions, 'pt');
    createOptionDivs(combos, 'cb');

    createEventsProducts()
    console.log(data)

}).catch(console.log());

function createOption(row, type) {
    const divRowContent = document.createElement('div');
    divRowContent.className = 'col card opt'
    divRowContent.id = `${type}-${row.id}`

    const textDiv = document.createElement('div');
    textDiv.className = 'row card-text';
    textDiv.textContent = `${row.name}`;

    const imageDiv = document.createElement('div');
    const image = document.createElement('img');
    image.src = `${row.img_source}`;
    image.className = 'img-card';
    imageDiv.appendChild(image);

    const priceDiv = document.createElement('div');
    priceDiv.id = 'price';
    priceDiv.className = 'row';
    priceDiv.textContent = `R$ ${row.price.toFixed(2)}`;

    divRowContent.appendChild(textDiv);
    divRowContent.appendChild(imageDiv);
    divRowContent.appendChild(priceDiv);

    return divRowContent
}

function createOptionDivs(categoryArray, type) {
    const div = document.querySelector(`.${getNameType(type)}-content`)
    console.log(`.${getNameType(type)}-content`)

    for (let i = 0; categoryArray.length > i; i += 2){
        const divRow = document.createElement('div');
        divRow.className = 'row';

        let divRowImpar;
        const divRowContent = createOption(categoryArray[i], type);
        if (i + 1 < categoryArray.length) {
            divRowImpar = createOption(categoryArray[i + 1], type);
        };

        divRow.appendChild(divRowContent);
        if (divRowImpar) {
            divRow.appendChild(divRowImpar) ;
        } else {
            const emptyCol = document.createElement('div');
            emptyCol.className = 'col';
            divRow.appendChild(emptyCol);
        };
        div.appendChild(divRow)
    };
}

function getNameType(type) {
    switch (type) {
        case 'sn':
            return 'snack';
        case 'dr':
            return 'drink';
        case 'pt':
            return 'portion';
        case 'cb':
            return 'combo';
    }
}

export function clearAllDivs() {
    initial.style.display = 'none';
    choice.style.display = 'none';
    escolhaLanche.style.display = 'none';
    snackChoice.style.display = 'none';
    drinkChoice.style.display = 'none';
    portionChoice.style.display = 'none';
    comboChoice.style.display = 'none';
    settings.style.display = 'none';
    cart.style.display = 'none';
}

const adm = document.querySelector('#adm');
adm.addEventListener('click', function() {
    window.location.href = 'admin/login.html';
})