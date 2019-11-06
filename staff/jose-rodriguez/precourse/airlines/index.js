// I) PEDIR NOMBRE DE USUARIO Y DAR LA BIENVENIDA
// II) MOSTRAR TODOS LOS VUELOS DE FORMA AMIGABLE CON ORIGEN, DESTINO, COSTE Y ESCALAS
// III) MOSTRAR COSTE MEDIO DE LOS VUELOS
// IV) MOSTRAR CUANTOS VUELOS HAY CON ESCALAS
// V) SABIENDO QUE LOS 5 ULTIMOS VUELOS SON LOS ULTIMOS DEL DÍA, MOSTRAR SUS DESTINOS

var flights = [
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
    
var userName =  prompt("Introduce tu nombre de usuario", "Anonimo")

console.log(`Bienvenido a Skylab Airlines, ${userName}!`);
console.log ("Aqui tienes la información de los vuelos disponibles para hoy:")

var totalCost = 0
var scalesTrue = 0
for (var i=0; i<flights.length; i++) {
    totalCost += flights[i].cost
    if (flights[i].scale === true) {
        scalesTrue ++
        console.log (`El vuelo con origen ${flights[i].from} y destino ${flights[i].to} tiene un coste de: ${flights[i].cost} € y tiene escalas`)
    } else {
        console.log (`El vuelo con origen ${flights[i].from} y destino ${flights[i].to} tiene un coste de: ${flights[i].cost} € y no tiene ninguna escala.`)
    }
}
    var avg = (totalCost / flights.length).toFixed(2);

console.log (`El coste medio de los vuelos es de ${avg} €`)
console.log (`Hay ${scalesTrue} vuelos con escala.`)
console.log("Los destinos de los úlitmos 5 vuelos son: ")

for (i = flights.length-5; i<flights.length; i++) {
    console.log(flights[i].to)
}


