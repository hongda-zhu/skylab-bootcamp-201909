let cartonBingo = [];   //variable para rellenar el cartón de bingo
let cantidadNumeros = 15;  //números que vamos a introducir en el cartón 
let numerosBombo = [];
let rondas = 0;
let stopprimera = 0;
let stopsegunda = 0;
let stoptercera = 0;


//Cuando se ejecute, pedirá el nombre del jugador y deberá guardarse.

function nombreUsuario(){
  nombreU = prompt('¡Bienvenido/a al BINGO Skylab! ¿Cómo te llamas?')
  nombreU ? alert(`Hola ${nombreU}!`) : alert('¡Hola Bingo player!');
};



//en el primer turno se mostrará un cartón con 15 números random (excluyendo el 0 siempre)

function nuevoCarton(){

  while(cartonBingo.length < cantidadNumeros){
  let numeroAleatorio = Math.floor(Math.random() * 99) + 1;
  let existe = false;
  for(let i=0; i < cartonBingo.length; i++){
	if(cartonBingo[i] === numeroAleatorio){
      existe = true;
      break;
    }
  }
  if(!existe){
   cartonBingo[cartonBingo.length] = numeroAleatorio;
  }
}
}



//mostrar el carton generado
function mostrarCarton(){
  primeraLinea = cartonBingo.slice(0,5)
  segundaLinea = cartonBingo.slice(5,10)
  terceraLinea = cartonBingo.slice(10,15)

console.log("Tu cartón es:" + "\n" + primeraLinea + "," + "\n" + segundaLinea + "," + "\n" + terceraLinea)  
}



// para pasar al siguiente turno el usuario deberá confirmar mediante confirm() visualizandose otro número, si coincide 
//con alguno de los existentes en el cartón, cambiará por una "X" o un 0


function nuevoTurno(){
  turno = confirm('¿Deseas un número?') 
  turno ? numRandom() : alert('¡Hasta otra!')
}



//tachar numero que coincide con el carton 

function coincide(numeroRandom){
  for(let i in cartonBingo){
    if(cartonBingo[i] === numeroRandom){
      cartonBingo[i] = 'X';

      alert('Yayyyyyyy tachando el número!!!')
      console.log(`Tachamos el número ${numeroRandom}`)
    }
  }
  console.log(mostrarCarton())
 }
   
 
//funcion para generar numeros random y que no se repitan

function numRandom(){
  let esRepetido = true;
  let numeroRandom = 2;
  rondas++

  while(esRepetido){
  numeroRandom =  Math.floor(Math.random() * 99) + 1;
  esRepetido = numerosBombo.some(function(element){
      return element === numeroRandom
      })
    }
    
    alert(`Número: ${numeroRandom}`)
    console.log(`Numero generado: ${numeroRandom}`)
  numerosBombo.push(numeroRandom)
  
  
    coincide(numeroRandom)
    lineaCompleta()
    bingoConseguido()
    
  };

//cuando todos los números de una misma línea sean "X", mostrará un mensaje "LÍNEA!"


function lineaCompleta(){
  primeraLinea = cartonBingo.slice(0,5)
  segundaLinea = cartonBingo.slice(5,10)
  terceraLinea = cartonBingo.slice(10,15)
 
  //aviso primera linea del carton
  esXprimera = primeraLinea.every(element => {
    return element === 'X'
   })

   if(esXprimera && stopprimera === 0){
    alert('Línea número uno conseguida!');
    stopprimera = 1
   }

//aviso segunda linea del carton
   esXsegunda = segundaLinea.every(element => {
    return element === 'X'
   })

   if(esXsegunda && stopsegunda === 0){
    alert('Línea número dos conseguida!');
    stopsegunda = 1
   }
   //aviso tercera linea del carton

   esXtercera = terceraLinea.every(element => {
    return element === 'X'
   })

   if(esXtercera && stoptercera === 0){
    alert('Línea número tres conseguida!');
    stoptercera = 1
   }
  };


//funcion para comprobar si se ha realizado Bingo

function bingoConseguido(){
  
  esBingo = cartonBingo.every(element => {
    return element === 'X'
   })

   if(esBingo){
    alert('¡Bingooo! Yayyyy :D');
    console.log(`¡Enhorabuena ${nombreU}! Has completado el bingo en ${rondas} jugadas`);
    nuevoJuego()
    } else {
    nuevoTurno() 
    }
};

//funcion para preguntar al jugador si desea jugar otra partida al haber completado y cantado bingo

function nuevoJuego(){
nuevaPartida = confirm('¿Deseas jugar una nueva partida del BINGO Skylab?')

if(nuevaPartida === true){
cartonBingo = []; 
cantidadNumeros = 15;  
numerosBombo = [];
rondas = 0;
stopprimera = 0;
stopsegunda = 0;
stoptercera = 0;

nuevoCarton();
mostrarCarton();
nuevoTurno();
} else {
  alert('¡Bye Bye! ¡Esperamos verte pronto!')
}
};


//funcion global para iniciar el juego

function bingo(){

nombreUsuario();
nuevoCarton();
mostrarCarton();
nuevoTurno();

};

bingo()