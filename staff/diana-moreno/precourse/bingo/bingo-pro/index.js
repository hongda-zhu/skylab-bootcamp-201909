//BINGO
//
//pedir nombre del jugador y guardarlo
//mostrar carton con 15 numeros excluyendo el 0
//pedir confirmación mediante confirm() para seguir jugando
//mostrar numero por pantalla y si coincide con alguno del cartón, se tachará con una X o un 0.
//mostrar por pantalla el cartón actualizado con las X correspondientes
//volver a preguntar al inicio de cada turno si desea continuar
//se mostrará por pantalla cuando se haga linea "LINEA" y se seguirá para bingo
//cuando se haga bingo, se informará de en cuantos turnos se ha completado el cartón.
//se preguntará si se desea volver a jugar

// 1. Se genera la estructura inicial del cartón:
let randomNumber = 0;
let numberOfPlays = 0;
let ranking = [];

var bingoCardStructure = Array(15).fill().map(
  () => ({ number: randomNumber, matched: false })
);

// bingoNumbers [1,2,3...90] son los numeros sobre los que se elegirá el carton.
const bingoNumbers = Array(90).fill().map((_, i) => i + 1)

// 2. Función que genera un cartón aleatorio sustituyendo randomNumber del objeto por un numero random no repetido del 1 al 90.
function getRandomBingoCard(arr) {
  let bomboNumbers = [...bingoNumbers]; // copia de bingoNumbers
  let counter = arr.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * bomboNumbers.length);
    arr[counter -1].number = bomboNumbers.splice(index, 1)[0];
    arr[counter -1].matched = false;
    counter--;
  }
  return arr;
}

// 3. Función que pregunta el nombre al usuario y saluda
function greetUser() {
  name = prompt("Welcome to SkyBingo. What's your name?");
  if(name === "") {
    alert("Hello, anonymous")
  } else {
  alert("Hello, " + name)
  }
  console.log("Welcome to SkyBingo.\nYou start with 90 points but every play, you will lose one point. At the end, your score and position in the global ranking will be shown.")
}

// 4. Función que muestra el cartón random por pantalla
function showBingoCard(arr) {
  let arrayNums = [];
  for(let i in arr) {
    arrayNums.push(arr[i].number);
  }
  console.log(
    "This is your card:\n\n" + arrayNums.slice(0, 5) + "\n"
    + arrayNums.slice(5, 10) + "\n" + arrayNums.slice(10, 15))
}

// 5. funcion que elige cartón para jugar:
function chooseBingoCard() {
  let bingoCard = getRandomBingoCard(bingoCardStructure) //genera cartón random
  showBingoCard(bingoCard) //muestra el cartón random por pantalla
  let choiceUser = confirm("Do you want to play with this card?\nPress OK to confirm, otherwise a new card will be generated.")
  return choiceUser ? bingoCard : chooseBingoCard();
}

// 6. Función que pide confirmación para seguir jugando
function confirmPlay() {
  return confirm("Do you want to keep playing?") ? true : alert("Ok, the game is over.");
}

// 7. Función que desordena los números de bomboNumbers y los pone en juego para bingo. Una vez utilizados, los añade a un array (discardedNumbers) para no volver a utilizarlos.

  let discardedNumbers = [] //array que muestra los numeros utilizados
  let bomboNumbers = [...bingoNumbers]

function generateNumberPlay() {
  numberOfPlays++;
  let counter = bomboNumbers.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    let num = bomboNumbers.splice(index, 1)[0]
    console.log("The number generated randomly is " + num)
    discardedNumbers.push(num)
    counter--;
    return num;
  }
}

// 8. Función que sustituye el número seleccionado del bombo por una X si se encuentra en el cartón.
function crossNumber(bingoCard, numberToCross) {
  for(let i in bingoCard) {
    if(bingoCard[i].number == numberToCross) {
      bingoCard[i].matched = true;
      alert("Number " + bingoCard[i].number + " is in your card!\nLet's cross it."); //muestra por alerta
      console.log("Number " + bingoCard[i].number + " is in your card!\nLet's cross it."); //muestra por pantalla
      bingoCard[i].number = "X";
      showBingoCard(bingoCard);
    }
  }
}

