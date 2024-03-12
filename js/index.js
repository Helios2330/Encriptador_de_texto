const llaves = new Set(["a", "e", "i", "o", "u",]);

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function esconderElemento(elemento) {
    document.getElementById(elemento).style.display = "none";
}

function mostrarElemento(elemento) {
    document.getElementById(elemento).style.display = "block";
}

function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (2+element.scrollHeight)+"px";
}

function validate(textoUsuario) {
    let re = 
        /[^a-z(\s)]+/;
    if (re.test(textoUsuario)) {
        alert("Ingresar solo letras minusculas y sin acentos.");
        return "invalido";
    }
    else {
        return "valido";
    }
}

function encriptarTexto() {
    let textoUsuario = document.getElementById('entradaTexto').value;

    if (validate(textoUsuario) == "valido" && textoUsuario.length > 0) {
        for (let i = 0; i < textoUsuario.length; i++) {
            if (llaves.has(textoUsuario.charAt(i))) {
                textoUsuario = (cambiarCaracter(textoUsuario, i))[0];
                i = (cambiarCaracter(textoUsuario, i))[1];
            }
        }
        esconderElemento("sinHistorial");
        mostrarElemento("conHistorial");
        asignarTextoElemento('#textoProcesado', "Texto Encriptado");
        asignarTextoElemento('p', textoUsuario);
    }
}

function desencriptarTexto() {
    let textoUsuario = document.getElementById('entradaTexto').value;

    if (validate(textoUsuario) == "valido" && textoUsuario.length > 0) {
        const objeto = { 'ai': 'a', 'enter':'e', 'imes':'i', 'ober': 'o', 'ufat':'u' }
        for (const x in objeto) {
            textoUsuario = textoUsuario.replace(new RegExp(x, 'g'), objeto[x]);
        }
        esconderElemento("sinHistorial");
        mostrarElemento("conHistorial");
        asignarTextoElemento('#textoProcesado', "Texto Desencriptado");
        asignarTextoElemento('p', textoUsuario);
    }
}

function cambiarCaracter(texto, indice) {
    let reemplazo;
    let nuevoIndice = indice;
    let textoEncriptado = "";

    if (texto.charAt(indice) == "a") {
        reemplazo = "ai";
        nuevoIndice += 1;
    } else if (texto.charAt(indice) == "e") {
        reemplazo = "enter";
        nuevoIndice += 4;
    } else if (texto.charAt(indice) == "i") {
        reemplazo = "imes";
        nuevoIndice += 3;
    } else if (texto.charAt(indice) == "o") {
        reemplazo = "ober";
        nuevoIndice += 3;
    } else if (texto.charAt(indice) == "u") {
        reemplazo = "ufat";
        nuevoIndice += 3;
    }
    textoEncriptado = texto.substring(0,indice) + reemplazo + texto.substring(indice+1);

    return [textoEncriptado, nuevoIndice];
}

function copiarTexto() {
    let textoParaCopiar = document.querySelector('p').innerText;
    navigator.clipboard.writeText(textoParaCopiar).then(function() {
        let botonCopiar = document.getElementById('botonCopiar');
        botonCopiar.innerText = 'Texto Copiado!';

        setTimeout(function() {
            botonCopiar.innerText = 'Copiar';
        }, 1100);
    }, function(err) {
        console.error('Error al copiar al portapapeles: ', err);
    });
}