let resultado:HTMLDivElement = document.getElementById("resultado") as HTMLDivElement
const importAll = (r: any) => r.keys().map(r);

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
});

function buscar(valor:string) {
    
}