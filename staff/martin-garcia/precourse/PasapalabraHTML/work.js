//Fases del juego
// inicio: antes de clicar          jugando: Mientras se pregunta           finalizado: Una vez se termina la partida


//Se utilizará el status para saber si está:
//sin contestar 0           acertada 1          fallada -1
//Para que el juego fuese más interesante he añadido 5 preguntas por letra, para que puedan salir diferentes definiciones

let noContestadas = [];
let questions = [];
let jugador = {};
let ranking = [];
let tiempo = 120;
let intervalo;
let tipoPregunta; //PrimeraRonda/NoContestada
let numeroPregunta; //letiable auxiliar para saber en que número de pregunta me encuentro
let numeroPreguntaNoContestada = 0;
validacion = {
    partida: true,
    respuesta: true,
    contadorVuelta: 0,
};
let comprobacionPregunta;
let comprobacionRespuesta;


//El tipo letía entre primerNombre, nuevoNombre, dependiendo de si se ha pedido ingresar un nuevo nombre
function start(tipo) {
    if (tipo === "primerNombre") {
        jugador.nombre = document.getElementById("nombre").value;
    } else {
        let segundoNombre = document.getElementById("segundoNombre");
        if (segundoNombre.value.length > 0) {
            jugador.nombre = segundoNombre.value;
            document.getElementById("nombre").value = jugador.nombre;
        } else {
            jugador.nombre = document.getElementById("nombre").value;
        }
    }
    cambiarDescripcion("inicio"); //Cambia la pantalla de inicio por la del juego
    resetGame(); //Sortea las preguntas y pone los contadores y validadores a cero
    timer(); //Inicia el temporizador del juego
    formularPregunta("PrimeraRonda");
}



//Resetea los datos del juego para poder comenzar de cero.
function resetGame() {
    document.getElementById("comprobacionPregunta").innerHTML = "";
    tiempo = 120;
    validacion.contadorVuelta = 0;
    numeroPregunta = 0;
    validacion.partida = true;
    validacion.respuesta = true;
    reiniciarBolas();
    questions = [];
    multiplesQuestions.forEach(function(element) {
        let nRandom = Math.floor((Math.random() * (4 - 0 + 1)));
        questions.push(element[nRandom]);
    });
    document.getElementById("segundoNombre").value = "";
    document.getElementById("comprobacionPregunta").style.backgroundColor = "";
    formularPregunta("PrimeraRonda");
}



function timer() {
    intervalo = setInterval(function() {
        tiempo -= 1;
        let marcadorTiempo = document.getElementById("tiempo");
        marcadorTiempo.innerHTML = "Tiempo: " + tiempo;
        if (tiempo === 0) {
            alert("Se acabo el tiempo!");
            addToRanking();
            mostrarRanking();
            cambiarDescripcion("reiniciar");
            clearInterval(intervalo);
        }
    }, 1000);
}


function cambiarDescripcion(juego) {
    if (juego === "inicio") {
        let div = document.getElementById("inicio");
        div.hidden = true;
        div = document.getElementById("reiniciar");
        div.hidden = true;
        div = document.getElementById("inGame");
        div.hidden = false;
    } else if (juego === "reiniciar") {
        let div = document.getElementById("inGame");
        div.hidden = true;
        div = document.getElementById("reiniciar");
        div.hidden = false;
    }
}




function formularPregunta(tipo) {
    let textBox = document.getElementById("respuesta");
    textBox.value = "";
    textBox.focus();
    if (tipo === "PrimeraRonda") {
        let div = document.getElementById("pregunta");
        div.innerHTML = questions[validacion.contadorVuelta].question;
        tipoPregunta = "PrimeraRonda";
        comprobacionPregunta = questions[validacion.contadorVuelta].question;
        comprobacionRespuesta = questions[validacion.contadorVuelta].answer;
    } else if (tipo === "NoContestada") {
        if (numeroPreguntaNoContestada === noContestadas.length || numeroPreguntaNoContestada < 0) {
            numeroPreguntaNoContestada = 0;
        }
        let div = document.getElementById("pregunta");
        div.innerHTML = noContestadas[numeroPreguntaNoContestada].question;
        tipoPregunta = "NoContestada";
        comprobacionPregunta = noContestadas[numeroPreguntaNoContestada].question;
        comprobacionRespuesta = noContestadas[numeroPreguntaNoContestada].answer;
    }

}

function pasapalabra() {
    document.getElementById("respuesta").value = 'pasapalabra';
    responder();
}

