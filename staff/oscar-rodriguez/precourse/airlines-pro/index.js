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

function crearVuelo () {
    continuar=true;
    while(continuar){
        if (flights.length>=15){
            alert("Ya hay 15 vuelos programados para hoy. Si quieres crear más vuelos, debes eliminar alguo primero!");
        } else {
            var newFlight = {   id: flights.length, 
                                to: prompt ("Introduce el Destino del vuelo: "), 
                                from: prompt ("Introduce el Origen del vuelo: "),
                                cost: parseInt (prompt("Introduce el Coste del vuelo: ")),
                                scale: confirm("¿El vuelo tiene escalas?")
                            };
            mostrarVuelo(newFlight);
            flights.push(newFlight);
            console.log ("Vuelo creado");
            continuar=confirm("Deseas introducir algún vuelo mas?");
        }
        if (confirm("Quieres ver el listado de vuelos actualizado?")){
            listarVuelos(flights);
        }
    }
}

function eliminarVuelo () {
    if (confirm("Necesitas ver el listado de vuelos para saber qué vuelo eliminar?")){
        listarVuelos(flights);
    }
    var delID;
    var continuar=true;

    while (continuar) {
        delID=parseInt(prompt ("Introduce el ID del vuelo que deseas eliminar"));
        flights.splice(delID,1);
        continuar=confirm("Deseas seguir eliminando vuelo?");
    }
    if (confirm("Quieres ver el listado de vuelos actualizado?")){
        listarVuelos(flights);
    }    
}

function mostrarVuelo (vuelo) {
    if (vuelo.scale){ console.log("\tEl vuelo "+vuelo.id+" con origen "+vuelo.from+" y con destino "
                                            +vuelo.to+" tiene un coste de "+vuelo.cost+"€ CON escalas.");
    } else console.log ("\tEl vuelo "+vuelo.id+" con origen "+vuelo.from+" y con destino "
                            +vuelo.to+" tiene un coste de "+vuelo.cost+"€ SIN escalas.");
}

function listarVuelos (lista) {
    for (var i=0; i<lista.length; i++) {
        mostrarVuelo(lista[i]);
    }
}

function calcularCosteMedio () {
    var averageCost=0;

    for (var i=0; i<flights.length; i++) {
        averageCost+=flights[i].cost;
    }
    averageCost=Math.floor(averageCost/flights.length);
    return averageCost;
}

function mostrarUltimosCincoDestinos () {
    var lastFive=[];

    lastFive=flights.slice(-5);
    console.log("\n\nLos 5 últimos vuelos programados para hoy tienen como destino: ");

    for (var j=0;j<lastFive.length;j++) {
        console.log("\t -> "+lastFive[j].to);
    }
}

function doAdminCode () {
    var continuar=true;

    while (continuar){
        if(confirm("Deseas crear vuelos? Recuerda, puedes crear hasta 15 vuelos. \
        Ahora mismo existen "+flights.length+' vuelos programados para hoy.')) {
            crearVuelo();
        }
        if(confirm("Deseas eliminar alguno de los vuelos programados para hoy?")) {
            eliminarVuelo();
        }
        if(confirm("Has terminado de añadir o eliminar vuelos?")) { continuar=false; }
    }
}

function doUserCode () {
  
    var salir=false;
    var i;

    do {
        var flightsTemp = flights.slice();
        var prize=parseInt(prompt("Introduzca el precio a buscar: "));

        switch ((prompt("Desea buscar vuelos con coste MAYOR, MENOR o IGUAL a "+prize+"€")).toUpperCase()) {
            case 'MAYOR':   salir=true;
                            flightsTemp.sort(function(a, b){return a.cost - b.cost});
                            i = flightsTemp.findIndex(a => a.cost >= prize);
                            if (i>=0){ 
                                flightsTemp=flightsTemp.splice(i);
                            } else { 
                                console.log("No se han encontrado vuelos con coste mayor a "+prize+"€"); 
                            }
                            break;
            case 'MENOR':   salir=true;
                            flightsTemp.sort(function(a, b){return b.cost - a.cost});
                            i = flightsTemp.findIndex(a => a.cost <= prize);
                            if (i>=0){ 
                                flightsTemp=flightsTemp.splice(i);
                            } else { 
                                console.log("No se han encontrado vuelos con coste menor a "+prize+"€"); 
                            }
                            break;
            case 'IGUAL':   salir=true;
                            flightsTemp.sort(function(a, b){return a.cost - b.cost});
                            i = flightsTemp.findIndex(a => a.cost === prize);
                            if (i>=0){ 
                                flightsTemp=flightsTemp.splice(i,1);                                
                            } else { 
                                console.log("No se han encontrado vuelos con coste menor a "+prize+"€"); 
                            }
                            break;
            default: alert("Debe introducir MAYOR, MENOR o IGUAL"); break;
        }
    } while (!salir);
    listarVuelos(flightsTemp);
    i=parseInt(prompt("Introduzca el ID del vuelo que desea comprar:"));
    if(i>=0&&i<flights.lenght){alert("Ha elegido el vuelo con destino a "+flights[i].to+" ,\
desde "+flights[i].from+" por "+flights[i].cost+"€.\nGracias por su compra, vuelva pronto.");}
}

function airlinesPRO () {

    var name=prompt("Hola! ¿Como te llamas?", "Oscar eRRe");
    console.log("Hola "+name+".\nBienvenido a Skylab Airlines.\nÉstos son los vuelos planificados para hoy: \n");

    listarVuelos(flights);
    console.log("\n\nEl coste medio de los vuelos de hoy es de "+calcularCosteMedio()+"€");
    mostrarUltimosCincoDestinos();


    var usr = prompt("Eres ADMIN o USER?").toUpperCase();
    while (usr!='ADMIN' && usr!='USER'){
        usr = prompt("¡No te reconozco! Eres ADMIN o USER?").toUpperCase();
    }

    switch (usr){
        case 'ADMIN': doAdminCode(); break;
        case 'USER': doUserCode(); break;
    }
}
var salir=false;
while (!salir) {
    airlinesPRO();
    salir=confirm("Desea salir del programa?");
}