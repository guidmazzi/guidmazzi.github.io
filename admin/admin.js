document.addEventListener('DOMContentLoaded', function() {
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
            button: document.querySelector('.setarelatorios'),
            target: document.querySelector(".itensrelatorios"),
            container: document.querySelector('.relatorios'),
            img: document.querySelector('.setarelatorios-img'),
            button2: document.querySelector('.logo2'),
        },
        {
            button: document.querySelector('.setaopcoes'),
            target: document.querySelector(".itensopcoes"),
            container: document.querySelector('.opcoes'),
            img: document.querySelector('.setaopcoes-img'),
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
        }
    ];

    function toggleSection(section) {
        if (section.target) {
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

    const inputField = document.querySelector('.precocamp'); // Substitua 'seu-campo-de-texto' com o seletor correto do seu campo de texto
    if (inputField) {
        inputField.addEventListener('input', function() {
            formatarDinheiro(inputField);
        });
    }
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

