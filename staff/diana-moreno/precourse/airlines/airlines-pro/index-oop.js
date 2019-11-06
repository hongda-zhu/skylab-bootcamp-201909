//AIRLINES-PRO OOP

class Flights {
  constructor() {
    this.flights = [
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
    ]
  }
}

class InfoFlights {
  constructor(arr) {
    this.allFlights(arr)//(this.arrayFlights.flights)
    this.avgCost(arr)
    this.scale(arr)
    this.lastDest(arr)
  }

  allFlights(arr) {
    console.log("\nVuelos disponibles para hoy:")
    for(let i in arr) {
      let scale = arr[i].scale ? `no realiza ninguna escala` : `realiza escala`
      console.log(`El vuelo con origen: ${arr[i].from} y destino: ${arr[i].to}, tiene un coste de ${arr[i].cost} euros y ${scale}`)
    }
  }

  avgCost(arr) {
    let add = 0;
    for(let i in arr) {
      add += arr[i].cost
    }
    let avg = add / arr.length;
    let avgDecimals = Number.parseFloat(avg.toFixed(2));
    console.log("\nEl precio medio de los vuelos de hoy es de: " + avgDecimals + " euros")
  }

  scale(arr) {
    console.log("\nLos vuelos que realizan escala son:")
    for(let i in arr) {
      if(arr[i].scale) {
        console.log(`Origen: ${arr[i].from}, destino: ${arr[i].to}, con un coste de ${arr[i].cost} euros`)
      }
    }
  }

  lastDest(arr) {
    console.log("\nUltimos destinos anadidos: ");
    let lastFiveArr = arr.slice(arr.length - 5, arr.length)
    for(let i in lastFiveArr) {
      console.log(lastFiveArr[i].to);
    }
  }
}

class Credentials {
  constructor() {
    let totalUsers = [{user: "Edu", pass: "perro", admin: false},
                      {user: "Diana", pass: "gato", admin: true},
                      {user: "Luiso", pass: "raton", admin: true},
                      {user: "Jose", pass: "loro", admin: false}];
    this.typeOfUser = this.password(totalUsers);
  }

  password(users) {
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
    this.password(users);
  }
}

class Admin {
  constructor(arr) {
    this.isAdminAddFlights(arr)
    this.isAdminDeleteFlights(arr)
  }

  id(arr) {
    let max = 0;
    for(let i in arr) {
      max = Math.max(arr[i].id);
      max++;
    }
    return max;
  }

  isString(str) {
    return Number.isNaN(Number.parseFloat(str))
  }

  idDisponible(arr) {
    this.arrIds = [];
    for(let i in arr) {
      this.arrIds.push(arr[i].id);
    }
    return this.arrIds;
  }

  searchIndex(arr, prop, num) {
    for(let i in arr) {
      if(arr[i][prop] === num) {
        return i;
      }
    }
  }

  addFlight(arr) {
    let objectFlight = {};
    objectFlight.id = this.id(arr);
    objectFlight.to = prompt("Vuelo destino: ");
    while(!this.isString(objectFlight.to)) {
      alert("El vuelo destino no puede contener numeros");
      objectFlight.to = prompt("Vuelo destino: ");
    };
    objectFlight.from = prompt("Vuelo origen: ");
    while(!this.isString(objectFlight.from)) {
      alert("El vuelo origen no puede contener numeros");
      objectFlight.from = prompt("Vuelo origen: ");
    };
    objectFlight.cost = prompt("Vuelo precio: ");
    while(this.isString(objectFlight.cost)) {
      alert("El precio del vuelo debe contener unicamente valores numericos");
      objectFlight.cost = prompt("Vuelo precio: ");
    };
    objectFlight.scale = confirm("El vuelo hace escala?");
    return objectFlight;
  }

  confirmFlightMsg(flight) {
    if(confirm(`Son correctos los datos?\n\nVuelo destino: ${flight.to}\nVuelo origen: ${flight.from}\nVuelo precio: ${flight.cost}\nVuelo escala: ${flight.scale}\n`))
      return true
  }

  isAdminAddFlights(arr) {
    let newFlights = confirm("Quiere anadir vuelos?")
    if(newFlights && arr.length <= 15) {
      let objectFlight = this.addFlight(arr);
      let confirmFlight = this.confirmFlightMsg(objectFlight)
      confirmFlight && arr.push(objectFlight);
      this.isAdminAddFlights(arr);
      if(arr.length >= 15) {
        alert("El maximo de vuelos es 15.\nHa introducido el maximo de vuelos.\nPara introducir otro vuelo, primero se debe eliminar alguno.")
      }
      return arr; // se puede eliminar?
    }
  }

