"use strict";
let resultado = document.getElementById("resultado");
const importAll = (r) => r.keys().map(r);
const context = require.context('../certificados/', false, /\.pdf$/);
const certificados = importAll(context);
certificados.forEach((certificado, index) => {
    const embedElement = document.createElement('embed');
    embedElement.src = certificado;
    embedElement.type = 'application/pdf';
    embedElement.width = '500';
    embedElement.height = '600';
    embedElement.title = `Certificado ${index + 1}`;
    resultado.appendChild(embedElement);
});
function buscar(valor) {
}
