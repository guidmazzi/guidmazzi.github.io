import { getData, postData } from '../static/js/utils.js'
// import { URL } from '../static/js/home.js';
const URL = 'https://7ed9-2804-431-d77d-aac7-4157-cf84-5b39-460e.ngrok-free.app/'

document.addEventListener('DOMContentLoaded', function() {
    let id = 0;
    const newUrl = URL + 'products'
    getData(newUrl).then(data => {
        data.forEach(d => {
            if (id < d.id){
                id = d.id
            }
        })
        const form = document.getElementById('formulariocadastrolanche');
        const idInput = form.querySelector('.idcamp');
        idInput.value = id + 1
    }).catch(console.log());

    const sections = [
        {
            button: document.querySelector('.cadastro'),
            target: document.querySelector('.divformulario'),
            button2: document.querySelector('.logo2'),
        },
        {
            button: document.querySelector('.setaeditar'),
            target: document.querySelector(".itenseditar"),
            container: document.querySelector('.editar'),
            img: document.querySelector('.setaeditar-img'),
            button2: document.querySelector('.logo2'),
        },
        {
            button: document.querySelector('.cadastroeditqdd'),
            target: document.querySelector(".itenseditarcadastro"),
            img: document.querySelector('.setaeditarcadastrosub-img'),
            button2: document.querySelector('.logo2'),
        },
        {
            button: document.querySelector('.logo'),
            button2: document.querySelector('.lateraloff'),
            target1: document.querySelector('.lateral'),
            target2: document.querySelector('.lateraloff'),
            image: document.querySelector('.logo2'),
        },
        {
            button: document.querySelector('.cadastrolanches'),
            target: document.querySelector('.edit-div'),
            button2: document.querySelector('.logo2'),
        },
    ];

    function toggleSection(section) {
        if (section.target) {
            const target = document.querySelector('.edit-div');
            target.style.display = 'none';
            const formEditDiv = document.querySelector('.div-form-edit');
            formEditDiv.style.display = 'none';
            const doc = document.querySelector('#vendas');
            doc.style.display = 'none';

            const computedStyle = window.getComputedStyle(section.target);
    
            if (computedStyle.display === "none" || computedStyle.display === "") {
                section.target.style.display = "flex";
                if (section.container) {
                    section.container.style.borderRadius = "5px 0 0 0";
                }
                if (section.img) {
                    section.img.style.transform = "rotate(90deg)";
                }
            } else if (computedStyle.display === "flex") {
                section.target.style.display = "none";
                if (section.container) {
                    section.container.style.borderRadius = "5px 0 0 5px";
                }
                if (section.img) {
                    section.img.style.transform = "rotate(0deg)";
                }
            }
        }
    }

    function toggleSideBar(section) {
        if (section.target1 && section.image) {
            const computedStyle = window.getComputedStyle(section.target1);

            if (computedStyle.display === "none" || computedStyle.display === "") {
                section.target1.style.display = "block";
                section.target2.style.display = "none";
                section.image.style.display = "none";
            } else if (computedStyle.display === "block") {
                section.target1.style.display = "none";
                section.target2.style.display = "block";
                section.image.style.display = "block";
            }
        }
    }

    sections.forEach((section) => {
        section.button.addEventListener('click', () => {
            toggleSection(section);
        });
        section.button.addEventListener('click', () => {
            toggleSideBar(section);
        });
        section.button2.addEventListener('click', () => {
            toggleSideBar(section);
        });
    });

    const inputField = document.querySelector('.precocamp');
    if (inputField) {
        inputField.addEventListener('input', function() {
            formatarDinheiro(inputField);
        });
    }

    const lancheDoc = document.querySelector('.cadastrolanches');
    lancheDoc.addEventListener('click', function () {
        const formCadastro = document.querySelector('.divformulario');
        formCadastro.style.display = 'none';
        const doc = document.querySelector('#vendas');
        doc.style.display = 'none';

        const target = document.querySelector('.edit-div');
        target.style.display = 'block';
        

        const urlTotal = URL + 'products/type?' + new URLSearchParams({
            category: 'lanche'
        })
        getData(urlTotal).then(data => {
            populateTable(data)
        })
    });

    const bebidaDoc = document.querySelector('.cadastrobebidas');
    bebidaDoc.addEventListener('click', function () {
        const formCadastro = document.querySelector('.divformulario');
        formCadastro.style.display = 'none';
        const doc = document.querySelector('#vendas');
        doc.style.display = 'none';

        const target = document.querySelector('.edit-div');
        target.style.display = 'block';

        const urlTotal = URL + 'products/type?' + new URLSearchParams({
            category: 'bebida'
        })
        getData(urlTotal).then(data => {
            populateTable(data)
        })

    });

    const porcaoDoc = document.querySelector('.cadastroporcoes');
    porcaoDoc.addEventListener('click', function () {
        const formCadastro = document.querySelector('.divformulario');
        formCadastro.style.display = 'none';
        const doc = document.querySelector('#vendas');
        doc.style.display = 'none';

        const target = document.querySelector('.edit-div');
        target.style.display = 'block';

        const urlTotal = URL + 'products/type?' + new URLSearchParams({
            category: 'porcao'
        })
        getData(urlTotal).then(data => {
            populateTable(data)
        })

    });

    const comboDoc = document.querySelector('.cadastrocombos');
    comboDoc.addEventListener('click', function () {
        const formCadastro = document.querySelector('.divformulario');
        formCadastro.style.display = 'none';
        const doc = document.querySelector('#vendas');
        doc.style.display = 'none';

        const target = document.querySelector('.edit-div');
        target.style.display = 'block';

        const urlTotal = URL + 'products/type?' + new URLSearchParams({
            category: 'combo'
        })
        getData(urlTotal).then(data => {
            populateTable(data)
        })

    });
});

