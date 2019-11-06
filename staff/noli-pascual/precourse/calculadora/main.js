function calculadora() {

  //Numeros
  let numbers = document.querySelectorAll('.number');
  
  //otros botones
  let reset = document.getElementById('reset');
  let deshacer = document.getElementById('undo');
  let coma = document.getElementById('separador');
  
  //resultados en pantalla
  let memoria = document.getElementById('memoria');
  let current = document.getElementById('current');
  
  //operadores
  
  let suma = document.getElementById('suma');
  let resta = document.getElementById('resta');
  let division = document.getElementById('division');
  let multiplicacion = document.getElementById('mult');
  
  let equal = document.getElementById('equal');
  
  //variables globales
  let numA;
  let numB;
  let operacion;
  let calculos = 0;
  let isFinished = false;
   
  //ACCIONES:
  
    //acciones de los números
  
   numbers.forEach(num => {
      num.addEventListener('click', function() {
        if(calculos > 0) {
          /* alert('ya se ha empezado'); */
          clear();
          calculos = 0;
          current.textContent += num.textContent;  
        }
        else {
          /* alert('aun no se ha empezado'); */
          current.textContent += num.textContent;  
        }
      })
    })
  
    coma.addEventListener('click', function() {
      if((current.textContent).indexOf('.') === -1) {
        current.textContent += coma.textContent;
      }
      
    })
  
    //acciones de los operadores
  
    function isNum(num) {
      return num !== undefined;
    }
  
  suma.addEventListener('click', function() {
    numA = current.textContent;
    operacion = '+'
    memoria.textContent = (numA + operacion);
    clear();
    
  })
  
  resta.addEventListener('click', function() {
  
    numA = current.textContent;
    operacion = '-'
    memoria.textContent = (numA + operacion);
    clear();
  })
  
  division.addEventListener('click', function() {
  
    numA = current.textContent;
    operacion = '/'
    memoria.textContent = (numA + operacion);
    clear();
  
  })
  
  multiplicacion.addEventListener('click', function() {
  
    numA = current.textContent;
    operacion = 'x'
    memoria.textContent = (numA + operacion);
    clear();
  })
  
  equal.addEventListener('click', igualar);
  reset.addEventListener('click', resetAC);
  deshacer.addEventListener('click', back);
  
  
  function computar() {
  
    let resultado = 0;
      switch(operacion) {
        
        case '+': resultado = round(parseFloat(numA) + parseFloat(numB));  
        break;
        case '-': resultado = round(parseFloat(numA) - parseFloat(numB));
        break;
        case 'x': resultado = round(parseFloat(numA) * parseFloat(numB));
        break;
        case '/': resultado = round(parseFloat(numA) / parseFloat(numB));
      }
    clear();
    current.textContent = resultado;
    isFinished = true;
    memoria.textContent = memoria.textContent + resultado;
  }
  
  function igualar() {
    if(operacion === undefined || operacion === '') {
      
      if(numA === undefined) {
        current.textContent;
      }
      else {
        current.textContent += numA;
      }
    }
    else {
  
      if(memoria.textContent.indexOf('=') !== -1) {
        current.textContent;
      }
      else {
        
        numB = current.textContent;
        memoria.textContent += numB += ' = ';
        computar();
      } 
    }
  
  isFinished = true;
  calculos ++;
  }
  
  //redondear a 2 decimales si es preciso:
  
  function round(num, decimales = 2) {
    var signo = (num >= 0 ? 1 : -1);
    num = num * signo;
    if (decimales === 0) //con 0 decimales
        return signo * Math.round(num);
    // round(x * 10 ^ decimales)
    num = num.toString().split('e');
    num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
    // x * 10 ^ (-decimales)
    num = num.toString().split('e');
    return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
  }
  
  //función para limpiar la pantalla
  function clear() {
    current.textContent = '';
  }
  
  //función para resetear la calculadora, vuelve a valores iniciales
  
  function resetAC() {
    current.textContent = '';
    numA = undefined;
    numB = undefined;
    operacion = '';
    memoria.textContent = '';
    calculos = 0;
  }
  
  //función para deshacer el último número añadido
  
  function back() {
    if(isNum(numA) && isNum(numB)) {
      current.textContent = current.textContent;
      
    }
    else  {
      current.textContent = current.textContent.slice(0,-1);
    }
     
  }
  
  }//Fin calculadora
  
  calculadora();