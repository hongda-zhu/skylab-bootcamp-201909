const flights = [
{ id: 0, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
{ id: 1, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
{ id: 2, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
{ id: 3, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
{ id: 4, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
{ id: 5, to: 'London', from: 'Madrid', cost: 200, scale: false },
{ id: 6, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
{ id: 7, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
{ id: 8, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
{ id: 9, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
{ id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];

//el programa pregunta el nombre al usuario y le saluda. Si el usuario no introduce nombre, por defecto aparecerá "anonimo".
function greeting() {
  let name = prompt("Bienvenido a Skylab Airlines, cual es su nombre?") || "anonimo";
  alert("Hola " + name + " !\n\nA continuacion se mostraran los vuelos disponibles para hoy.");
};

//Información global de todos los vuelos:
function allFlights(arr) {
  console.log("\nVuelos disponibles para hoy:")
  for(let i in arr) {
    let scale = arr[i].scale ? `no realiza ninguna escala` : `realiza escala`
    console.log(`El vuelo con origen: ${arr[i].from} y destino: ${arr[i].to}, tiene un coste de ${arr[i].cost} euros y ${scale}`)
  }
};

//Coste medio de los vuelos:
function avgCost(arr) {
  let add = 0;
  for(let i in arr) {
    add += arr[i].cost
  }
  let avg = add / arr.length;
  let avgDecimals = Number.parseFloat(avg.toFixed(2));
  console.log("\nEl precio medio de los vuelos de hoy es de: " + avgDecimals + " euros")
};

//Vuelos que hacen escala:
function scale(arr) {
  console.log("\nLos vuelos que realizan escala son:")
  for(let i in arr) {
    if(arr[i].scale) {
      console.log(`Origen: ${arr[i].from}, destino: ${arr[i].to}, con un coste de ${arr[i].cost} euros`)
    }
  }
};

//Últimos 5 destinos añadidos:
function lastDest(arr) {
  console.log("\nUltimos destinos anadidos: ");
  let lastFiveArr = arr.slice(arr.length - 5, arr.length)
  for(let i in lastFiveArr) {
    console.log(lastFiveArr[i].to);
  }
};

//Función principal que ejecuta todas las anteriores en orden:
function infoAirlines(arr) {
  greeting()
  allFlights(arr);
  avgCost(arr);
  scale(arr);
  lastDest(arr);
};
infoAirlines(flights)