function formatarDinheiro(input) {
    let valor = input.value.replace(/[^\d]/g, "");
    if (valor.length === 0) {
        input.value = 'R$0,00';
        return;
    }

    let numero = parseFloat(valor);
    if (isNaN(numero)) {
        input.value = 'R$0,00';
        return;
    }

    let dinheiro = (numero / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    input.value = dinheiro;
}


function clearTable() {
    const table = document.getElementById('product-table');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = ''; // Clear the table body
}


function populateTable(data) {
    clearTable();

    const table = document.getElementById('product-table');
    const tbody = table.querySelector('tbody');

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${capitalizeFirstLetter(item.category)}</td>
            <td>
                <button class="edit edit-button" data-id="${item.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const formEditDiv = document.querySelector('.div-form-edit');
            const tableDiv = document.querySelector('.edit-div');

            const id = button.getAttribute('data-id');
            const row = button.closest('tr');

            const name = row.querySelector('td:nth-child(2)').textContent;
            const price = row.querySelector('td:nth-child(3)').textContent;
            const category = row.querySelector('td:nth-child(4)').textContent;

            const form = document.getElementById('form-edit');
            const nomeInput = form.querySelector('.nomecamp');
            const idInput = form.querySelector('.idcamp');
            const precoInput = form.querySelector('.precocamp');
            const categoriaSelect = form.querySelector('#select-edit');

            nomeInput.value = name
            idInput.value = id
            precoInput.value = price
            categoriaSelect.value = lowerFirstLetter(category);

            tableDiv.style.display = 'none';
            formEditDiv.style.display = 'block';
        });
    });
}


const submitRegister = document.querySelector('#submit-register');
submitRegister.addEventListener('click', function (e) {
    e.preventDefault()
    
    const form = document.getElementById('formulariocadastrolanche');
    const nomeInput = form.querySelector('.nomecamp');
    const precoInput = form.querySelector('.precocamp');
    const categoriaSelect = form.querySelector('.categoriacamp');

    const nomeValue = nomeInput.value;
    const categoriaValue = categoriaSelect.value;

    const precoValue = precoInput.value;
    const numericPart = precoValue.match(/[\d.,]+/);
    const numericValue = parseFloat(numericPart[0].replace(',', '.'));

    if (!nomeValue){
        alert("Campo 'Nome' nao preenchido")
        return;
    } else if (numericValue < 0.1) {
        alert("Campo 'Preço' nao preenchido")
        return;
    } else if (categoriaValue === 'none') {
        alert("Campo 'Categoria' nao preenchido")
        return;
    }

    const urlTotal = URL + `products`
    const params = {
        name: nomeValue,
        price: numericValue,
        category: categoriaValue
    }
    postData(urlTotal, params).then(data => {
        location.reload();
    }).catch(error => {
        console.error('An error occurred:', error);
    });
});

