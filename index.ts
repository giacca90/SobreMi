let resultado:HTMLDivElement = document.getElementById("resultado") as HTMLDivElement
let listaArchivos:string[];
obtenerCertificados().then(() => {
    listaArchivos.forEach((val:string) => console.log(val));
})

async function obtenerCertificados() {
    const response = await fetch("./certificados/");
    listaArchivos = await response.json();
}

function buscar(valor:string) {
    
}