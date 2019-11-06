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
  ];
  
  //Se preguntará por el nombre de usuario y dará la bienvenida.
  
  function saludo(){
    let userName = '';
   
    userName = prompt('Bienvenido/a a Skylab Airlines, ¿Cuál es tu nombre?')
   
    userName ? alert(`Hola ${userName}!`) : alert('Bienvenido/a!');
    };
  
   
  saludo();
  
  
  /*El usuario visualizará todos los vuelos disponibles de una forma  amigable: El vuelo con origen: Barcelona, y destino: Madrid
  tiene un coste de XXXX€ y no realiza ninguna escala.*/
  
  function todosVuelos(arr){
    for(let i= 0; i < arr.length; i++){
        let scale = false 
        if(arr[i].scale){
            scale = 'realiza escala';
          } else {
            scale = 'no realiza escala';
          };
          console.log(`El vuelo con ID: ${arr[i].id} con origen: ${arr[i].from} y destino: ${arr[i].to}, tiene un coste de: ${arr[i].cost} y ${scale}`)
        }
    console.log('_________________________________')  
    };
   
  todosVuelos(flights);
  
  
  
  //A continuación, el usuario verá el coste medio de los vuelos//
  
  function mediaVuelos(arr){
    for(let i= 0; i < arr.length; i++){
        let suma = 0
        for (let i = 0; i < arr.length; i++){
        suma += arr[i].cost
        };
        let media = suma / arr.length;
       
       console.log(`Le informamos que el coste medio de los vuelos programados para hoy es de ${media.toFixed(2)} €`)    
    }
  };
  mediaVuelos(flights);
  
  console.log('_________________________________');
  //También podrá ver cuántos vuelos efectúan escalas.//
  
  
  function vuelosEscala(arr){
    console.log(`A continuación se muestran los vuelos que efectúan escala:`)
    for(let i= 0; i < arr.length; i++){
  if(arr[i].scale){
    console.log(`El vuelo con origen: ${arr[i].from} y destino: ${arr[i].to}, tiene un coste de: ${arr[i].cost}`);
  };
  };
  };
  vuelosEscala(flights);
  
  console.log('_________________________________');
  //Sabiendo que los últimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.
  
  function ultimosVuelos(arr){
    console.log(`Estos son los destinos del día:`)
    for(let i=(arr.length -5); i < arr.length; i++){
        console.log(`${arr[i].to}`)
    };
  };
  
  ultimosVuelos(flights);
  console.log('_________________________________');
  
  
  //Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER
  
  function adminOrUser(){
    let adminUser = prompt('A continuación, ¿Podrías indicar si eres admin o user?')
  
    if(adminUser === 'admin'){
      admin()
    } else if(adminUser === 'user'){
      user()
    } else {
      prompt('Por favor, introduzca admin o user')
    }
  };
  
  adminOrUser()
  
  /*Si eres ADMIN, la función debería permitir: Poder crear, más vuelos, pidiendo la información por prompt(),
  sin poder pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert(). Poder eliminar vuelos mediante el ID.*/
  
  function admin(){
  let finalizar = false
  
  while (!finalizar){
    
   let funcionAdmin = prompt(`¿Qué deseas realizar: crear / eliminar / visualizar vuelos / finalizar?`);
  
   switch (funcionAdmin){
     case 'crear':
      crearVuelo();
       break;
     case 'eliminar':
      eliminarVuelo();
       break;
      case 'visualizar vuelos':
      todosVuelos(flights);
      break;
     case 'finalizar':
      alert('Tus cambios han sido guardados. ¡Hasta pronto!');
      finalizar = true
       break;
   }
  } 
  };
  
  // funcion para crear nuevos vuelos y añadirlos al array de vuelos
  
  function crearVuelo(){
    if(flights.length > 15){
        alert('No puedes introducir más vuelos, por favor elimina uno antes.')
      } else {
    let idValido = false
    let ide = prompt('ingresa el ID del nuevo vuelo')
    while (!idValido){
      if(isNaN(ide)){
          alert('Valor inválido')
          ide = prompt('Introduce el ID en valor numérico')
      } else {
          idValido = true
      }
    }
    
   validacion = false
   
   while(!validacion){
    ide = parseInt(ide);
    idBuscado = flights.find(vuelo => vuelo.id === ide)
     if(idBuscado === undefined){
      validacion = true 
     } else {
      alert('Este ID ya está en uso')
      ide = prompt('Introduce un ID que no esté en uso')
      idValido2 = false
      while (!idValido2){
        if(isNaN(ide)){
            alert('Valor inválido')
            ide = prompt('Introduce el ID en valor numérico')
        } else {
            idValido2 = true
        }
       }
      }
    }


    const rango = new RegExp('^[A-Z]+$', 'i')
    let destino = prompt('ingresa el destino del nuevo vuelo')
let destinoValido = false;
while (!destinoValido){
 if(!destino) { 
  alert('No has introducido destino')
  destino = prompt('Ingresa el destino del nuevo vuelo (letras a - z)')
  } else { 
  if(!rango.test(destino)){  
  alert('Destino inválido')
  destino = prompt('Ingresa el destino del nuevo vuelo (letras a - z)')
  } else {
            destinoValido = true;
          }
  }
}

    let origen = prompt('ingresa el origen del nuevo vuelo')
let origenValido = false;
while (!origenValido){
 if(!origen) { 
  alert('No has introducido origen')
  origen = prompt('Ingresa el origen del nuevo vuelo (letras a - z)')
  } else { 
   if(!rango.test(origen)){  
   alert('Origen inválido')
   origen = prompt('Ingresa el origen del nuevo vuelo (letras a - z)')
   } else {
   origenValido = true;
   }
  }
 }


    let costeValido = false;
    let coste = parseInt(prompt("Inserta el coste en números"))
    while (!costeValido){
      if(isNaN(coste)){
          alert('Valor inválido')
          coste = prompt('Introduce el coste en valor numérico')
      } else {
          costeValido = true
      }
    }


  let escalaValido = false;
  let escala = prompt('ingresa true si realiza escala o false si no realiza escala')
  
  if(escala === 'true') {
    escala = true;
    escalaValido = true;
  }
  else if(escala === 'false') {
    escala = false;
    escalaValido = true;
  } 
 
  while (!escalaValido){
    alert('valor inválido')
  escala = prompt('ingresa valores válidos por favor (true o false)')
  if(escala === 'true') {
    escala = true;
    escalaValido = true;
  }
  else if(escala === 'false') {
    escala = false;
    escalaValido = true;
  } 
}
 
    let nuevoVuelo = {
      id: ide,
      to: destino,
      from: origen,
      cost: coste,
      scale: escala
    };
    flights.push(nuevoVuelo)
    
    console.log(`Has introducido el vuelo con ID: ${nuevoVuelo.id}, destino: ${nuevoVuelo.to}, origen: ${nuevoVuelo.from} 
    y coste: ${nuevoVuelo.cost}€`);
      };
     console.log('_________________________________')
    };
  
  //funcion para borrar vuelos mediante el ID
  
  function eliminarVuelo(){
  let idEliminado = parseInt(prompt('Por favor, introduce el ID del vuelo a eliminar'));
  vueloBuscado = flights.find(vuelo => vuelo.id === idEliminado)
    
  if (vueloBuscado === undefined){
      alert('Este ID no existe')
    return eliminarVuelo()
  } else {
    console.log(`El vuelo con ID ${flights[idEliminado].id} ha sido eliminado`);
    flights.splice(idEliminado, 1); 
  };
    console.log('_________________________________')
  }
  
  
  /*Si eres USER la función debería permitir: Buscar por precio (más alto, más bajo o igual),
  el usuario debería mostrar los datos de los vuelos encontrados y, indicando el ID, el programa
  responderá: "Gracias por su compra, vuelva pronto."*/
  
  function user(){
   
   let funcionUser = prompt(`¿Deseas buscar por precio, visualizar todos los vuelos o salir? buscar/visualizar/salir`)
  
   switch(funcionUser){
     case 'buscar':
        buscarVueloPrecio()
       break;
       case 'visualizar':
        todosVuelos(flights.sort((a,b) => a.id - b.id));
        user();
      break;
       case 'salir':
         alert('Gracias por su visita, ¡Hasta pronto!')
      break;
   }
  };
  
  
  //funcion para elegir el tipo de búsqueda por precio
  
  function buscarVueloPrecio(){
  let tipoBusqueda = prompt('¿Buscar por precio más alto, más bajo o igual? bajo/alto/igual')
  switch(tipoBusqueda){
    case 'alto':
      precioAlto();
      break;
    case 'bajo':
      precioBajo();
      break;
    case 'igual':
      precioIgual();
      break;
  };
  };
  
  //funcion para mostrar los vuelos con precio más alto que el introducido
  
  function precioAlto(){{
    let valorValido = false
    let valor = parseInt(prompt('Por favor, indica el precio'))
    while (!valorValido){
        if(isNaN(valor)){
            alert('Valor inválido')
            valor = prompt('Introduce un valor numérico')
        } else {
            valorValido = true
        }
      }
    let vuelosCaros = flights;
    vuelosCaros.sort((a,b) => b.cost - a.cost);
    for(let i = 0; i < vuelosCaros.length; i++){
        if(vuelosCaros[i].cost > valor){
         console.log(`Vuelo con ID: ${vuelosCaros[i].id} origen: ${vuelosCaros[i].from}  destino: ${vuelosCaros[i].to} coste: ${vuelosCaros[i].cost}`)    
         
        }
        }
        console.log('_________________________________')
      }
    
    comprarVuelo()  
    };
  
  //funcion para mostrar los vuelos con precio más bajo que el introducido
  
  function precioBajo(){{
    let valorValido = false
    let valor = parseInt(prompt('Por favor, indica el precio'))
    while (!valorValido){
        if(isNaN(valor)){
            alert('Valor inválido')
            valor = prompt('Introduce un valor numérico')
        } else {
            valorValido = true
        }
      }
    let vuelosBaratos = flights;
    vuelosBaratos.sort((a,b) => a.cost - b.cost);
    for(let i = 0; i < vuelosBaratos.length; i++){
        if(vuelosBaratos[i].cost < valor){
         console.log(`Vuelo con ID: ${vuelosBaratos[i].id} origen: ${vuelosBaratos[i].from}  destino: ${vuelosBaratos[i].to} coste: ${vuelosBaratos[i].cost}`);       
        }
        }
        console.log('_________________________________')
      }
    
    comprarVuelo()  
    };
  
   //funcion para mostrar los vuelos con precio igual al introducido 
  
  function precioIgual(){{
    let valorValido = false
    let valor = parseInt(prompt('Por favor, indica el precio'))
    while (!valorValido){
        if(isNaN(valor)){
            alert('Valor inválido')
            valor = prompt('Introduce un valor numérico')
        } else {
            valorValido = true
        }
      };
    let vuelosIgual = flights;
    for(let i = 0; i < vuelosIgual.length; i++){
        if(vuelosIgual[i].cost === valor){
         console.log(`Vuelo con ID: ${vuelosIgual[i].id} origen: ${vuelosIgual[i].from}  destino: ${vuelosIgual[i].to} coste: ${vuelosIgual[i].cost}`);    
        }
        }
        console.log('_________________________________')
      }
   
    comprarVuelo()  
    };
  
  
  //funcion para consultar si quieren comprar vuelo o no, y para volver a realizar búsquedas en caso que quieran
  
  function comprarVuelo(){
    compra = prompt('¿Deseas comprar un vuelo? si/no')
  switch(compra){
    case 'si':
    vueloComprar = parseInt(prompt('ingresa el ID del vuelo que quieres comprar'));

    let idCompra = flights.find(vuelo => vuelo.id === vueloComprar)
    
if (idCompra === undefined){
    alert('Este ID no existe')
  return comprarVuelo()
} else {
    if (confirm("¿Desea comprar el vuelo seleccionado?")) {
    console.log(`Has comprado el vuelo con origen: ${idCompra.from} y destino: ${idCompra.to}, por ${idCompra.cost}€`)
}
}
   
  console.log('_________________________________')
  
  seguirComprando = prompt(`¿Quieres realizar otra búsqueda? si/no`)
  if(seguirComprando === 'si'){
    buscarVueloPrecio()
  }else{
    alert('¡Gracias por su compra!')
  }
    break;
    case 'no':
    user();
    break;
  }  
  };
