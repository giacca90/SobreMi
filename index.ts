let resultado:HTMLDivElement = document.getElementById("resultado") as HTMLDivElement
let listaArchivos:pdfObj[];
interface pdfObj {
    name:string,
    download_url:string,
    self:string
}
obtenerCertificados().then(() => {
    listaArchivos.forEach((val:pdfObj) => {
        console.log(val.name);
        if(val.name.endsWith('.jpg')) {
            const embedElement = document.createElement('img');
            embedElement.src = val.download_url;
            embedElement.width = 300;
            embedElement.height = 180;
            resultado.appendChild(embedElement);    
        }
    });
})

async function obtenerCertificados() {
    const response = await fetch("https://api.github.com/repos/giacca90/SobreMi/contents/certificados");
    listaArchivos = await response.json();
}

function buscar(valor:string) {
    
}