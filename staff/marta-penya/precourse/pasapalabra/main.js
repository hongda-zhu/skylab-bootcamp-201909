var questions = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},
    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
    { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"},
    { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},
    { letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo"},
    { letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
    { letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia"},
    { letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
    { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    { letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
    { letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
    { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor"},
    { letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
    { letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
    { letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
    { letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
    { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
    { letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"},
    { letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
    { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
]

let aciertos = 0;
let fallos = 0;
let usuario = "";
let rondas = 0;
let rankingJugadores = [];



//funcion para tener el nombre de usuario y saludo, para posteriormente utilizarlo en el ranking

function nombreUsuario(){
    usuario = prompt('¡Bienvenido/a al Skylabra, el pasapalabra más divertido! ¿Cómo te llamas?')
    let usuarioValido = false;

    while(!usuarioValido){
      if(!usuario){
        alert('Debes introducir el nombre de usuario')
        usuario = prompt('¿Cómo te llamas?')
      } else {
        usuarioValido = true;
      }
    }

    alert(`Un placer ${usuario}!`)
    console.log('______________________')
    console.log('Por cada letra del abecedario hay una definición y tendrás que adivinar qué palabra se esconde. Por cada palabra correcta sumas un punto, puedes utilizar la palabra "pasapalabra" para dejar la pregunta en blanco y dejarla para la siguiente ronda')
    console.log('______________________')
  };

 



//funcion que desarolla el juego de pasapalabra

  function empiezaJuego(){
   

 
  while(questions.some(function(element){
    return element.status === 0
    })){

    rondas++   
   
    alert(`Empieza la ronda ${rondas}`) 
  

   for(let i = 0; i < questions.length; i++){
   if(questions[i].status === 0){
    console.log(questions[i].question)
    respuesta = prompt('¿Cuál es la palabra?')
    if(respuesta === questions[i].answer){
     alert('¡Respuesta correcta! Sumamos un punto')
     console.log(`${respuesta} = Correcto :)`); 
    questions[i].status = "correcta"
    aciertos++
    console.log('______________________')
    } else if(respuesta === 'pasapalabra') {
    alert('Pasamos a la siguiente pregunta y volveremos a esta al terminar la ronda')
    console.log('______________________')
    } else {
    alert('¡ERROR! Respuesta incorrecta! Restamos un punto')
    console.log(`${respuesta} = Error :(`)
    console.log(`La respuesta correcta es: ${questions[i].answer}`)
    questions[i].status = "incorrecta"
    fallos++
    console.log('______________________')   
    }
   }    
   }  
  }

  rankingGlobal();
 };


//funcion para notificar al jugador de los aciertos, etc y el ranking global con otros jugadores

  function rankingGlobal(){
    console.log(`¡Enhorabuena ${usuario}! Has completado el Skylabra en ${rondas} rondas, con ${aciertos} palabras acertadas y ${fallos} errores`);
    rankingJugadores.push({usuario: usuario, rondas: rondas, aciertos: aciertos, fallos: fallos });
    rankingJugadores.sort((a,b) => b.aciertos - a.aciertos);
  
    alert('A continuación mostraremos el Ranking ordenado por puntuación');
    console.log('_________________________')
    console.log('Ranking global:');
  
    for(let i= 0; i < rankingJugadores.length; i++){
      console.log(`Jugador/a ${rankingJugadores[i].usuario}: ${rankingJugadores[i].aciertos} puntos`)
    }
    console.log('_________________________')
   nuevoJuego();
  };

  
//funcion para empezar una nueva partida, vaciando todo para empezar de 0

  function nuevoJuego(){
    nuevaPartida = confirm('¿Deseas jugar una nueva partida del Skylabra?')
    
    if(nuevaPartida === true){
     aciertos = 0;
     fallos = 0;
     usuario = "";
     rondas = 0;

     for(let i in questions){
      questions[i].status = 0
     };
    
    nombreUsuario();
    empiezaJuego();
    
    } else {
      alert('¡Bye Bye! ¡Esperamos verte pronto!')
    }
    };
    

    //funcion global

    function pasapalabra(){
    nombreUsuario();
    empiezaJuego()

    }

    pasapalabra();