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
            embedElement.style.margin = '1px';
            embedElement.addEventListener('click', () => {
                window.open(val.download_url, '_blank');
            });
            resultado.appendChild(embedElement);
        });
    }
}
