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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var resultado = document.getElementById("resultado");
var listaArchivos;
var cambiaEstilo = document.getElementById('estilo');
var car = true;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('modo-oscuro');
    cambiaEstilo.textContent = 'Modo Claro';
}
/* document.addEventListener('DOMContentLoaded', () => {
    
});
 */
obtenerCertificados().then(function () {
    listaArchivos.forEach(function (val) {
        console.log(val.name);
    });
    busca('');
});
function obtenerCertificados() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.github.com/repos/giacca90/SobreMi/contents/certificados")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    listaArchivos = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function busca(valor) {
    resultado.innerHTML = "";
    var result = null;
    if (valor.length === 0) {
        result = listaArchivos;
    }
    else {
        result = listaArchivos.filter(function (val) { return val.name.toLowerCase().includes(valor.toLowerCase()); });
    }
    if (result) {
        result.forEach(function (val) {
            var embedElement = document.createElement('img');
            embedElement.src = val.download_url;
            embedElement.width = 390;
            embedElement.height = 230;
            embedElement.style.margin = '2px';
            embedElement.addEventListener('click', function () {
                window.open(val.download_url, '_blank');
            });
            embedElement.addEventListener('mouseenter', handleMouseEnter);
            embedElement.addEventListener('mouseleave', handleMouseLeave);
            resultado.appendChild(embedElement);
        });
    }
}
function CambiaEstilo() {
    console.log('Estilo actual: ' + document.body.classList);
    if (document.body.classList.toString() === 'modo-oscuro') {
        document.body.classList.remove('modo-oscuro');
        cambiaEstilo.textContent = 'Modo Oscuro';
    }
    else {
        document.body.classList.add('modo-oscuro');
        cambiaEstilo.textContent = 'Modo Claro';
    }
}
function handleMouseEnter(event) {
    var element = event.target;
    element.style.transition = 'transform 0.5s';
    element.style.transform = 'scale(0.9)';
}
function handleMouseLeave(event) {
    var element = event.target;
    element.style.transition = 'transform 0.5s';
    element.style.transform = 'scale(1)';
}
function cambiaCuerpo(id) {
    console.log('id: ' + id);
    document.querySelectorAll('.cabecera h3').forEach(function (item) {
        if (item.id === id) {
            item.classList.add('selected');
        }
        else {
            item.classList.remove('selected');
        }
    });
    document.getElementById('cuerpo').classList.add('hidden');
    setTimeout(function () {
        document.querySelectorAll('.cuerpo div').forEach(function (item) {
            if (item.id === id + '-body') {
                item.hidden = false;
            }
            else {
                item.hidden = true;
            }
        });
        document.getElementById('cuerpo').classList.remove('hidden');
    }, 500);
}
function carousel() {
    return __awaiter(this, void 0, void 0, function () {
        var cuerpos, id;
        return __generator(this, function (_a) {
            cuerpos = document.querySelectorAll('.cuerpo div');
            id = 1;
            setInterval(function () {
                if (!car)
                    return;
                if (id === cuerpos.length)
                    id = 0;
                cambiaCuerpo(cuerpos[id].id.substring(0, cuerpos[id].id.indexOf('-')));
                id++;
            }, 5000);
            return [2 /*return*/];
        });
    });
}
carousel();
function stop() {
    car = false;
}