  isAdminDeleteFlights(arr) {
    let removeFlights = confirm("Quiere eliminar vuelos?")
    if(removeFlights) {
      let idDispo = this.idDisponible(arr);
      console.log(`Los vuelos disponibles son:`)
      arr.forEach(elem => console.log(`Id: ${elem.id} | ${elem.from} - ${elem.to}, ${elem.cost} euros`))
      let idRemove = prompt("Introduzca el id del vuelo a eliminar.\nIds disponibles: " + idDispo)
      if(!idRemove) {
        alert("Ok, bye!");
        removeFlights = false;
      } else if(idDispo.includes(Number(idRemove))) {
        let index = this.searchIndex(arr, "id", Number(idRemove))
        alert(`Se ha eliminado el vuelo con id ${idRemove}\n\n${arr[index].to} - ${arr[index].from}, ${arr[index].cost} euros`);
        arr.splice(index, 1);
        this.isAdminDeleteFlights(arr);
      } else {
        alert("El id no existe. Ids disponibles: " + idDispo)
        this.isAdminDeleteFlights(arr);
      }
    } else if(!removeFlights) {
      alert("Ok, bye!");
    }
  }
}

class User {
  constructor(arr) {
    this.moreExpensiveFlights = [];
    this.lessExpensiveFlights = [];
    this.equalExpensiveFlights = [];
    this.searchFlightsByPrice(arr, "cost") // el usuario indica precio de busqueda y se buscan coincidencias.
    this.showFlightsByPrice(this.equalExpensiveFlights, "equivalente") //muestra los vuelos que coinciden con el precio de la busqueda
    this.showFlightsByPrice(this.lessExpensiveFlights, "inferior") // muestra los vuelos mas baratos
    this.showFlightsByPrice(this.moreExpensiveFlights, "superior") // muestra los vuelos mas caros
    this.buyFlight(arr)
  }

  isString(str) {
    return Number.isNaN(Number.parseFloat(str))
  }

  idDisponible(arr) {
    let arrIds = [];
    for(let i in arr) {
      arrIds.push(arr[i].id);
    }
    return arrIds;
  }

  searchIndex(arr, prop, num) {
    for(let i in arr) {
      if(arr[i][prop] === num) {
        return i;
      }
    }
  }

  userSelectPrice() {
    let search = prompt("Introduzca un precio para buscar y comparar vuelos")
    while(this.isString(search)) {
      alert("El precio del vuelo debe contener unicamente valores numericos")
      search = prompt("Introduzca un precio para buscar vuelos")
    };
    return search;
  }

  searchFlightsByPrice(arr, prop) {
    let search = this.userSelectPrice()
    for(let i in arr) {
      if(arr[i][prop] > Number.parseFloat(search)) {
        this.moreExpensiveFlights.push(arr[i])
      } else if(arr[i][prop] < Number.parseFloat(search)) {
        this.lessExpensiveFlights.push(arr[i])
      } else {
        this.equalExpensiveFlights.push(arr[i])
      }
    }
    this.lessExpensiveFlights.sort((a, b) => a[prop] - b[prop])
    this.moreExpensiveFlights.sort((a, b) => a[prop] - b[prop])
  }

  showFlightsByPrice(arr, string) {
    arr.length <= 0 ? console.log(`No hay vuelos con precio ${string} al seleccionado`) : console.log(`\nLos vuelos con precio ${string} al seleccionado son: `);
    for(let i in arr) {
      let scale = arr[i].scale ? `no realiza ninguna escala` : `realiza escala`
      console.log(`Id: ${arr[i].id} | Vuelo con origen ${arr[i].from} y destino ${arr[i].to}, precio de ${arr[i].cost} euros y ${scale} `);
     }
  }

  buyFlight(arr) {
    let buy = confirm("Quiere comprar un vuelo?");
    if(buy) {
      let flightToBuy = prompt("Que vuelo quiere comprar?\n\nId de vuelos disponibles: " + this.idDisponible(arr))//cambio flights por arr
      let flightBought = this.searchIndex(arr, "id", Number(flightToBuy))
      let idDispo = this.idDisponible(arr);
      if(idDispo.includes(Number(flightToBuy))) {
        let finalConfirmation = confirm(`El vuelo seleccionado es:\n\nId: ${arr[flightBought].id} | Vuelo con origen ${arr[flightBought].from} y destino ${arr[flightBought].to}, precio de ${arr[flightBought].cost} euros\n\nEs correcto?`);
        finalConfirmation ? alert("Gracias por su compra, vuelva pronto")
                        : this.buyFlight(arr);
      } else {
        alert("El id introducido no es correcto")
        this.buyFlight(arr);
      }
    } else {
      alert("Ok, bye!");
    }
  }
}

class Airlines {
  constructor() {
    this.greeting();
    this.arrayFlights = new Flights();
    let flights = this.arrayFlights.flights
    this.infoFlights = new InfoFlights(flights);
    this.credentials = new Credentials();
    if(this.credentials.typeOfUser === "admin") {
      this.isAdmin = new Admin(flights);
    } else if(this.credentials.typeOfUser === "user") {
      this.isUser = new User(flights)
    }
  }

  greeting() {
    let name = prompt("Bienvenido a Skylab Airlines, cual es su nombre?") || "anonimo";
    alert("Hola " + name + " !\n\nA continuacion se mostraran los vuelos disponibles para hoy.");
  }
}

new Airlines();