function responder() {
    if (tipoPregunta === "PrimeraRonda") {
        let respuesta = document.getElementById("respuesta").value;
        validarPregunta(questions, respuesta, validacion.contadorVuelta);
    } else {
        let respuesta = document.getElementById("respuesta").value;
        validarPregunta(noContestadas, respuesta, numeroPreguntaNoContestada);
        console.log("if " + noContestadas[numeroPreguntaNoContestada].status);

        switch (noContestadas[numeroPreguntaNoContestada].status) {
            case 1:
                console.log("Correcta");
                questions[questions.indexOf(noContestadas[numeroPreguntaNoContestada])].status == 1;
                noContestadas.splice(numeroPreguntaNoContestada, 1);
                numeroPreguntaNoContestada -= 1;
                break;
            case -1:
                console.log("False");
                questions[questions.indexOf(noContestadas[numeroPreguntaNoContestada])].status == -1;
                noContestadas.splice(numeroPreguntaNoContestada, 1);
                numeroPreguntaNoContestada -= 1;
                break;
            default:
                numeroPreguntaNoContestada += 1;
        }
    }
    validacion.contadorVuelta += 1;
    preguntasRosco();
    if (validacion.respuesta === false) {
        addToRanking();
        //en esta funcion se pregunta mediante un confirm si se quiere jugar de nuevo
        mostrarRanking();
        cambiarDescripcion("reiniciar");
    }
}



//Dependiendo si estamos en la primera ronda de preguntas o en las sucesivas, entre en el if o else
//hace la pregunta y la valida con la función validarPregunta. Se le da el status, y en caso de 
//no responderla se añada al array noContestadas[]
function preguntasRosco() {
    if (validacion.contadorVuelta < questions.length) { //La primera vuelta se preguntan por orden
        formularPregunta("PrimeraRonda");
    }
    //No contestadas
    else {
        if (noContestadas.length > 0) {
            numeroPregunta = numeroPreguntaNoContestada;
            formularPregunta("NoContestada");
        } else {
            validacion.respuesta = false;
        }
    }
}

//recibe por parametro el array de preguntas, la respuesta del usuario, y la posición de
//de la pregunta dentro del array, es un poco lioso pero fue la solución que encontré para
//lidiar con las sucesivas rondas de preguntas.
function validarPregunta(preguntas, respuesta, posicion) {
    console.log(preguntas[posicion]);
    switch (respuesta.toLowerCase()) {
        case "end":
            validacion.respuesta = false;
            validacion.partida = false;
            break;
        case preguntas[posicion].answer:
            document.getElementById("comprobacionPregunta").innerHTML = "";
            document.getElementById("comprobacionPregunta").style.backgroundColor = "";
            preguntas[posicion].status = 1;
            pintarBola("verde", posicion);
            break;
        case "pasapalabra":
            preguntas[posicion].status = 0;
            document.getElementById("comprobacionPregunta").innerHTML = "Recuerda la palabra!";
            document.getElementById("comprobacionPregunta").style.backgroundColor = "";
            if (noContestadas.indexOf(preguntas[posicion]) == -1) {
                noContestadas.push(preguntas[posicion]);
            }
            break;
        default:
            document.getElementById("comprobacionPregunta").style.backgroundColor = "#b89fb0";
            document.getElementById("comprobacionPregunta").innerHTML = comprobacionPregunta + "<br>" + comprobacionRespuesta;
            pintarBola("rojo", posicion);
            preguntas[posicion].status = -1;
    }
}

//Añade al ranking una objeto con los datos nombre, aciertos y fallos.
function addToRanking() {
    let acertadas = 0;
    let falladas = 0;
    questions.forEach(function(element) {
        if (element.status == 1) {
            acertadas += 1;
        } else {
            falladas += 1;
        }
    });
    ranking.push({ nombre: jugador.nombre, aciertos: acertadas, fallos: falladas });
}


//Muestra el ranking por pantalla y pregunta si se quiere jugar otra vez
function mostrarRanking() {
    let titulo = document.getElementById("titulo");
    titulo.innerHTML = "<pre>Nombre       Acertadas       Falladas</pre>";
    ranking.sort(function(a, b) {
        if (a.aciertos < b.aciertos) {
            return 1;
        }
        if (a.aciertos > b.aciertos) {
            return -1;
        }
        return 0;
    });
    clearInterval(intervalo);
    let padre = document.getElementById("ranking");
    while (padre.hasChildNodes()) {
        padre.removeChild(padre.firstChild);
    }
    ranking.forEach(function(element) {
        let linea = document.createElement("p");
        linea.className = "linea";
        linea.innerHTML = "<pre> " + element.nombre + "    ---->    " + element.aciertos + "    ---->    " + element.fallos + "</pre>";
        padre.appendChild(linea);
    });
}




function introResposta(tecla) {
    if (tecla.keyCode === 13) {
        responder();
    }
}

function introStart(tecla) {
    if (tecla.keyCode === 13) {
        start();
        let textBox = document.getElementById("respuesta");
        textBox.focus();
    }
}


function pintarBola(color, numero) {
    console.log(tipoPregunta)
    if (tipoPregunta === "PrimeraRonda") {
        let bola = document.getElementById("" + numero);
        color === "rojo" ? bola.style.backgroundColor = "#ff5858" : bola.style.backgroundColor = "#9cf196";
    } else {
        let numeroBola = questions.indexOf(noContestadas[numero]);
        console.log(numeroBola);
        let bola = document.getElementById("" + numeroBola);
        color === "rojo" ? bola.style.backgroundColor = "#ff5858" : bola.style.backgroundColor = "#9cf196";

    }
}

function reiniciarBolas() {
    let bolas = document.getElementsByClassName("bola");
    for (let a = 0; a < bolas.length; a++) {
        bolas[a].style.backgroundColor = "#ffffff";
    }

}