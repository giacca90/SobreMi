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
    listaArchivos.forEach((val) => console.log(val));
});
function obtenerCertificados() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("./certificados");
        listaArchivos = yield response.json();
    });
}
/* const importAll = (r: any) => r.keys().map(r);

const context = (require as any).context('../certificados/', false, /\.pdf$/);
const certificados:string[] = importAll(context);
certificados.forEach((certificado: string, index: number) => {
    const embedElement = document.createElement('embed');
    embedElement.src = certificado;
    embedElement.type = 'application/pdf';
    embedElement.width = '500';
    embedElement.height = '600';
    embedElement.title = `Certificado ${index + 1}`;

    resultado.appendChild(embedElement);
}); */
function buscar(valor) {
}
