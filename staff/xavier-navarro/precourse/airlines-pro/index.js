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
]

function welcome(){
    let greeting = "Bienvenido "
    let user
    user = prompt("Introduzca su usuario, por favor")
    greeting += user
    return greeting
}
// PRINCIPAL FUNCTIONS
function printFlights(flights){
    let escala
    flights.forEach(element => {
        if(element['scale']){
            escala = "realiza una escala."
        }else{
            escala = "no realiza ninguna escala."
        }
        console.log("- El vuelo "+element['id']+"  con origen: "+element['to']+", y destino: "+element['from']+" tiene un coste de "+element['cost']+"€ y "+escala)
    })
}
function priceAverage(){
    let price = 0
    let average
    flights.forEach(element => {
        price += element['cost']
    })
    average = price/flights.length
    average = Math.round(average*100)/100
    return average
}

function scaleFlights(){
    flights.forEach(element => {
        if(element['scale']){
            console.log("- El vuelo con origen: "+element['to']+", y destino: "+element['from'])
        }
    })
}

function lastFlights(numFlights){
    let lastFlights
    lastFlights = flights.slice(flights.length - numFlights)
    printFlights(lastFlights)
}
// ADMIN FUNCTIONS
function checkData(flightData){
    if(flightData.length<4){
        alert("Faltan datos. Vuelva a intentarlo, gracias.")
        return false
    }         
    let idFlight = parseFloat(flightData[0])
    let toFlight = flightData[1]
    let fromFlight = flightData[2]
    let costFlight = parseFloat(flightData[3])
    let scaleFlight = flightData[4]
    if(isNaN(idFlight)){
        alert("Los datos introducidos no són validos1")
        return false
    }else{
        flights.forEach(flight => {
            if(idFlight === flight['id']){
                alert("ID reptido. No se puede crear este vuelo")
                return false
            }
        })
    }
    if(isNaN(costFlight)){
        alert("Los datos introducidos no són validos1")
        return false
    }   
    switch (scaleFlight) {
        case "true":
            scaleFlight = true
            break
        case "false":
            scaleFlight = false
            break
        default:
            alert("Los datos introducidos no són validos.")
            return false
            break
    }
    let data = {id: idFlight, to: toFlight, from: fromFlight, cost: costFlight, scale: scaleFlight }
    return data
}
function createFlight(flights){
    const maxFlights = 15
    while(flights.length < maxFlights){
        let createFlight = prompt("Para crear un nuevo vuelo debe completar los siguientes datos separados por un coma (id, to, from, cost, scale(true/false))")
        let flightData = createFlight.split(",")
        let data = checkData(flightData)
        if(!data) {
                return false
        }
        flights.push( data )
        console.log("Se acaba de crear el siguiente vuelo:")
        console.log(printFlights([data]))
        let newFlight = prompt("¿Deasea crear otro vuelo? (s/n)")
        if(newFlight == "n"){
            console.log("¡Hasta la próxima!")
            return false
        }
    }
    if(flights.length >= maxFlights){
        alert("Lo sentimos, no se pueden crear más vuelos.")
        return false
    }
}
function searchID(array,id){
    let i
    for (i = 0; i < array.length; i++) {
        if (array[i]['id'] == id) {
            return i
        }
    }
    return false
}
function deleteFlight(){
    let msg
    let id = prompt("Por favor, indique el ID del vuelo que desea eliminar:")
    let position = searchID(flights,id)
    if(position !== false){
        let deleted
        deleted = flights.splice(position, 1);
        msg = "Se ha eliminado el vuelo hacia "+deleted[0]['to']
        return msg
    }else{
        msg = "No se ha encontrado ningun vuelo"
    }
    return msg
}
function askDelete(){
    let answer
    answer = prompt("Desea elimar otro vuelo (s/n)?")
    return answer.toLowerCase()
}
function selectFlightById(flightsByRage){
    let flightPurchase
    do{
        if(flightPurchase === false){
            purchase = prompt("ID erroneo. ¿Que vuelo desea comprar? Indique su ID")
        }else {
            purchase = prompt("¿Que vuelo desea comprar? Indique su ID")
        }
        flightPurchase = searchID(flightsByRage,purchase)
    }while(flightPurchase === "undefined" || flightPurchase === false)

    return flightPurchase
}
// USER FUNCTIONS
function getMaxPrice(price){
    let purchase
    const result = flights.filter(flight => flight.cost >= price);
    printFlights(result)
    purchase = selectFlightById(result)
    
    return result[purchase]
}
function getMinPrice(price){
    let purchase
    const result = flights.filter(flight => flight.cost <= price);
    printFlights(result)
    purchase = selectFlightById(result)
    
    return result[purchase]
}
function getEqualPrice(){
    let cost = 0
    do{
        if(isNaN(cost)){
            cost = parseFloat(prompt("Valor erronio. Elija el precio de su vuelo (ej. 90):"))
        }else {
            cost = parseFloat(prompt("Elija el precio de su vuelo:"))
        }
    }while(cost === "undefined" || isNaN(cost))
    let result = flights.filter( flight => flight.cost === cost)
    if(result.length == 0){
        return false
    }
    
    if(result.length>1){
        let purchase
        console.log("Se ha encontrada más de un vuelo con es precio. ¿Cuál desea coger?")
        let idFlights = []
        result.forEach(elem => {
            idFlights.push(elem['id'])
            console.log("- Vuelo con ID "+elem['id']+" con origen "+elem['to']+" y destino "+elem['to'])
        });
        purchase = selectFlightById(result)
        return result[purchase]
    }
    return result[0]
}

