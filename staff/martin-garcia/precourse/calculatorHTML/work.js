//Variables para recoger numeros, mostrar texto en el display y almacenar el operador
var textoDisplay = "";
var numero1 = "";
var numero2 = "";
var operadorSTR = "";
var operadores = "X+-/";

function añadirNumero(e) {
    actualizarDisplay(e.target.innerText);
}

function actualizarDisplay(textoNuevo) {
    //Compruebo que si ya hay una "," no se inserten más
    if (textoNuevo.includes("Infinity") || textoNuevo.includes("NaN")) {
        console.log("Entra");
        textoDisplay = "";
        numero1 = "";
        numero2 = "";
        var display = document.getElementsByClassName("display");
        display[0].innerHTML = textoNuevo;
        return;
    }
    if (textoDisplay.includes(",") && textoNuevo === ",") {
        return;
    } else if (operadores.includes(textoDisplay[0])) {
        textoDisplay = "";
    }

    textoDisplay += textoNuevo;
    var display = document.getElementsByClassName("display");
    display[0].innerHTML = textoDisplay;

    // si el primer elemnto clicado es un "," se inserta el 0 delante
    if (textoDisplay[0] === ",") {
        textoDisplay = "0,";
        actualizarDisplay("");
    }
}


//Al clicar en AC, reinicia la calculadora
function reload() {
    textoDisplay = "";
    numero1 = "";
    numero2 = "";
    var display = document.getElementsByClassName("display");
    display[0].innerHTML = "0";
}


//Esta función es llamada por el evento en la tecla C
function borrarNumero() {
    if (operadorSTR === "") {
        numero1 = "";
    } else {
        numero2 = "";
    }
    textoDisplay = "";
    document.getElementsByClassName("display")[0].innerHTML = "0";
}


//si el primer número es error, no se permite clicar en operandores
function operador(e) {
    var display = document.getElementsByClassName("display");
    if (display[0].innerHTML == "NaN" || display[0].innerHTML == "Infinity" || display[0].innerHTML == "-Infinity") {
        return
    } else if (numero1 != "") {
        console.log("2");
        textoDisplay = "";
        operadorSTR = e.target.innerText;
        var display = document.getElementsByClassName("display");
        display[0].innerHTML = operadorSTR;
    } else {
        console.log("3");
        operadorSTR = e.target.innerText;
        numero1 = textoDisplay;
        textoDisplay = e.target.innerText;
        actualizarDisplay("");
        var display = document.getElementsByClassName("display");
        display[0].innerHTML = operadorSTR;
    }
}


//Al clicar en "=" almacena los coge los 2 valores, dependiendo
//del valor del operador hace la cuenta necesaria, guarda el valor
//como número1 y permite seguir concatenando operaciones.
function resultado() {
    var resultado;
    numero2 = parseFloat(textoDisplay.replace(",", "."));
    numero1 = parseFloat(numero1.toString().replace(",", "."));
    if (numero1.toString() == "NaN") {
        numero1 = 0;
    }

    //Dependiendo del operador se hace una cuenta diferente
    switch (operadorSTR) {
        case "+":
            resultado = numero1 + numero2;
            break;
        case "-":
            resultado = numero1 - numero2;
            break;
        case "X":
            resultado = numero1 * numero2;
            break;
        case "/":
            resultado = numero1 / numero2;
            break;
    }

    //Si el resultado es un error, el numero1 toma el valor 0,
    //Si no toma el valor del resultado, para poder enlazar cuentas
    //Finalmente se actualiza el display.
    if (resultado == "Infinity" || resultado == "NaN") {
        numero1 = 0;
        numero2 = "";
        textoDisplay = "";
        operadorSTR = "";
        actualizarDisplay(resultado.toString().replace(".", ","));
    } else {
        numero1 = resultado;
        textoDisplay = "";
        operadorSTR = "";
        actualizarDisplay(resultado.toString().replace(".", ","));
    }

}