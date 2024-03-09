"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let resultado = document.getElementById("resultado");
let listaArchivos;
let cambiaEstilo = document.getElementById('estilo');
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('modo-oscuro');
    /* document.querySelectorAll('a').forEach((item) => {
        item.classList.add('modo-oscuro');
    }); */
    cambiaEstilo.textContent = 'Modo Claro';
}
obtenerCertificados().then(() => {
    listaArchivos.forEach((val) => {
        console.log(val.name);
    });
    busca('');
});
function obtenerCertificados() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://api.github.com/repos/giacca90/SobreMi/contents/certificados");
        listaArchivos = yield response.json();
    });
}
function busca(valor) {
    resultado.innerHTML = "";
    let result = null;
    if (valor.length === 0) {
        result = listaArchivos;
    }
    else {
        result = listaArchivos.filter((val) => val.name.toLowerCase().includes(valor.toLowerCase()));
    }
    if (result) {
        result.forEach((val) => {
            const embedElement = document.createElement('img');
            embedElement.src = val.download_url;
            embedElement.width = 390;
            embedElement.height = 230;
            embedElement.style.margin = '2px';
            embedElement.addEventListener('click', () => {
                window.open(val.download_url, '_blank');
            });
            embedElement.addEventListener('mouseenter', handleMouseEnter);
            embedElement.addEventListener('mouseleave', handleMouseLeave);
            resultado.appendChild(embedElement);
        });
    }
}
function CambiaEstilo() {
    console.log('Estilo actual: ' + document.body.classList);
    if (document.body.classList.toString() === 'modo-oscuro') {
        document.body.classList.remove('modo-oscuro');
        /* document.querySelectorAll('a').forEach((item) => {
            item.classList.remove('modo-oscuro');
        }) */
        cambiaEstilo.textContent = 'Modo Oscuro';
    }
    else {
        document.body.classList.add('modo-oscuro');
        /* document.querySelectorAll('a').forEach((item) => {
            item.classList.add('modo-oscuro');
        }) */
        cambiaEstilo.textContent = 'Modo Claro';
    }
}
function handleMouseEnter(event) {
    const element = event.target;
    element.style.transition = 'transform 0.5s';
    element.style.transform = 'scale(0.9)';
}
function handleMouseLeave(event) {
    const element = event.target;
    element.style.transition = 'transform 0.5s';
    element.style.transform = 'scale(1)';
}
