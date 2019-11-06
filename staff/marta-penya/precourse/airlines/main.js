let flights = [
    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];

//Se preguntará por el nombre de usuario y dará la bienvenida.

function saludo(){
    let userName = '';
    
    userName = prompt('Bienvenido/a a Skylab Airlines, ¿Cuál es su nombre?')
    
    userName ? alert(`Hola ${userName}!`) : alert('Hello!');
    };

    
saludo();



/*El usuario visualizará todos los vuelos disponibles de una forma  amigable: El vuelo con origen: Barcelona, y destino: Madrid 
tiene un coste de XXXX€ y no realiza ninguna escala.*/

function todosVuelos(arr){
    for(let i= 0; i < arr.length; i++){
        let scale = false 
        if(arr[i].scale){
            scale = 'realiza escala';
          } else {
            scale = 'no realiza escala';
          };
          console.log(`El vuelo con origen: ${arr[i].from} y destino: ${arr[i].to}, tiene un coste de: ${arr[i].cost} y ${scale}`)
        }
    };
    
todosVuelos(flights);


console.log('_________________________________');
//A continuación, el usuario verá el coste medio de los vuelos//

function mediaVuelos(arr){
    for(let i= 0; i < arr.length; i++){
        let suma = 0
        for (let i = 0; i < arr.length; i++){
        suma += arr[i].cost
        };
        let media = suma / arr.length;
        
       console.log(`Le informamos que el coste medio de los vuelos programados para hoy es de ${media.toFixed(2)} €`)    
    }
};
mediaVuelos(flights);

console.log('_________________________________');
//También podrá ver cuántos vuelos efectúan escalas.//


function vuelosEscala(arr){
    console.log(`A continuación se muestran los vuelos que efectúan escala:`)
    for(let i= 0; i < arr.length; i++){
  if(arr[i].scale){
    console.log(`El vuelo con origen: ${arr[i].from} y destino: ${arr[i].to}, tiene un coste de: ${arr[i].cost}`);
  };
};
};
vuelosEscala(flights);
 
console.log('_________________________________');
//Sabiendo que los últimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.

function ultimosVuelos(arr){
    console.log(`Estos son los destinos del día:`)
    for(let i=(arr.length -5); i < arr.length; i++){
        console.log(`${arr[i].to}`)
    };
};

ultimosVuelos(flights);
console.log('_________________________________');

console.log(`Muchas gracias por su visita`);