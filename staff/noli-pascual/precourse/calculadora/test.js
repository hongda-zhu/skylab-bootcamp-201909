//Numeros
let numbers = document.querySelectorAll('.number');

//otros botones
let reset = document.getElementById('reset');
let back = document.getElementById('undo');

//resultados en pantalla
let memoria = document.getElementById('memoria');
let current = document.getElementById('current');

//operadores
let operators = document.querySelectorAll('.operation');

let mas = document.getElementById('suma');
let menos = document.getElementById('resta');
let entre = document.getElementById('division');
let por = document.getElementById('mult');

let equal = document.getElementById('equal');

//variables globales

let previousNumbers = [];
let currentNumbers = [];
let previousNumber;
let currentNumber;

let operando;
let historial = [];
let operandoCount = 0;
 

//previous numbers
function numOne() {

  
  if(previousNumbers.length === 0) {
    
    for(let i = 0; i < numbers.length; i++) {
     
      numbers[i].addEventListener('click', function() {
      previousNumbers.push(parseInt(numbers[i].innerHTML));
      previousNumber = previousNumbers.join('');
      console.log('Prev Number: ' + previousNumber);
      
      current.innerHTML = previousNumber;
      })
      
    }
    
  }
  else {
    
    historial.push(previousNumber);

    operator();
  }
  
  
}
function operator() {

  Array.from(operators).forEach(element => {
    element.addEventListener('click', function(){
      operandoCount++;
      previousNumber = '';
      previousNumbers = [];
      operando = element.innerHTML;
      memoria.append(previousNumber + operando);  
      
      if(operandoCount !== 0) {
        historial.push(previousNumber);
       
      }
           
      numTwo();
    })
  });
}
operator();



function numTwo() {
  
  previousNumber = '';   
  if(currentNumbers.length === 0) {
    
    for(let i = 0; i < numbers.length; i++) {
     
      numbers[i].addEventListener('click', function() {
      currentNumbers.push(parseInt(numbers[i].innerHTML));
      currentNumber = currentNumbers.join('');
      console.log('Current Number: ' + currentNumber);
      
      current.innerHTML = currentNumber;
      })
      
    }
    
  }
  else {
    historial.push(currentNumber);
    console.log('Historial: ' + historial);
  }

} 

//reset.addEventListener('click', clear);

function clear() {
   
    memoria.innerHTML='';
    current.innerHTML = 0;
    previousNumbers = [];
    previousNumber = '';
    currentNumbers = [];
    currentNumber = '';
    numOne();
  
}

/* function suma() {
  return num1 + num2;
}

function resta() {
  return num1 - num2;
}

function division() {
  return num1/num2;
}

function multiplicacion() {
  return num1 * num2;
}
function operador() {

    mas.addEventListener('click',function() {
      operando = '+';
      historial.push(operando);
      
      numTwo();
    })
    menos.onclick = resta();
    por.onclick = multiplicacion();
    entre.onclick = division();
  } */

numOne();





 
 


  
 

