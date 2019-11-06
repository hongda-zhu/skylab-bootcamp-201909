var LISTA_NUMS = [];
  for (var i = 1; i<100; i++) {
    LISTA_NUMS.push(i);
  }

function Number(){
    var index = Math.floor(Math.random()*LISTA_NUMS.length)
    this.number = LISTA_NUMS[index];
    LISTA_NUMS.splice(index,1);
    this.matched = false
}

function Player (){
  this.name = prompt("Introduce tu nombre: ","Jose");
  this.score = 0;
}

function createBingoCard () {
  var bingoCard = [[],[],[]]
  for (var i=0; i<bingoCard.length; i++) {
    for (var j=0; j<5; j++){
      bingoCard[i][j] = new Number();
    }
  }  
  return bingoCard;
}

function showCard(bingoCard) {
  var str = "";
  for (var i=0; i<bingoCard.length; i++) {
    for (var j=0; j<5; j++){
      if (bingoCard[i][j].matched){
        str += " " + "X";
      } else {
        str += " " + bingoCard[i][j].number;
      }
    }
    console.log(str + '\n');
    str = "";
  }
}

function createBombo () {
  var bombo = [];
  for (var i=1; i<100; i++) {
    bombo.push(i);
  }
  return bombo;
}

function getBomboNumber (bombo) {
  var randomNum = Math.floor(Math.random()*bombo.length);
  var selectedNumber = bombo.splice(randomNum -1,1);
  return selectedNumber;
}

function hayMatch (bingoCard,selectedNumber) {
  for (var i=0; i<bingoCard.length; i++) {
    for (var j=0; j<5; j++){
      if (selectedNumber[0] === bingoCard[i][j].number) { 
        console.log(`HAY CONICIDENCIA CON EL ${bingoCard[i][j].number}!!`)
        bingoCard[i][j].matched = true;
        } 
    } 
  }
  return bingoCard;
}

function cantalinea (bingoCard) {
 for (var i=0; i<bingoCard.length; i++) {
    var linia = true;
    for (var j=0; j < 5; j++) {
      if(!bingoCard[i][j].matched) {
        linia = false; 
      } 
    }
    if (linia === true) {
      return true;
    } 
  }
  return false; 
}


function cartonCompleto(bingoCard) {
  for (var i=0; i<bingoCard.length; i++) {
    for (var j=0; j < 5; j++) {
      if(!bingoCard[i][j].matched) {
        return false;
      } 
    }
  }
  return true;
}


function playBingo() {
  var ranking = [];
  var continuePlaying = true;
  var endGame = false;

  while (continuePlaying) {
    player = new Player();
    console.log(`Bienvenido a Skylab Bingo ${player.name}!! Para empezar, partes con 100 puntos. Por cada ronda jugada, perderás un punto. Estas listo?`)
    var noHayLinea = true;
    var bingoCard = createBingoCard();
    showCard(bingoCard);
    while (!confirm("Este es el carton con el que vas a jugar, estas de acuerdo?: YES")) {
      bingoCard = createBingoCard();
      showCard(bingoCard);
    }
    var bombo = createBombo();
    var selectedNumber;
    var turno = 0;
        while (!cartonCompleto(bingoCard) && !endGame) {  
          if (confirm("¿Quieres iniciar un nuevo turno?: YES")) {//devuelve true o false
            turno++; 
            selectedNumber = getBomboNumber(bombo);  //obtener el número del bombo
            console.log(`Ha salido el ${selectedNumber}!!!`)
            bingoCard = hayMatch(bingoCard,selectedNumber);
            showCard(bingoCard); //verificar si el número obtenido coincide con alguno del carton.
            if(noHayLinea) {
              var hayLinea = cantalinea(bingoCard)
              if(hayLinea){
                console.log("HAN CANTADO LINEA!!!")
                noHayLinea = false;
              }
            } 
          } else {
            endGame = true;
          }
        }
        
        if (cartonCompleto(bingoCard)) {
          console.log("BINGO!!! HAN CANTADO BINGO!!!");
          console.log(`Has finalizado en ${turno} turnos!`)
          player.score = 100 - turno;
          console.log (`tu puntuacion es de: ${player.score} puntos!`)
          ranking.push(player);
          ranking.sort(function(a,b){return b.score-a.score})
          console.log("Este es el ranking actual: ")
          for (var i=0; i<ranking.length; i++) {
          console.log(`En ${i+1}º puesto: ${ranking[i].name} -> ${ranking[i].score} puntos.`)  
          }
          console.log ("Gracias por jugar a SkylabBingoooo!!")
        
        }
        if (confirm("Quieres volver a jugar?: YES")) {
         continuePlaying = true;
         endGame = false;
        } else {
          continuePlaying = false;
        }
  }
}
playBingo();
