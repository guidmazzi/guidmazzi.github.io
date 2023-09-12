sessionStorage.setItem('carrinho', [])

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

const pile = new Stack();
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


window.onload = function () {
    const opcao = document.querySelectorAll('.opt');
    const carrinho = document.querySelector('.appendCarrinho');
    opcao.forEach((opt) => {
        opt.addEventListener('click', function () {
            const cardText = opt.querySelector('.card-text').textContent;
            const price = opt.querySelector('#price').textContent;
            const cartItem = document.createElement('div');
            cartItem.className = 'list';
            cartItem.innerHTML = `
                <div class="d-flex w-100 align-items-center justify-content-between">
                    <strong class="mb-1 produto"> ${cardText} </strong>
                    <button class="remove-button"> 
                        <i class="fa-solid fa-x"></i>
                    </button>
                </div>
                <div class="col-10 mb-1 small price"> ${price} </div>
            `;
            carrinho.appendChild(cartItem);

            const priceFloat = parseFloat(price.replace('R$', '').replace(',', '.'));
            const updateCarrinho = {
                produto: cardText,
                preco: priceFloat,
            };
            let currentCarrinho = JSON.parse(sessionStorage.getItem('carrinho') || '[]');
            console.log(currentCarrinho)
            console.log(typeof currentCarrinho)
            currentCarrinho.push(updateCarrinho);
            setCarrinho(currentCarrinho);
        })
    })

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-button')) {
            const listItem = event.target.closest('.list');
            const cardText = listItem.querySelector('.produto').textContent;
            const price = listItem.querySelector('.price').textContent;
            if (listItem) {
                listItem.remove();
            }

            const carrinho = JSON.parse(sessionStorage.getItem('carrinho'));
            for (let i = 0; i < carrinho.length; i++) {
                const item = carrinho[i];
                console.log(typeof item.produto, typeof cardText)
                if (item.produto.trim() === cardText.trim()) {
                    const indexToRemove = carrinho.findIndex(item => item.produto.trim() === cardText.trim());
                    console.log(indexToRemove)
                    if (indexToRemove !== -1) {
                        carrinho.splice(indexToRemove, 1);
                        setCarrinho(carrinho);
                    }
                }
            }
        }
    });
};

voltar.forEach((div) => {
    div.addEventListener('click', function () {
        console.log(pile)
        choice.style.display = 'none';
        escolhaLanche.style.display = 'none';
        snackChoice.style.display = 'none';
        drinkChoice.style.display = 'none';
        portionChoice.style.display = 'none';
        comboChoice.style.display = 'none';
        lanche.style.d
        pile.pop()
        const lastPeek = pile.peek()
        console.log(lastPeek)
        const div = pile.consultStack(lastPeek)
        console.log(div)
        div.style.display = 'block';
    })
});

function setCarrinho(carrinho) {
    sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
    const event = new Event('carrinhoUpdated');
    window.dispatchEvent(event);
}

function getCarrinho() {
    return JSON.parse(sessionStorage.getItem('carrinho')) || [];
}

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