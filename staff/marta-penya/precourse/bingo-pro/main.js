let numerosCarton = 15
let randomNumber = 0;
let numerosBombo = [];
let turnos = 0;
let numerosFinales = [];
let stopprimera = 0;
let stopsegunda = 0;
let stoptercera = 0;
let carton = Array(15).fill().map(function(){ return ({number: randomNumber, matched: false}) });
let puntos = 500;
let usuario = "";
let rankingJugadores = [];

//Cuando se ejecute, pedirá el nombre del jugador y deberá guardarse.


function nombreUsuario(){
    usuario = prompt('¡Bienvenido/a al BINGO Skylab! ¿Cómo te llamas?')
    let usuarioValido = false;

    while(!usuarioValido){
      if(!usuario){
        alert('Debes introducir el nombre de usuario')
        usuario = prompt('¿Cómo te llamas?')
      } else {
        usuarioValido = true;
      }
    }

    alert(`Hola ${usuario}!`)
    alert('Empiezas la partida con 500 puntos, por cada turno pierdes 5 puntos así que intenta ganar en el menor número de turnos posibles')
  };

 
  
//funcion para generar un carton, con 15 numeros random y que no se repitan

function nuevoCarton(){
  contador = 0;
  
  for (let j= 0; j < numerosCarton; j++) {
    contador = 0;
while(contador < numerosCarton){
  let numeroAleatorio = Math.floor(Math.random() * 99) + 1;
  let existe = false;
  for(let i= 0; i < numerosCarton; i++){
    if(carton[i].number === numeroAleatorio){
      existe = true;
      break;
    }
  }
  if(!existe){
    contador++;
    carton[j].number = numeroAleatorio;
  }
}
}
};

nuevoCarton(carton)

//mostrar el carton generado

function mostrarCarton(){
numerosFinales = []
for(let i= 0; i < carton.length; i++){
    numerosFinales.push(carton[i].number)
}

    primeraLinea = numerosFinales.slice(0,5)
    segundaLinea = numerosFinales.slice(5,10)
    terceraLinea = numerosFinales.slice(10,15)
  
  console.log("Tu cartón es:" + "\n" + primeraLinea + "," + "\n" + segundaLinea + "," + "\n" + terceraLinea)  
  };

  

//Cuando se muestre la carta, se preguntará al usuario si realmente quiere ese cartón o
// generar otro, si realmente quiere ese cartón, deberá responder "Yes" para proceder

function cartonSiNo(){
    mostrarCarton()
    cartonSi = confirm("¿Quieres este carton?"  + "\n" + primeraLinea + "," + "\n" + segundaLinea + "," + "\n" + terceraLinea)
    if(cartonSi){
    nuevoTurno()
    }else{
    numerosFinales = []
    nuevoCarton()
    cartonSiNo()
    }
};


// para pasar al siguiente turno el usuario deberá confirmar mediante confirm() visualizandose otro número, si coincide 
//con alguno de los existentes en el cartón, cambiará por una "X" o un 0


function nuevoTurno(){
    turno = confirm('¿Deseas un número?') 
    turno ? numRandom() : alert('¡Hasta otra!')
  };


//tachar numero que coincide con el carton con una 'X'

function coincide(numeroRandom){
    for(let i in carton){
      if(carton[i].number === numeroRandom){
        carton[i].number = 'X';
        carton[i].matched = true;
  
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
    turnos++
    puntos-=5
  
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

    primeraLinea = numerosFinales.slice(0,5)
    segundaLinea = numerosFinales.slice(5,10)
    terceraLinea = numerosFinales.slice(10,15)
   
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
  
  esBingo = numerosFinales.every(element => {
    return element === 'X'
   })

   if(esBingo){
    alert('¡Bingooo! Yayyyy :D');
    rankingGlobal()
    } else {
    nuevoTurno() 
    }
};

//funcion para guardar el usuario con sus puntos y turnos así como mostrar el ranking global

function rankingGlobal(){
  console.log(`¡Enhorabuena ${usuario}! Has completado el bingo en ${turnos} jugadas y has conseguido ${puntos} puntos`);
  rankingJugadores.push({usuario: usuario, turnos: turnos, puntos: puntos});
  rankingJugadores.sort((a,b) => b.puntos - a.puntos);

  alert('A continuación mostraremos el Ranking ordenado por puntuación');
  console.log('Ranking global:');

  for(let i= 0; i < rankingJugadores.length; i++){
    console.log(`Jugador/a ${rankingJugadores[i].usuario} con ${rankingJugadores[i].puntos} puntos conseguido en ${rankingJugadores[i].turnos} turnos`)
  }

  nuevoJuego();
};


//funcion para preguntar al jugador si desea jugar otra partida al haber completado y cantado bingo

function nuevoJuego(){
nuevaPartida = confirm('¿Deseas jugar una nueva partida del BINGO Skylab?')

if(nuevaPartida === true){
carton = Array(15).fill().map(function(){ return ({number: randomNumber, matched: false}) }); 
cantidadNumeros = 15;
usuario = "";  
numerosBombo = [];
numerosFinales = [];
turnos = 0;
puntos = 500;
stopprimera = 0;
stopsegunda = 0;
stoptercera = 0;

nombreUsuario();
nuevoCarton();
cartonSiNo();
} else {
  alert('¡Bye Bye! ¡Esperamos verte pronto!')
}
};


//funcion global para iniciar el juego

function bingo(){

nombreUsuario();
nuevoCarton();
cartonSiNo();

};

bingo();