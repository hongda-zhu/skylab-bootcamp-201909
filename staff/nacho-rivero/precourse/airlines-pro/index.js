var terminal = 0;
var userName = "";
var dataVis = [];
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
]; //global var
var avgCost = 0;
var lastFlights = [];
var user = 0;
var menuSelect = 0;
var uMenuSelect = 0;
var prices = [];

/*Despues de ver toda la información de SkyLab Airlines, preguntará al usuario si es USER, buscar por precio ( mas alto, mas bajo o igual, el 
    usuario podría mostrar los datos de los vuelos encontrados mostrando el id, el programa mostrará´un mensaje de agradecimiento por su compra)
 o ADMIN, pudiendo crear más vuelos hasta un total de 15 y si rebasa esa cantidad salta una alerta además de poder eliminar vuelos mediante ID*/


function sysBoot(){
    userInput = prompt("Please enter Username");
    userName = userInput.toLowerCase();
    console.log("Te damos la bienvenida a nuestro terminal de Skylab Airlines!, " + userName + ".");  
}

function displayData(){
    console.log(userName + " a continuación le mostramos todos los vuelos disponibles.");
    
        for (i = 0; i < flights.length; i++){ 
            if (flights[i].scale == false){

              dataVis = ["El vuelo con origen " + flights[i].from + ", con destino a " + flights[i].to + " tiene un coste de " + flights[i].cost + " € y no realiza ninguna escala."];
              console.log(dataVis);  

            } else{

              dataVis = ["El vuelo con escala con origen " + flights[i].from + ", con destino a " + flights[i].to + " tiene un coste de " + flights[i].cost + " €. "];
              console.log(dataVis);  
            }    
            
    }
}

function avgPrices(){
    
    var sum = 0;
    for( var j = 0; j < flights.length; j++ ){
        sum += parseInt( flights[j].cost, 10 ); //don't forget to add the base
    }   

    avgCost = sum/flights.length;
    console.log("Gracias por elegir SkyLab Airlines, con una media de " + avgCost.toFixed(0) + " €, nuestros vuelos tienen los precios más competitivos");
    
}

function nScaleFlights(){ //revisar cuando el admin añade nuevos vuelos, se dobla el valor de las escalas
  
    var count = flights.filter(function(scl) { return scl.scale; }).length;
     
    console.log("SkyLab Airlines cuenta con " + count + " escalas que te conectan con todo el mundo, y aumentando!");
    }   
   
    



function fiveLastFlights(){ 

    for( var j = flights.length - 1; j > 5; j--){ //flights.length - 1 is because there's always a 0
            lastFlights = ["Última llamada para el vuelo " + flights[j].id + " con destino a " + flights[j].to + ", y pasajeros diríjanse a la puerta de embarque "];
            console.log(lastFlights);
        }
    }  
    
function privilegiesByUserType(){
    
    user = prompt("Please select if you are user or administrator", "Choose between user or admin");
          if ( user == "user") {

            console.log("SkyLab Airlines está accediendo a tus credenciales de usuario, " + userName);
            userLog();

          } else if ( user == "admin") {

            password = prompt("Please introduce password");
            if (password == "eureka"){
                console.log("SkyLab Airlines está concediéndote los privilegios pertinentes, " + userName);
                adminLog(); 

            } else {

                console.log("Incorrect Password, please try again");
                privilegiesByUserType();
            }

           

          }else{
              
            console.log( user + " no es una palabra válida para la intranet de SkyLab Airlines, inténtalo de nuevo");
            privilegiesByUserType();

          }
          
}

function adminLog(){
/* for con el menu de opciones, al final un prompt que nos da a elegir entre seleccionar entre 1 de las 4 opciones o volver al menú principal */
var adMenu = ["1 - Crear nuevo vuelo", "2 - Eliminar vuelo", "3 - Vuelos disponibles", "4 - Volver atrás"];
console.log("Este terminal de SkyLab AirLines te saluda administrador, a continuación se te mostrarán las opciones disponibles");

for (var i = 0; i < adMenu.length; i++){
    console.log(adMenu[i]);
}
menuSelect = prompt("Por favor seleccione una de las opciones válidas para poder proceder", "Elija entre 1, 2, 3 y 4");
            switch (menuSelect){
                case "1" ://create flight, no mas de 15, si no salta alert
                    addEntry();
                break;

                case "2" : //Delete flight
                    deleteEntry();
                break;

                case "3" : 
                    displayDataID();
                    adminLog();
                break;

                case "4" ://Change user
                    privilegiesByUserType();
                break;
}
}