function login(){
    let rol
    rol = prompt("Por favor, selecione su rol (ADMIN/USER):")
    rol = rol.toUpperCase()
    switch (rol) {
        case "ADMIN":
            let action
            action = prompt("Elija una opción (añadir/eliminar):")
            action = action.toLowerCase()
            switch (action) {
                case "añadir":
                    createFlight(flights)
                    break;
                case "eliminar":
                        do {
                            // console.clear();
                            console.log(deleteFlight())
                            console.log(printFlights(flights))
                         } while (askDelete() == "s" && flights.length > 0);
                         if(flights.length == 0) console.log("No se puede eliminar ningún registro. No hay vuelos programados")
                         console.log("¡Hasta la próxima!")
                    break
            
                default:
                    console.log("Lo siento, esta opción no está disponible")
                    break
            }
            
            break;
        case "USER":
            let findByPrice
            let flight
            let price
            findByPrice = prompt("Que tipo de vuelo quiere buscar. Más alto (+), más bajo (-) o igual (=)")
            switch (findByPrice) {
                case "+":
                    price =  prompt("Indique el precio mínimo del billete:")
                    flight = getMaxPrice(price)
                    console.log("Ha elegido el vuelo: ID:  "+flight['id']+ " con destino "+flight['from']+". Precio: "+flight['cost'])
                    console.log("Gracias por su compra, vuelva pronto.")
                    break
                case "-":
                    price =  prompt("Indique el precio máximo del billete:")
                    console.log(price)
                    flight = getMinPrice(price)
                    console.log("Ha elegido el vuelo más barato. ID: "+flight['id']+ " con destino "+flight['from']+". Precio: "+flight['cost'])
                    console.log("Gracias por su compra, vuelva pronto.")
                    break
                case "=":
                    flight = getEqualPrice()
                    if(flight === false){
                        console.log("No se ha encontrado un vuelo con ese precio.")
                        console.log("Hasta la próxima.")
                    }else {
                        console.log("Ha elegido el vuelo "+flight['id']+ " con destino "+flight['from']+". Precio: "+flight['cost'])
                        console.log("Gracias por su compra, vuelva pronto.")
                    }
                    break
            
                default:
                    console.log("Operación no disponible. Adiós.")
                    break
            }
            break
        
        default:
            console.log("Usuario incorrecto")
            break
    }
}
function skylabAirlines(){
    console.log(welcome()+", estos són todos los vuelos disponibles:")
    printFlights(flights)
    console.log("El coste medio de los vuelos es de "+priceAverage() )
    console.log("Vuelos con escala:")
    scaleFlights()
    console.log("Los últimos 5 vuelos del día són:")
    console.log(lastFlights(5))
    login()
}

skylabAirlines()