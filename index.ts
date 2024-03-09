let resultado:HTMLDivElement = document.getElementById("resultado") as HTMLDivElement
let listaArchivos:pdfObj[];
let cambiaEstilo:HTMLButtonElement = document.getElementById('estilo') as HTMLButtonElement;


interface pdfObj {
    name:string,
    download_url:string,
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('modo-oscuro');
    cambiaEstilo.textContent = 'Modo Claro';
  }

/* document.addEventListener('DOMContentLoaded', () => {
    
});
 */
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
            embedElement.style.margin = '2px';
            embedElement.addEventListener('click', () => {
                window.open(val.download_url, '_blank');
            });
            embedElement.addEventListener('mouseenter', handleMouseEnter);
            embedElement.addEventListener('mouseleave', handleMouseLeave);
            resultado.appendChild(embedElement);
        })
    }
}

function CambiaEstilo() {
    console.log('Estilo actual: '+document.body.classList);
    if(document.body.classList.toString() === 'modo-oscuro') {
        document.body.classList.remove('modo-oscuro');
        cambiaEstilo.textContent = 'Modo Oscuro';
    }else{
        document.body.classList.add('modo-oscuro');
        cambiaEstilo.textContent = 'Modo Claro';
    }
}
function handleMouseEnter(event:any) {
    const element = event.target;
    element.style.transition = 'transform 0.5s';
    element.style.transform = 'scale(0.9)';
}

function handleMouseLeave(event:any) {
    const element = event.target;
    element.style.transition = 'transform 0.5s';
    element.style.transform = 'scale(1)';
}

function cambiaCuerpo(id:string) {
    console.log('id: '+id);

    document.querySelectorAll('.cabecera h3').forEach((item) => {
        if(item.id === id) {
            item.classList.add('selected');
        }else{
            item.classList.remove('selected');
        }
    });

    (document.getElementById('cuerpo') as HTMLElement).classList.add('hidden');
    setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.cuerpo div').forEach((item:HTMLElement) => {
            if(item.id === id+'-body') {
                item.hidden = false;
            }else{
                item.hidden = true;
            }
        });    
        (document.getElementById('cuerpo') as HTMLElement).classList.remove('hidden');
    }, 500);    
}