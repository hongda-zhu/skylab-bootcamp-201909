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

//PARTE 1: SALUDO

//el programa pregunta el nombre al usuario y le saluda. Si el usuario no introduce nombre, por defecto aparecerá "anonimo".
function greeting() {
  let name = prompt("Bienvenido a Skylab Airlines, cual es su nombre?") || "anonimo";
  alert("Hola " + name + " !\n\nA continuacion se mostraran los vuelos disponibles para hoy.");
};

//PARTE 2: INFORMACIÓN INICIAL DE LOS VUELOS

//Información global de todos los vuelos:
function allFlights(arr) {
  console.log("Vuelos disponibles para hoy:")
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
  console.log("El precio medio de los vuelos de hoy es de: " + avgDecimals + " euros")
};

//Vuelos que hacen escala:
function scale(arr) {
  console.log("Los vuelos que realizan escala son:")
  for(let i in arr) {
    if(arr[i].scale) {
      console.log(`Origen: ${arr[i].from}, destino: ${arr[i].to}, con un coste de ${arr[i].cost} euros`)
    }
  }
};

//Últimos 5 destinos añadidos:
function lastDest(arr) {
  console.log("Ultimos destinos anadidos: ");
  let lastFiveArr = arr.slice(arr.length - 5, arr.length)
  for(let i in lastFiveArr) {
    console.log(lastFiveArr[i].to);
  }
};

//PRO
//PARTE 3: COMPROBACIÓN DE PERMISOS: CONTRASEÑA CORRECTA/INCORRECTA Y ADMIN/USER

// Se declara una lista con objetos que incluyen usuario, contraseña y si es administrador o usuario
const totalUsers = [{user: "Edu", pass: "perro", admin: false},
                    {user: "Diana", pass: "gato", admin: true},
                    {user: "Luiso", pass: "raton", admin: true},
                    {user: "Jose", pass: "loro", admin: false}];

//La función pide información al usuario a través de prompt y comprueba si usuario y contraseña coinciden y lo identifica como usuario o administrador, además de saludarlo con su nombre de usuario.
function password(users) {
  let user = prompt("Introduzca su nombre de usuario");
  let pass = prompt("Introduzca su contrasena");
  for(let person of users) {
    if(person.pass === pass && person.user === user) {
      const userType = person.admin ? "admin" : "user"
      alert(`Contrasena correcta, bienvenido/a ${person.user}`);
      return userType;
    }
  }
  alert(`Usuario o contrasena incorrectos`);
  password(users);
};

//PARTE 4: ADMIN/ AÑADIR VUELOS

//función que calcula automáticamente el id (siendo correlativo en el listado de vuelos)
function id(arr) {
  let max = 0;
  for(let i in arr) {
    max = Math.max(arr[i].id);
    max++;
  }
  return max;
};

//funcion que comprueba si los caracteres introducidos son numeros o letras
function isString(str) {
  return Number.isNaN(Number.parseFloat(str))
};

//función que añade vuelos
function addFlight() {
  let objectFlight = {};
  objectFlight.id = id(flights);
  objectFlight.to = prompt("Vuelo destino: ");
  while(!isString(objectFlight.to)) {
    alert("El vuelo destino no puede contener numeros");
    objectFlight.to = prompt("Vuelo destino: ");
  };
  objectFlight.from = prompt("Vuelo origen: ");
  while(!isString(objectFlight.from)) {
    alert("El vuelo origen no puede contener numeros");
    objectFlight.from = prompt("Vuelo origen: ");
  };
  objectFlight.cost = prompt("Vuelo precio: ");
  while(isString(objectFlight.cost)) {
    alert("El precio del vuelo debe contener unicamente valores numericos");
    objectFlight.cost = prompt("Vuelo precio: ");
  };
  objectFlight.scale = confirm("El vuelo hace escala?");
  return objectFlight;
};

//Mensaje de confirmación cuando se añade un vuelo, para validar los datos por el usuario.
const confirmFlightMsg = (flight) =>
  confirm(`Son correctos los datos?\n\nVuelo destino: ${flight.to}\nVuelo origen: ${flight.from}\nVuelo precio: ${flight.cost}\nVuelo escala: ${flight.scale}\n`);

//Función que permite al usuario añadir tantos vuelos como quiera hasta máximo 15 en total y confirmar si los datos son correctos.
//En el caso de que se haya llegado al máximo de 15 vuelos, indica que eliminando uno, podrá añadir otro.
function isAdminAddFlights(arr) { //añadido arr
    let newFlights = confirm("Quiere anadir vuelos?")
    if(newFlights && arr.length <= 15) {
      let objectFlight = addFlight();
      let confirmFlight = confirmFlightMsg(objectFlight)
      confirmFlight && arr.push(objectFlight);
      isAdminAddFlights(arr);
      if(arr.length >= 15) {
        alert("El maximo de vuelos es 15.\nHa introducido el maximo de vuelos.\nPara introducir otro vuelo, primero se debe eliminar alguno.")
      }
    }
};

//PARTE 5: ADMIN/ELIMINAR VUELOS

//función que calcula los ids disponibles, teniendo en cuenta que el usuario puede añadir o eliminar vuelos a partir del id.
function idDisponible(arr) {
  let arrIds = [];
  for(let i in arr) {
    arrIds.push(arr[i].id);
  }
  return arrIds;
};

//función que calcula el indice donde se encuentra el vuelo a eliminar seleccionado por el usuario
function searchIndex(arr, prop, num) {
  for(let i in arr) {
    if(arr[i][prop] === num) {
      return i;
    }
  }
};

