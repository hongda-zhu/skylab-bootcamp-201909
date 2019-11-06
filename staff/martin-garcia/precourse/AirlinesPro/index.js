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
    var costeMedio = 0;
    var nVuelosConEscala = 0;

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
    })

}

function adminOrUser() {
    const tipo = prompt("Escribe tu tipo 'Admin' o 'User' para más operaciones, o pulsa Enter para salir.");
    if (tipo.toUpperCase() == "ADMIN") {
        adminFunction();
    } else if (tipo.toUpperCase() == "USER") {
        userFunction();
    } else {
        console.log(tipo.toUpperCase());
        return;
    }
}

function metodoOrdenacion(orden) {
    //Utilizo Array.from porque al copiar la instancia me generaba problemas
    var auxFlights1 = Array.from(flights);
    var auxFlights2 = Array.from(flights);
    if (orden == "desc") {
        auxFlights1.sort(function(a, b) { //Utilizo sort para ordenar
            if (a.cost > b.cost) {
                return 1;
            }
            if (a.cost < b.cost) {
                return -1;
            }
            return 0;
        });
        console.log("Vuelos ordenados con precio ascendiente: ");
        console.log(auxFlights1);
    } else {
        auxFlights2.sort(function(a, b) { // cambio los valores de retorno para que ordene al revés pero no lo hace :(
            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
                return 1;
            }
            return 0;
        });
        console.log("Vuelos ordenados con precio descendiente: ");
        console.log(auxFlights2);
    }
}



function userFunction() {
    var validacion = true;
    do {
        const opcion = prompt("Que desea:escriba \n'1' para ordenar por precio mayor a menor" +
            "\n'2' para ordenar por precio menor a mayor" +
            "\n'3' para comprar vuelo" +
            "\npulsa Enter para salir.");
        //Teño que arreglar o método da burbulla, non acaba de funcionar
        if (opcion == 1) {
            metodoOrdenacion("asc");
        } else if (opcion == 2) {
            metodoOrdenacion("desc");
        } else if (opcion == 3) {
            const idVuelo = prompt("Escriba el id del vuelo por favor: ");
            var validacionId = false;
            flights.forEach(function(element) {
                if (element.id == idVuelo) {
                    validacionId = true;
                    return;
                }
            });

            validacionId ? console.log("Gracias por su compra, vuelva pronto") : console.log("No se ha entoncreado su vuelo");

        } else {
            console.log("Hasta la próxima");
            validacion = false;
        }
    } while (validacion);
}



//Esta función tiene una "interfaz" para poder seleccionar eliminar o añadir vuelos, hasta que se especifique lo contrario.
function adminFunction() {
    var validacion = true;
    do {
        const opcion = prompt("Que desea:escriba '1' para añadir o '2' para eliminar vuelos, pulsa Enter para salir.");
        if (opcion == 1) {
            if (flights.length < 15) {
                const origen = prompt("Origen?");
                const destino = prompt("Destino?");
                const precio = prompt("Precio?");
                const escala = prompt("Tiene escalas?");
                var idVuelo = (flights[flights.length - 1].id) + 1;
                flights.push({ id: idVuelo, to: destino, from: origen, cost: precio, scale: escala });
            } else {
                alert("No se admiten más vuelo, prueba a borrar alguno");
            }
        } else if (opcion == 2) {
            const idVuelo = prompt("id del vuelo a eliminar: ");
            var tamaño = flights.length;
            for (var a = 0; a < flights.length; a++) {
                if (flights[a].id == idVuelo) {
                    flights.splice(a, 1);
                    console.log("vuelo con id " + idVuelo + " eliminado.");
                }
            }
            if (tamaño == flights.length) console.log("No se encontró el vuelo con el id " + idVuelo);
        } else {
            console.log("Hasta la próxima");
            validacion = false;
        }
        console.log(flights); //Imprimo aquí los vuelos para ver si se han efectuado los cambios.
    }
    while (validacion);
}



muestraVuelos(); //llamada a la función
adminOrUser();