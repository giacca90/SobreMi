let resultado:HTMLDivElement = document.getElementById("resultado") as HTMLDivElement
let listaArchivos:pdfObj[];
interface pdfObj {
    name:string,
    download_url:string,
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('modo-oscuro');
  }

obtenerCertificados().then(() => {
    listaArchivos.forEach((val:pdfObj) => {
        console.log(val.name);
    });
    busca('');
})

async function obtenerCertificados() {
    const response = await fetch("https://api.github.com/repos/giacca90/SobreMi/contents/certificados");
    listaArchivos = await response.json();
}

function busca(valor:string) {
    resultado.innerHTML = "";
    let result:pdfObj[] | null = null;
    if(valor.length === 0) {
        result = listaArchivos
    }else{
        result = listaArchivos.filter((val:pdfObj) => val.name.toLowerCase().includes(valor.toLowerCase()))
    }
    if(result) {
        result.forEach((val:pdfObj) => {
            const embedElement = document.createElement('img');
            embedElement.src = val.download_url;
            embedElement.width = 390;
            embedElement.height = 230;
            embedElement.style.margin = '2px'
            embedElement.addEventListener('click', () => {
                window.open(val.download_url, '_blank');
            })
            resultado.appendChild(embedElement);
        })
    }
}