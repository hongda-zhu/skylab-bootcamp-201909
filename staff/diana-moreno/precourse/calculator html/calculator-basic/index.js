const numberKeys = ["keyAC", "keyBack", "keyDiv", "key7", "key8", "key9", "keyMult", "key4", "key5", "key6", "keySubt", "key1", "key2", "key3", "keyAdd", "key0", "keyDot"]

const keys = [];
numberKeys.forEach(key => keys.push(document.getElementById(key)))

const message = document.getElementById("message")
const display = document.getElementById("display")
const keyAC = keys[numberKeys.indexOf("keyAC")]
const keyBack = keys[numberKeys.indexOf("keyBack")]
const keyEqual = document.getElementById("keyEqual")
const keyDot = keys[numberKeys.indexOf("keyDot")]

//seleccionar cada operación a realizar
function currentOperation() {
  let mathOperation = display.innerHTML
  console.log(mathOperation)
  return mathOperation
}
//calcular las operaciones matemáticas
function calculate(str) {
  let finalResult = eval(str); // EVAL, cuidado con string malicioso!!!
  display.innerHTML = decimals(finalResult); //si tiene decimales, max 10
  message.innerHTML = "Your result"
}
//muestra la operación matemática por pantalla
function showNumbers() {
  display.innerHTML += event.target.innerHTML
}

//avisa de que la operación está mal formulada para que se corrija (si un número tiene 2 comas, o si la operación consta de dos signos seguidos)
function malformedExpression() {
  let array = display.innerHTML.split("")
  isCorrectOperation(array)
  isACorrectNum(array)
}

//función que analiza si la operación está formulada correctamente o tiene signos matemáticos repetidos
function isCorrectOperation(array) {
  let specials = ["+", "-", "*", "/"]
  for(let i in array) {
    if(specials.includes(array[i]) && specials.includes(array[i-1]) || array[0] === "/" || array[0] === "*") {
      message.innerHTML = "Malformed expression"
    }
  }
}
//función que indica un mensaje de error si alguno de los números es incorrecto
function isACorrectNum(array) {
  let cleanArr = (array.join("").split("+").join(",").split("-").join(",").split("*").join(",").split("/").join(",").split("=").join(",")).split(",")
  cleanArr.forEach(elem => {
    if(isNaN(Number(elem)))
      message.innerHTML = "Malformed expression"
  })
}

//si tiene decimales, muestra max 10, sino no muestra ninguno
function decimals(num) {
  let numSplit = num.toString().split("")
  if(numSplit.includes(".")) {
    let index = numSplit.indexOf(".")
    let onlyDecimals = numSplit.slice(index+1, numSplit.length).join("")
    let maxDecimals = Math.min(onlyDecimals.length, 10)
    return num.toFixed(maxDecimals)
  } else {
    return num
  }
}

//resetea la calculadora para empezar una nueva operación
function reset() {
  keyAC.onclick = function() {
    display.innerHTML = "";
    message.innerHTML = "CALCULATOR";
    display.style.fontSize = "2.5rem";
  }
}

//borra el último número
function back() {
  keyBack.onclick = function() {
    let splitLast = display.innerHTML.slice(0, -1)
    display.innerHTML = splitLast
    message.innerHTML = "CALCULATOR";
  }
}

function runCalculator(key) {
  message.innerHTML = "Typing..." //mensaje que se muestra mientras opera
  showNumbers() //muestra por pantalla la operación a realizar
  malformedExpression() //muestra mensaje de error si es incorrecto
  keyEqual.onclick = function() {
    if(display.innerHTML.length < "15") {
      display.style.fontSize = "2.5rem";
    }
    calculate(currentOperation())
  }
}

//función principal que genera operaciones y las soluciona, mostrándolas por pantalla.
function eventAssigment(key) {
  reset() //calculadora a 0
  back() //elimina el último carácter
  key.onclick = function(event) { //cada vez que se clique una tecla
    if(display.innerHTML.length < "15") {
      runCalculator(key)
    } else if(display.innerHTML.length < "25") { //si los num no caben, el tamaño de la letra se hace más pequeño para que quepan
      display.style.fontSize = "1.5rem";
        runCalculator(key)
    }
  }
}

keys.forEach(eventAssigment) //por cada una de las teclas

