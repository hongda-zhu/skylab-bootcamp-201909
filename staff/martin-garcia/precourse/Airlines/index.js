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

/*Esta es la función que se encarga de todo el trabajo, se podrían haber hecho funciones más
simples, pero al ser un código sencillo no lo contemplé
*/
function muestraVuelos() {
    const nombre = prompt("Como se llama?");
    console.log("Buenos días " + nombre + " los vuelos disponibles para hoy son los siguientes: ");
    let costeMedio = 0;
    let nVuelosConEscala = 0;

    flights.forEach(function(element) { //Imprimo todos los vuelos y aprovecho para calcular media y n vuelos con escala
        var escala;
        element.scale ? escala = "tiene escala" : escala = "no tiene escala";
        costeMedio += element.cost;

        if (element.scale) nVuelosConEscala++;

        console.log("El vuelo con origen " + element.from + ", y destino " + element.to +
            ", tiene un precio de " + element.cost + "€ " + escala);
    });

    console.log("\nEl precio medio de los vuelos es de " + Math.round((costeMedio / flights.length)) + "€"); //Coste medio
    console.log("\nEstos son los " + nVuelosConEscala + " vuelos que efectuarán escalas:");

    flights.forEach(function(element) { //Vuelos con escalas
        if (element.scale) console.log(element.from + " - " + element.to + " precio:" + element.cost + "€");
    });

    console.log("\nLos últimos vuelos del día son: "); //Últimos 5 vuelos del día
    ultimosVuelos = flights.slice(-5);

    ultimosVuelos.forEach(function(element) {
        console.log(element.from + " - " + element.to + " precio:" + element.cost + "€");
    });

}

muestraVuelos(); //llamada a la función