// 9. Función que muestra un mensaje cuando se hace Linea.
let rows = []; //declarada globalmente porque se utiliza por isLine y isBingo

function isLine(bingoCard) {
  rows = [];
  let row1 = bingoCard.slice(0, 5);
  let row2 = bingoCard.slice(5, 10);
  let row3 = bingoCard.slice(10, 15);
  rows.push(row1, row2, row3);
  for(let i in rows) {
    if(rows[i].every(elem => elem.matched === true)) {
      console.log("You scored a Line!")
      return true;
    }
  }
}

// 10. Función que muestra un mensaje cuando se hace Bingo e informa de la cantidad de jugadas realizadas para conseguir bingo.
function isBingo(bingoCard) {
  for(let i in rows) {
    if(bingoCard.every(elem => elem.matched === true)) {
      console.log("You scored a Bingo!!!!\n\nIt took you " + numberOfPlays + " plays.");
      return true;
    }
  }
}

// 11. Función que entra en bucle mientras quieras seguir jugando hasta que se haga linea, tachando los números que se encuentren en el cartón.
function playUntilLine(bingoCard) {
  let stop = false;
  for(let i in bingoCard) {
    while(bingoCard[i].matched === false && !stop) {
      if(confirmPlay() !== true) { //pregunta si quieres seguir jugando
        stop = true; //si no quieres seguir jugando, se termina el juego
        return false;
      } else {
        let number = generateNumberPlay() //genera un nuevo numero
        crossNumber(bingoCard, number)//tacha el numero encontrado
        if(isLine(bingoCard) === true) {
          stop = true; //finaliza si hace linea
        return true;
        }
      }
    }
  }
}

// 12. Función que continúa buscando coincidencias después de que se haga linea, sigue para bingo.
function playUntilBingo(bingoCard) {
  let stop = false;
  for(let i in bingoCard) {
    while(bingoCard[i].matched === false && !stop) {
      if(confirmPlay() !== true) { //pregunta si quieres seguir jugando
        stop = true; //si no quieres seguir jugando, se termina el juego
      } else {
        let number = generateNumberPlay() //genera un nuevo numero
        crossNumber(bingoCard, number)//tacha el numero encontrado
        if(isBingo(bingoCard) === true) {
          stop = true; //finaliza si hace Bingo
        };
      }
    }
  }
}

// 13. Función que inicializa las variables y rellena el bombo para volver a jugar
function setInitializeVariables() {
  randomNumber = 0;
  numberOfPlays = 0;
  discardedNumbers = [];
  bomboNumbers = [...bingoNumbers]
}

// 14. Función que pregunta si se quiere volver a jugar.
function playAgain() {
  confirm('Do you want to play again?') ? playGame() : alert("Ok, bye!")
}

// 15. Función que informa de los puntos obtenidos y muestra el ranking.
function setRanking() {
  let points = 90 - numberOfPlays;
  if(name === "") {
    name = "anonymous"
  }
  console.log(name + ", you scored " + points + " points!")
  ranking.push({name: name, points: points})
  ranking.sort((a, b) => b.points - a.points)
  let counter = 1;
  console.log("Ranking:")
  for(let i in ranking) {
    console.log(`${counter}: ${ranking[i].name || "anonymous"} => ${ranking[i].points} points`)
    counter++;
  }
}

// 16. Función principal que inicia de principio a fin el juego de Bingo.
function playGame() {
  setInitializeVariables() //inicializar variables y rellenar bombo
  greetUser() //pregunta el nombre y saluda al usuario
  let bingoCard = chooseBingoCard() // elige carton para jugar
  if(playUntilLine(bingoCard)) { //juega hasta linea
    playUntilBingo(bingoCard) //juega hasta bingo
  }
  setRanking(); //informa de los puntos obtenidos y muestra el ranking.
  playAgain(); //volver a jugar
};
playGame()
