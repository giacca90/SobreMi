let resultado:HTMLDivElement = document.getElementById("resultado") as HTMLDivElement
let listaArchivos:pdfObj[];
let cambiaEstilo:HTMLButtonElement = document.getElementById('estilo') as HTMLButtonElement;
let car:boolean = true;

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
        if(valor.toLowerCase() === ('java'))
            valor = 'java ';
        result = listaArchivos.filter((val:pdfObj) => val.name.toLowerCase().includes(valor.toLowerCase()))
    }
    if(result && result.length >0) {
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
    }else if(result.length === 0) {
        const element:HTMLElement = document.createElement('p');
        element.innerHTML = 'No se ha encontrado la habilidad '+valor+' (de momento...)';
        resultado.appendChild(element);
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
        item.id === id ? item.classList.add('selected') : item.classList.remove('selected');
    });

    (document.getElementById('cuerpo') as HTMLElement).classList.add('hidden');
    setTimeout(() => {
        document.querySelectorAll<HTMLElement>('.cuerpo div').forEach((item:HTMLElement) => {
            item.id === id+'-body' ? item.hidden = false : item.hidden = true;
        });    
        (document.getElementById('cuerpo') as HTMLElement).classList.remove('hidden');
    }, 500);    
}

async function carousel() {
    const cuerpos = document.querySelectorAll<HTMLElement>('.cuerpo div');
    let id:number = 1;
    setInterval(() => {
        if(!car)
         return;
        if(id === cuerpos.length)
            id = 0;
        cambiaCuerpo(cuerpos[id].id.substring(0, cuerpos[id].id.indexOf('-')));
        id++;
    },5000)
}

carousel();

function stop() {
    car = false;
}