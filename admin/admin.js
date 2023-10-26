document.addEventListener('DOMContentLoaded', function() {
    const sections = [
        {
            borderbutton: document.querySelector('.setacadastro'),
            button: document.querySelector('.setacadastro'),
            target: document.querySelector(".itenscadastro"),
            container: document.querySelector('.cadastro'),
            img: document.querySelector('.setacadastro-img'),
            button2: document.querySelector('.logo2'),
        },
        {
            borderbutton: document.querySelector('.setaeditar'),
            button: document.querySelector('.setaeditar'),
            target: document.querySelector(".itenseditar"),
            container: document.querySelector('.editar'),
            img: document.querySelector('.setaeditar-img'),
            button2: document.querySelector('.logo2'),
        },
        {
            borderbutton: document.querySelector('.setarelatorios'),
            button: document.querySelector('.setarelatorios'),
            target: document.querySelector(".itensrelatorios"),
            container: document.querySelector('.relatorios'),
            img: document.querySelector('.setarelatorios-img'),
            button2: document.querySelector('.logo2'),
        },
        {
            borderbutton: document.querySelector('.setaopcoes'),
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
            button2: document.querySelector('.logo2'),
            target1: document.querySelector('.lateral'),
            image: document.querySelector('.logo2'),
        }
    ];

    function toggleSection(section) {
        const computedStyle = window.getComputedStyle(section.target);

        if (computedStyle.display === "none" || computedStyle.display === "") {
            section.target.style.display = "flex";
            section.container.style.borderRadius = "5px 0 0 0";
            section.borderbutton.style.borderRadius = "0 5px 0 0";
            section.img.style.transform = "rotate(90deg)";
        } else if (computedStyle.display === "flex") {
            section.target.style.display = "none";
            section.container.style.borderRadius = "5px 0 0 5px";
            section.borderbutton.style.borderRadius = "0 5px 5px 0";
            section.img.style.transform = "rotate(0deg)";
        }
    }

    function toggleSideBar(section) {
        const computedStyle = window.getComputedStyle(section.target1);

        if (computedStyle.display === "none" || computedStyle.display === "") {
            section.target1.style.display = "block";
            section.image.style.display = "none";
        } else if (computedStyle.display === "block") {
            section.target1.style.display = "none";
            section.image.style.display = "block";
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
});
