var name=prompt("Hola! ¿Como te llamas?", "Oscar eRRe");
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

var averageCost=0;
var lastFive=[];

console.log("Hola "+name+".\nBienvenido a Skylab Airlines.\nÉstos son los vuelos planificados para hoy: \n");

for (var i=0; i<flights.length; i++) {
    if (flights[i].scale){ console.log("\tEl vuelo con origen "+flights[i].from+" y con destino "
                                        +flights[i].to+" tiene un coste de "+flights[i].cost+"€ CON escalas.");
    } else console.log ("\tEl vuelo con origen "+flights[i].from+" y con destino "
                        +flights[i].to+" tiene un coste de "+flights[i].cost+"€ SIN escalas.");
    averageCost+=flights[i].cost;
}
averageCost=Math.floor(averageCost/flights.length);
console.log("\n\nEl coste medio de los vuelos de hoy es de "+averageCost+"€");

lastFive=flights.slice(-5);
console.log("\n\nLos 5 últimos vuelos programados para hoy tienen como destino: ");

for (var j=0;j<lastFive.length;j++) {
    console.log("\t -> "+lastFive[j].to);
}