const submitEdit = document.querySelector('#submit-edit');
submitEdit.addEventListener('click', function (e) {
    e.preventDefault();
    
    const form = document.getElementById('form-edit');
    const nomeInput = form.querySelector('.nomecamp');
    const idInput = form.querySelector('.idcamp');
    const precoInput = form.querySelector('.precocamp');
    const categoriaSelect = form.querySelector('#select-edit');

    const nomeValue = nomeInput.value;
    const idValue = idInput.value;
    const categoriaValue = categoriaSelect.value;

    const precoValue = precoInput.value;
    const numericPart = precoValue.match(/[\d.,]+/);
    const numericValue = parseFloat(numericPart[0].replace(',', '.'));

    const urlTotal = URL + `products/${idValue}`
    const params = {
        name: nomeValue,
        price: numericValue,
        category: categoriaValue
    }
    postData(urlTotal, params).then(data => {
        location.reload();
    }).catch(error => {
        console.error('An error occurred:', error);
    });
});


const submitDelete = document.querySelector('#submit-delete');
submitDelete.addEventListener('click', function (e) {
    e.preventDefault();

    if (confirm('Tem certeza que deseja deletar este produto?')) {
        const form = document.getElementById('form-edit');
        const idInput = form.querySelector('.idcamp');
        const idValue = idInput.value;

        const urlTotal = URL + `products/${idValue}`
        fetch(urlTotal, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.status === 202) {
                location.reload();
            } else {
                console.error('An error occurred. Status:', response.status);
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
    }
    
});


const backButton = document.querySelector('.voltar');
backButton.addEventListener('click', function () {
    window.location.href = "../index.html";
})


const report = document.querySelector('.relatorios');
report.addEventListener('click', function () {
    const doc = document.querySelector('#vendas');
    doc.style.display = 'block';
    const target = document.querySelector('.edit-div');
    target.style.display = 'none';
    const formEditDiv = document.querySelector('.div-form-edit');
    formEditDiv.style.display = 'none';
    const formCadastro = document.querySelector('.divformulario');
    formCadastro.style.display = 'none';
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function lowerFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

let simulatedResponse;
document.addEventListener('DOMContentLoaded', function() {
    
    const newUrl = URL + 'admin'
    getData(newUrl).then(data => {
        simulatedResponse = data;
        for (const vendaId in simulatedResponse) {
            console.log(simulatedResponse)
            console.log(vendaId)
            const sumOfPrices = simulatedResponse[vendaId].reduce((total, item) => total + item.price, 0);
    
            let vendaContainer = document.createElement('div');
            vendaContainer.classList.add('venda-container');
    
            let div = document.createElement('div');
            div.classList.add('row-sale');
            let span = document.createElement('span');
            span.innerText = `Venda #${vendaId} - Total: R$${sumOfPrices.toFixed(2)}`;
            span.style.userSelect = "none";
            div.appendChild(span)
    
            let produtosContainer = document.createElement('div');
            produtosContainer.classList.add('produtos-container');
            produtosContainer.style.display = "none";
            
            // Evento de clique para mostrar ou ocultar os produtos
            div.addEventListener('click', function() {
                if (produtosContainer.style.display === "none") {
                    produtosContainer.style.display = "block";
                    mostrarProdutos(vendaId, produtosContainer);
                } else {
                    produtosContainer.style.display = "none";
                }
            });
    
            vendaContainer.appendChild(div);
            vendaContainer.appendChild(produtosContainer);
            vendasDiv.appendChild(vendaContainer);
        }
    }).catch(console.log)
    // Referência ao elemento 'vendas'
    let vendasDiv = document.getElementById('vendas');
    let vendaIDS = [];
    // Função para mostrar os produtos de uma venda específica
    function mostrarProdutos(vendaId, container) {
        if (vendaIDS.includes(vendaId)) {
            return;
        }
        vendaIDS.push(vendaId)
        let produtos = simulatedResponse[vendaId];
        let table = document.createElement('table');
        let headers = ["Produto", "Preço", "Categoria"];

        // Criação do cabeçalho da tabela
        let header = table.insertRow(0);
        for (let i = 0; i < headers.length; i++) {
            let th = document.createElement('th');
            th.innerHTML = headers[i];
            header.appendChild(th);
        }

        // Preenchimento da tabela com os produtos
        produtos.forEach(produto => {
            let row = table.insertRow();
            let productName = row.insertCell(0);
            let productPrice = row.insertCell(1);
            let productCategory = row.insertCell(2);
            productName.innerHTML = produto.product;
            productPrice.innerHTML = formatCurrency(produto.price);
            productCategory.innerHTML = formatCategory(produto.category);
        });

        container.appendChild(table);
    }

    // Função para formatar o valor monetário
    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Função para formatar a categoria
    function formatCategory(category) {
        return category.toLowerCase() === 'porcao' ? 'Porção' : category.charAt(0).toUpperCase() + category.slice(1);
    }

    // Criação dos elementos para cada venda e manipulação dos eventos
    console.log(simulatedResponse)

});