//función que elimina vuelos para los permisos de administrador.
function isAdminDeleteFlights(arr) {
    let removeFlights = confirm("Quiere eliminar vuelos?")
    if(removeFlights) {
        let idDispo = idDisponible(flights);
        console.log(`Los vuelos disponibles son:`)
        arr.forEach(elem => console.log(`Id: ${elem.id} | ${elem.from} - ${elem.to}, ${elem.cost} euros`))
        let idRemove = prompt("Introduzca el id del vuelo a eliminar.\nIds disponibles: " + idDispo)
        if(!idRemove) {
          alert("Ok, bye!");
          removeFlights = false;
        } else if(idDispo.includes(Number(idRemove))) {
          let index = searchIndex(flights, "id", Number(idRemove))
          alert(`Se ha eliminado el vuelo con id ${idRemove}\n\n${arr[index].to} - ${arr[index].from}, ${arr[index].cost} euros`);
          arr.splice(index, 1);
          isAdminDeleteFlights(arr);
        } else {
          alert("El id no existe. Ids disponibles: " + idDispo)
          isAdminDeleteFlights(arr);
        }
    } else if(!removeFlights) {
      alert("Ok, bye!");
    }
};


//PARTE 6: SE MUESTRA POR TERMINAL LA INFORMACIÓN ACTUALIZADA DE LOS VUELOS

//Después de añadir y eliminar vuelos, se muestra por la terminal los vuelos disponibles, la media del precio actualizado y los últimos 5 destinos.

//PARTE 7: USER/ BUSCAR VUELOS POR PRECIO


//El usuario selecciona un precio que sirve de criterio de búsqueda:
function userSelectPrice() {
    let search = prompt("Introduzca un precio para buscar y comparar vuelos")
    while(isString(search)) {
      alert("El precio del vuelo debe contener unicamente valores numericos")
      search = prompt("Introduzca un precio para buscar vuelos")
    };
    return search;
};

//Función que añade en diferentes arrays los vuelos con precios mas caros, baratos o igual al indicado por el usuario, según el precio elegido por el usuario.
let moreExpensiveFlights = [];
let lessExpensiveFlights = [];
let equalExpensiveFlights = [];

function searchFlightsByPrice(arr, prop) {
  let search = userSelectPrice()
  for(let i in arr) {
    if(arr[i][prop] > Number.parseFloat(search)) {
    moreExpensiveFlights.push(arr[i])
    } else if(arr[i][prop] < Number.parseFloat(search)) {
      lessExpensiveFlights.push(arr[i])
    } else {
      equalExpensiveFlights.push(arr[i])
    }
  }
  lessExpensiveFlights.sort((a, b) => a[prop] - b[prop])
  moreExpensiveFlights.sort((a, b) => a[prop] - b[prop])
}



//funcion que imprime por la terminal los vuelos con precio igual, inferior y superior al seleccionado por el usuario cuando es llamado por cada uno de esos valores. Se llama a la funcion en la funcion final main().
function showFlightsByPrice(arr, string) {
  arr.length <= 0 ? console.log(`No hay vuelos con precio ${string} al seleccionado`) : console.log(`\nLos vuelos con precio ${string} al seleccionado son: `);
  for(let i in arr) {
    let scale = arr[i].scale ? `no realiza ninguna escala` : `realiza escala`
    console.log(`Id: ${arr[i].id} | Vuelo con origen ${arr[i].from} y destino ${arr[i].to}, precio de ${arr[i].cost} euros y ${scale} `);
   }
};

// PARTE 8: el usuario puede elegir un vuelo mediante el id y comprarlo.

function buyFlight(arr) {
  let buy = confirm("Quiere comprar un vuelo?");
  if(buy) {
    flightToBuy = prompt("Que vuelo quiere comprar?\n\nId de vuelos disponibles: " + idDisponible(flights))
    let flightBought = searchIndex(flights, "id", Number(flightToBuy))
    let idDispo = idDisponible(flights);
    if(idDispo.includes(Number(flightToBuy))) {
      let finalConfirmation = confirm(`El vuelo seleccionado es:\n\nId: ${arr[flightBought].id} | Vuelo con origen ${arr[flightBought].from} y destino ${arr[flightBought].to}, precio de ${arr[flightBought].cost} euros\n\nEs correcto?`);
      finalConfirmation ? alert("Gracias por su compra, vuelva pronto")
                      : buyFlight(arr);
    } else {
      alert("El id introducido no es correcto")
      buyFlight(arr);
    }
  } else {
    alert("Ok, bye!");
  }
};

//PARTE 9: TODO UNIDO

//Funcion princial que ejecuta todas las funciones anteriores en orden:
function main(arr, addUsers) {
  greeting() //saluda
  allFlights(arr) //muestra todos los vuelos
  avgCost(arr) //muestra la media de precios
  scale(arr) // muestra los vuelos con escala
  lastDest(arr) // muestra los ultimos 5 vuelos
  let typeUser = password(addUsers) //control de permisos
  if(typeUser === "admin") { // si es admin
    isAdminAddFlights(arr) // añade vuelos
    isAdminDeleteFlights(arr) // elimina vuelos
    allFlights(arr) //muestra todos los vuelos
  } else if(typeUser === "user") { // si es user
    searchFlightsByPrice(arr, "cost") // el usuario indica precio de busqueda y se buscan coincidencias.
    showFlightsByPrice(equalExpensiveFlights, "equivalente") //muestra los vuelos que coinciden con el precio de la busqueda
    showFlightsByPrice(lessExpensiveFlights, "inferior") // muestra los vuelos mas baratos
    showFlightsByPrice(moreExpensiveFlights, "superior") // muestra los vuelos mas caros
    buyFlight(arr) // el usuario puede comprar vuelos
  }
}
main(flights, totalUsers)