function userLog(){

    var uMenu = ["1 - Ordenar por precio más alto ", "2 - Ordenar por precio más bajo", "3 - Buscar por precio", "4 - Volver atrás"];
    console.log("Este terminal de SkyLab AirLines te saluda " + userName + " , a continuación se te mostrarán las opciones disponibles");
    
    for (var i = 0; i < uMenu.length; i++){
        console.log(uMenu[i]);
    }
    uMenuSelect = prompt("Por favor seleccione una de las opciones válidas para poder proceder", "Elija entre 1, 2, 3 y 4");
                switch (uMenuSelect){
                    case "1" ://create flight, no mas de 15, si no salta alert
                        highestPrice();
                    break;
    
                    case "2" : //Delete flight
                        lowestPrice();
                    break;
    
                    case "3" : 
                        samePrice();
                    break;
    
                    case "4" ://Change user
                        privilegiesByUserType();
                    break;
    }
    }





function addEntry(){

if (flights.length < 15){

    flyId = prompt("Introduce el ID ", "Debe ser un número");
    flyTo = prompt("Escribe destinación");
    flyFrom = prompt ("Escribe origen");
    flyCost = prompt ("Escribe coste");
    flyScale = prompt ("Vuelo con escala?");

    var flight = { id: flyId, to: flyTo, from: flyFrom, cost: flyCost, scale: flyScale };
    flights.push(flight);

        
        avgPrices();
        nScaleFlights();
        adminLog();

} else if (flights.length == 15){

    console.log("Es imposible añadir nuevos datos al sistema, la base de datos está al máximo de su capacidad");
    adminLog();
} else {
  
    console.log("Es imposible añadir nuevos datos al sistema, la base de datos está al máximo de su capacidad");
    adminLog();
}   

}


function deleteEntry(){  //los datos que quieras añadir o borrar los tienes que tratar como si fuera un array
    
    var forDel = prompt("Introduce el número de vuelo que deseas eliminar");

    for (var i = flights.length - 1; i >= 0; --i) { // iterar en negativo permite añadir y quitar elementos a un array sin provocar fallos en el orden
        if (flights[i].id == forDel) {
            flights.splice(i,1);

            displayDataID();
            avgPrices();
            nScaleFlights();          
            adminLog();

        }
    }

}


function displayDataID(){
    console.log(userName + " a continuación le mostramos todos los vuelos disponibles.");
    
        for (i = 0; i < flights.length; i++){ 
            if (flights[i].scale == false){

              dataVis = ["El vuelo " + flights[i].id + " con origen " + flights[i].from + ", con destino a " + flights[i].to + " tiene un coste de " + flights[i].cost + " € y no realiza ninguna escala."];
              console.log(dataVis);
             
            } else{

              dataVis = ["El vuelo " + flights[i].id +" con escala con origen " + flights[i].from + ", con destino a " + flights[i].to + " tiene un coste de " + flights[i].cost + " €. "];
              console.log(dataVis);
                
            }    
            
    }
}




function highestPrice(){//los datos que quieras añadir o borrar los tienes que tratar como si fuera un array

    prices = flights;
    
    prices.sort(function (a, b) {
        return b.cost - a.cost;   
    });
    
    for (i = 0; i < prices.length; i++){ 
          prList = ["El vuelo " + prices[i].id + " de " + prices[i].from + ", a " + prices[i].to + " con un coste de " + prices[i].cost + " €."];
          console.log (prList);

        } 
        
    userLog();

}


function lowestPrice(){//los datos que quieras añadir o borrar los tienes que tratar como si fuera un array

    prices = flights;
    
    prices.sort(function (a, b) {
        return a.cost - b.cost;   
    });
    
    for (i = 0; i < prices.length; i++){ 
          prList = ["El vuelo " + prices[i].id + " de " + prices[i].from + ", a " + prices[i].to + " con un coste de " + prices[i].cost + " €."];
          console.log (prList);

        } 
    
    userLog();


}

function samePrice(){//los datos que quieras añadir o borrar los tienes que tratar como si fuera un array

   var flyPrice = prompt ("Escribe coste");
   
   var selPrice = flights.filter (function(ePrice) {
                return ePrice.cost == flyPrice;
   });
    
   for (var i = 0; i < selPrice.length; i++) { // iterar en negativo permite añadir y quitar elementos a un array sin provocar fallos en el orden
        prList = ["El vuelo " + selPrice[i].id + " de " + selPrice[i].from + ", a " + selPrice[i].to + " con un coste de " + selPrice[i].cost + " €."];
        console.log (prList);  
           }
    userLog();
}



 
   
sysBoot();
displayData();
avgPrices();
nScaleFlights();
fiveLastFlights();
privilegiesByUserType();