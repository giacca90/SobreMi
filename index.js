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
        if (val.name.endsWith('.jpg')) {
            const embedElement = document.createElement('img');
            embedElement.src = val.download_url;
            embedElement.width = 300;
            embedElement.height = 180;
            resultado.appendChild(embedElement);
        }
    });
});
function obtenerCertificados() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://api.github.com/repos/giacca90/SobreMi/contents/certificados");
        listaArchivos = yield response.json();
    });
}
function buscar(valor) {
}
