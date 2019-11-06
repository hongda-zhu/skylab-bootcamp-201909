//Los números estaran comprendidos en el rango [1,99]


bingo();

function bingo() {
    var cantidadNumeros = 15; //Cantidad de números en el cartón
    var ranking = []; //Array de objetos {nombre:"Pepe", puntuacion:15}
    var validaPartida = false; //esta variable llevará el valor de la función confirm();
    mostrarRanking(ranking, cantidadNumeros);


    do {
        var jugador = {};
        jugador.nombre = prompt("Buenos días bienvenido el Bigo! \n Cómo desea que le llame?");

        //validamos el cartón con mediante respuesta del user
        var bingoCard = generarCarton(cantidadNumeros);

        //Preguntamos para avanzar, si no quiere salimos de la partida
        //En esta función se sucederan las bolas hasta el final de la partida
        //O hasta que el user quiera salir(En este caso la función devolvera 0)
        var numeroBolas = comprobarCarton(bingoCard, cantidadNumeros);
        if (numeroBolas == 0) {
            mostrarRanking(ranking);
            return;
        }

        jugador.puntuacion = (100 + cantidadNumeros - numeroBolas);
        ranking.push(jugador);

        mostrarRanking(ranking);

        if (!confirm("Desea volver a jugar?")) {
            validaPartida = true;
        }

    } while (!validaPartida);

}



//********************Funciones********************

//Genera un cartón de bingo de tantos números se le pase por param
//Generará n lineas de 5 números cada una
//En caso de meter 12 numeros, el "else if" valida que esa última línea sea insertada
function generadorBingoCard(number) {
    var aux = [];
    var linea = [];
    var contador = 0;
    var arrayNumeros = [];
    var numero;
    for (var i = 0; i < number; i++) {
        numero = { number: Math.round((Math.random() * (99 - 1 + 1)) + 1), mathched: false };

        //Comprueba si ya existe el número
        if (!arrayNumeros.includes(numero.number)) {
            arrayNumeros.push(numero.number);
            linea[contador] = numero;
            contador++;
        } else {
            i--;
        }

        //cada vez que llega a 5 corto la linea
        if (contador == 5) {
            contador = 0;
            aux.push(linea);
            linea = [];
        } else if (i == (number - 1)) {
            aux.push(linea);
        }
    }
    return aux;
}

//Genera un n aleaorio en el rango [1,99]
function numeroBombo() {
    return Math.round((Math.random() * (99 - 1 + 1)) + 1);
}




/*En el DoWhile ejecutaremos cada una de las bolas que salgan
*Comprobaremos cada bola, para ver si ya ha salido previamente
*Comprobamos si la bola que ha salido coincide con algún numero del cartón.

*/
function comprobarCarton(bingoCard, cantidadNumeros) {
    var numerosQueYaSalieron = [];
    var validaPartida = false;
    var bingo = false;
    var linea = false;
    var contador = 0;

    do {

        //Comprobamos que el número del bombo no se repita. En caso de que sea nuevo, se añade a un array de verificación.
        var numero = numeroBombo();
        while (numerosQueYaSalieron.indexOf(numero) > -1) {
            numero = numeroBombo();
        }
        numerosQueYaSalieron.push(numero);
        contador += 1;

        /*valida si la el numero de la bola que acaba de salir coincide con 
        con alguno de nuestros números, y mira si se ha hecho línea o cantado bingo
        */
        var numeroMatches = 0;

        for (var a = 0; a < bingoCard.length; a++) {
            var numeroMatchesLinea = 0;
            for (var x = 0; x < bingoCard[a].length; x++) {
                if (numero == bingoCard[a][x].number) {
                    bingoCard[a][x].mathched = true;
                }
                if (bingoCard[a][x].mathched == true) {
                    numeroMatchesLinea += 1;
                    numeroMatches += 1;
                }

            }
            if (!linea && numeroMatchesLinea == 5) {
                alert("!Liiiiiinea!");
                linea = true;
            }
        }
        if (numeroMatches == cantidadNumeros) {
            alert("!Biiiiingo! \n Ha completado el cartón en " + contador + " turnos!");
            var cartonSTR = mostrarCarton(bingoCard, numero);
            return contador;
        }

        var cartonSTR = mostrarCarton(bingoCard, numero);

        if (!siguienteTurno(cartonSTR) || bingo) {
            alert("Gracias por participar!");
            return 0;
        }


    } while (!validaPartida);
}


/*Muestra el carton al usuario y le pregunta a este si le gusta o prefiere otro
Si el usuario respode 'yes' se retorna el valor y comienza el juego, en caso 
contrario se genera un nuevo carton
*/
function generarCarton(numero) {
    var carton;
    do {
        var validacion = true;
        carton = generadorBingoCard(numero);
        var cartonStr = "";
        for (var i = 0; i < carton.length; i++) {
            for (var x = 0; x < carton[i].length; x++) {
                cartonStr += " " + carton[i][x].number;
            }
            cartonStr += "\n";
        }
        var respuesta = prompt("Si desea jugar con este cartón, escriba 'Yes'," +
            " pulse intro para cambiar de carton\n" +
            cartonStr);
        if (respuesta == null || (respuesta.toUpperCase()).localeCompare("YES")) {
            validacion = false;
        }
    } while (!validacion);
    return carton;
}
//Nuevo turno
//var siguienteTurno = () => { return confirm("avanzamos?"); };

function siguienteTurno(cartonSTR) {

    return confirm(cartonSTR + "\navanzamos?");
}




//Muestra el ranking hasta el momento, si todavía no se han grabado resultados
// Muestra el funcionamiento de los puntos
function mostrarRanking(ranking) {
    ranking = ranking.sort(function(a, b) {
        return (b.puntuacion - a.puntuacion)
    });
    var texto = "***Ranking por puntos***\n\n";
    if (ranking.length == 0) {
        texto += "Todavía no se han jugado partidas, Únete!";
        texto += "\n La puntucion comienza en 100 puntos, \n" +
            "una vez que hayan salido tantas bolas como casillas hay, \n" +
            "cada bola restará 1pto, siendo la máxima puntuación 100puntos\n Buena Suerte!";
    } else {
        for (var a = 0; a < ranking.length; a++) {
            texto += ranking[a].nombre + " ---> " + ranking[a].puntuacion + "\n";
        }
    }

    alert(texto);
}


//Esta función se encarga de mostrar el cartón actualizado cada ronda.
function mostrarCarton(bingoCard, numero) {
    var texto = "Ha salido el número " + numero;

    for (var i = 0; i < bingoCard.length; i++) {
        var cartonStr = "";
        var cartonModificado = "";
        for (var i = 0; i < bingoCard.length; i++) {
            for (var x = 0; x < bingoCard[i].length; x++) {
                cartonStr += " " + bingoCard[i][x].number;
                if (bingoCard[i][x].mathched) {
                    cartonModificado += " X";
                } else {
                    cartonModificado += " " + bingoCard[i][x].number;
                }
            }
            cartonStr += "\n"
            cartonModificado += "\n";
        }
    }

    texto += "\n Cartón Original";
    texto += "\n " + cartonStr;
    texto += "\n Cartón Modificado";
    texto += "\n " + cartonModificado;
    return texto;
}