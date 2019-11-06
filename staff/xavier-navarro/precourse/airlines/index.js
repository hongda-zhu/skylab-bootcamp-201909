const flights = [
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

function welcome(){
    let greeting = "Welcome "
    let user
    user = prompt("Introduce your user, please")
    greeting += user
    return greeting
}

function printFlights(flights){
    let escala
    flights.forEach(element => {
        if(element['scale']){
            escala = "realiza una escala."
        }else{
            escala = "no realiza ninguna escala."
        }
        console.log("- El vuelo con origen: "+element['to']+", y destino: "+element['from']+" tiene un coste de "+element['cost']+"€ y "+escala)
    });
}
function priceAverage(){
    let price = 0
    let average
    flights.forEach(element => {
        price += element['cost']
    });
    average = price/flights.length
    average = Math.round(average*100)/100
    return average
}

function scaleFlights(){
    flights.forEach(element => {
        if(element['scale']){
            console.log("- El vuelo con origen: "+element['to']+", y destino: "+element['from'])
        }
    });
}

function lastFlights(numFlights){
    let lastFlights
    lastFlights = flights.slice(flights.length - numFlights)
    printFlights(lastFlights)
}
function SkylabAirlines(){
    console.log(welcome()+", estos són todos los vuelos disponibles:")
    printFlights(flights)
    console.log("El coste medio de los vuelos es de "+priceAverage() )
    console.log("Vuelos con escala:")
    scaleFlights()
    console.log("Los últimos 5 vuelos del día són:")
    console.log(lastFlights(5))
}

SkylabAirlines()