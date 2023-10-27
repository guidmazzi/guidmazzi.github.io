export function createEventsProducts() {
    const opcao = document.querySelectorAll('.opt');
    const carrinho = document.querySelector('.appendCarrinho');
    opcao.forEach((opt) => {
        opt.addEventListener('click', function () {
            const cardText = opt.querySelector('.card-text').textContent;
            const price = opt.querySelector('#price').textContent;
            const id = opt.id.split('-')[1];
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
                id: parseInt(id),
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
}

function setCarrinho(carrinho) {
    sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
    const event = new Event('carrinhoUpdated');
    window.dispatchEvent(event);
}

export function getCarrinho() {
    return JSON.parse(sessionStorage.getItem('carrinho')) || [];
}