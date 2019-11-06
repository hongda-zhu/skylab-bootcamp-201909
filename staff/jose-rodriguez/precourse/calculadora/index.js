//PROYECTO CALCULADORA
// 2 PARAMETROS
// 3 DECIMALES MÁXIMOS EN CASO DE QUE LOS HAYA
// SI SOLO HAY UN PARÁMETRO, MOSTRAR SU RAIZ CUADRADA
// GUARDAR LOS RESULTADOS EN UNA ARRAY Y MOSTRARLOS AL USUARIO
// OPCION DE REPETIR EL CALCULO CON OTROS PARAMETROS SI SE DESEA

var decimals = function (dec){
    if (dec.toString().includes(".") === true) {
        return Number.parseFloat(dec.toFixed(3));
      }
    }

var operations = {
    "+": function(a,b) { return a + b},
    "-": function(a,b) { return a - b},
    "*": function(a,b) { return a * b},
    "/": function(a,b) { return a / b}
}

function operation(operator, num1, num2){
    return operations[operator](num1, num2)
}

// function sum (num1, num2) {
//     var resultSum = num1 + num2;
//         return decimals(resultSum) || resultSum;
//     }

// function res (num1, num2) {
//     var resultRes = num1 - num2;
//     return decimals(resultRes) || resultRes;
// }

// function mul (num1, num2) {
//     var resultMul = num1 * num2;
//     return decimals(resultMul) || resultMul;
   
// }

// function div (num1, num2) {
//     resultDiv = num1 / num2;
//     return decimals(resultDiv) || resultDiv;
// }

function raiz (num1) {
    raiz = Math.sqrt(num1)
    return decimals(raiz) || raiz;
    };
    


function calc () {
    var num1 = prompt("Introduce el primer numero:")
    var num2 = prompt("Introduce el segundo numero:")
    if (num1 === null || num1 === "") {
        console.log(`La raíz cuadrada de ${num2} es: ${raiz(num2)}`)
    } else if (num2 === null || num2 === "") {
        console.log(`La raíz cuadrada de ${num1} es: ${raiz(num1)}`)
    } else if (isNaN(num1) || isNaN(num2)) {
        alert("Oops! Solo puedes utilizar números!")
        calc()
    } else {
    var resultCalc = [];
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    resultCalc.push(
        operation("+", num1, num2), 
        operation("-", num1, num2),
        operation("*", num1, num2),
        operation("/", num1, num2))
    console.log(`Suma: ${num1} + ${num2} = ${resultCalc[0]}`)
    console.log(`Resta: ${num1} - ${num2} = ${resultCalc[1]}`)
    console.log(`Multiplicacion: ${num1} * ${num2} = ${resultCalc[2]}`)
    console.log(`Divisón: ${num1} / ${num2} = ${resultCalc[3]}`)
    restart()
}
}

function restart () {

    var userQuestion = prompt("¿Quieres continuar?", "Si/No").toUpperCase()
    if (userQuestion === "SI")  {
        calc()
    } else if  (userQuestion === "NO"){
        alert("¡De acuerdo! ¡Hasta la vista!")
    } else {
        alert("CONTESTAME! SI o NO? :)")
        restart()
    }
}
calc ()