//CALCULATOR PRO

//Función que redondea los decimales a 3, si los hay.
const decimals = function(result) {
  if(result.toString().split("").includes(".") === true) {
    return Number.parseFloat(result.toFixed(3));
  }
}

//Una función por cada operación matemática:
const add = function() {
  let acc = 0;
  for(let i in arguments) {
    acc += arguments[i];
  }
  return decimals(acc) || acc;
}
const sub = function() {
  let acc = arguments[0];
  for(let i = 1; i < arguments.length; i++) {
    acc -= arguments[i];
  }
  return decimals(acc) || acc;
}
const mul = function() {
  let acc = 1;
  for(let i in arguments) {
    acc *= arguments[i];
  }
  return decimals(acc) || acc;
}
const div = function() {
  let acc = arguments[0];
  for(let i = 1; i < arguments.length; i++) {
    if(arguments[i] === 0) {
      return "You cannot divide between 0"
    }
    acc /= arguments[i];
  }
  return decimals(acc) || acc;
}
const sqrt = function() {
  let acc = Math.sqrt(arguments[0]);
  return decimals(acc) || acc;
}

//array donde se van a guardar los numeros elegidos por el usuario
let userNumbers = [];

//función que deja el array de numeros vacío
function initializeVariables() {
  userNumbers = [];
}

//función que añade números elegidos por el usuario y controla que sean o no un número, permitiendo añadir tantos como el usuario quiera.
function addNumbers() {
  let answer = confirm("Do you want to add a number?")
  if(!answer) {
    console.log("Ok, it's enough to add numbers.")
  } else {
    let num = prompt("Please, insert your number.");
    if(isNaN(num) || num === "") {
      console.log("Please, insert only numbers.");
      addNumbers();
    } else if(num === null) {
      console.log("Ok, we won't add more numbers.")
    }
    else {
      console.log("Your number is " + num);
      userNumbers.push(parseInt(num));
      addNumbers();
    }
  }
}

//función que calcula las operaciones matemáticas según los números pasados por el usuario
function getResults(numbers) {
  console.log("Your numbers are: " + numbers)
  numbers.length === 1
    ? console.log(`You only inserted one number.\n√${numbers} = ${sqrt(numbers)}`)
    : console.log(`Addition = ${add(...numbers)}\nSubtraction = ${sub(...numbers)}\nMultiplication = ${mul(...numbers)}\nDivision = ${div(...numbers)}`)
}

//función que pregunta si quieres volver a jugar
function calculateAgain() {
  confirm('Do you want to play again?') ? calculator() : alert("Ok, bye!")
}

//función principal que ejecuta todas las funciones por orden y devuelve los resultados.
function calculator() {
  initializeVariables()
  addNumbers()
  getResults(userNumbers)
  calculateAgain()
}

calculator()