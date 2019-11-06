var playerName = " ";
var randomNumber = 0;
var bingoCard = [];
var userData = [];
let bingoN = 15;
let card = [];
var cardComplete = false;
var maxN = 100;
var endGame = false;
var turn = 0;
var score = 0;
var p = 0;
var totalScore = 0;



function randomBall (){ //generates for me an array integer from 1 to 100
    
    var rndI = Math.floor(Math.random()* rndBalls.length);
    var rndRoll = rndBalls[rndI];
    var rndV = rndBalls.splice(rndI, 1);
    return rndRoll;
    
}

var rndBalls = []; var bingoBalls = [];
for(i=1; i<101; i++) {
rndBalls.push(i);
bingoBalls.push(i);
}


function arrayInt(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}

var aCard = arrayInt(bingoBalls);

function cardGen(array){
    
    for (let i = 0; i < bingoN; i++){
        bingoCard[i] = { number: array[i], matched: false };
    }      
    

return bingoCard;

}

var bingoCard = cardGen(aCard);

function userName(){
    playerName = prompt("Por favor introduzca su nombre"); //prompt player name
    

}

function UserMark(){
    
    userData[p] = { player: playerName, turns: turn, points: score, Tscore: function() { console.log(this.points /this.turns); } }

}


function cContinue(){ //el programa deberá preguntar al usuario al inicio de cada turno, si desea continuar, en el  caso que continue seguirá el mismo patrón hasta el momento
var canContinue = confirm("Desea continuar?");//following turn player deberá usar confirm(), visualizándose otro número, si coincide con alguno de los numeros anteriores cambiará por una X
if (canContinue) {
    turn += 1;
    newTurn();
}
}



function finishGame(array){
// evitar que finish game se auto active

if(TopLine(array) === true && MidLine(array) === true && BottLine(array) === true){
    
    var canContinue = confirm("Queridos residentes de Casa Tranquila, el bingo ha terminado, acaso desean continuar?");
    if (canContinue) {
        /*aCard = [];
        for (var i = 0; i <= bingoN; i++) {	
            aCard.push(arrayInt(maxN, 1));
        }*/
        aCard = [ ];
        aCard = arrayInt(bingoBalls);
        p += 1;
        bingoCard = cardGen(aCard);
        bingo ();

    } else {
        p += 1;
        console.log("Gracias por venir, no olviden dejar una propina en la bandeja de donaciones");

    }
    

}else if(TopLine(array) === false && MidLine(array) === false && BottLine(array) === false){

}
    
}


function TopLine(array){
    if(array[0] === 'X' && array[1] === 'X' && array[2] === 'X' && array[3] === 'X' && array[4] === 'X'){
        /*console.log ("Línea superior");*/
        
        return true;
}
}

function MidLine(array){
    if(array[5] === 'X' && array[6] === 'X' && array[7] === 'X' && array[8] === 'X' && array[9] === 'X'){
        /*console.log ("Línea centro")*/
        
        return true;
}
}

function BottLine(array){
    if(array[10] === 'X' && array[11] === 'X' && array[12] === 'X' && array[13] === 'X' && array[14] === 'X'){
        /*console.log ("Línea inferior")*/
        
        return true;
}
}

function askTurn(array){
         
        if(TopLine(array) === true && MidLine(array) === true && BottLine(array) === true){ //cuando todos los números de una misma línea sean igual a X, mostrará un mensaje de Línea
            console.log("Bingo")
            UserMark();
            finishGame(array);
            /*return finishGame;*/ //finish the game when the 15 are X

        } else {

        } 
    
        
        if(array[0] !== 'X' || array[1] !== 'X' || array[2] !== 'X' || array[3] !== 'X' || array[4] !== 'X'){
            cContinue();

        } else if(array[5] !== 'X' || array[6] !== 'X' || array[7] !== 'X' || array[8] !== 'X' || array[9] !== 'X'){
            cContinue();

        } else if(array[10] !== 'X' || array[11] !== 'X' || array[12] !== 'X' || array[13] !== 'X'|| array[14] !== 'X'){
            cContinue();
        }
    }

    

function newTurn(){ //1st turn muestra un cartón con 15 números, (nunca 0)
   
/*var rollNumber = arrayInt(maxN, 1);*/
var rollNumber = randomBall();

if(TopLine(aCard) === true){
    console.log ("Línea superior completada");
}
if(MidLine(aCard) === true){
    console.log ("Línea centro completada")
}
if(BottLine(aCard) === true){
    console.log ("Línea inferior completada")
}
console.log("El siguiente número es el " + rollNumber);
checkRNumber(aCard, rollNumber);
bingoCard = cardGen(aCard);
displayNumbers(bingoCard);
askTurn(aCard);

}

function checkRNumber(array, number){ //modifyAndShowCarton()

    for (var i = 0; i < array.length; i++) {
		if (array[i] === number) {
            array.splice(i,1,'X');
            score += 1000/(1+turn);
            			
		} else {
            console.log(" Continuamos con el sorteo ");
            
        }
			
	} 
	return array
}

function displayNumbers(array){
    console.log(playerName + " a continuación os mostramos los números en juego");//el cartón se muestra al final de cada turno con los cambios efectuado, indicando al usuario que número se ha encontrado
        console.log(array[0].number + " - " + array[1].number + " - " + array[2].number + " - " + array[3].number + " - " + array[4].number);
        console.log(array[5].number + " - " + array[6].number + " - " + array[7].number + " - " + array[8].number + " - " + array[9].number);
        console.log(array[10].number + " - " + array[11].number + " - " + array[12].number + " - " + array[13].number + " - " + array[14].number);
    
}

function ChangeNumbers(array){
    console.log(playerName + " a continuación os mostramos los resultados del sorteo");//el cartón se muestra al final de cada turno con los cambios efectuado, indicando al usuario que número se ha encontrado
        console.log(array[0].number + " - " + array[1].number + " - " + array[2].number + " - " + array[3].number + " - " + array[4].number);
        console.log(array[5].number + " - " + array[6].number + " - " + array[7].number + " - " + array[8].number + " - " + array[9].number);
        console.log(array[10].number + " - " + array[11].number + " - " + array[12].number + " - " + array[13].number + " - " + array[14].number);
       
        var text;
        var chooseOP = prompt("Desea continuar jugando con estos números?", "Only Yes/No");
        switch(chooseOP) {

        case "Yes":
            displayNumbers(bingoCard);
            newTurn();

            break;

        case "No":
            
            /*aCard = [];
            for (var i = 0; i <= bingoN; i++) {	
	            aCard.push(arrayInt(maxN, 1));
            }*/
            aCard = [ ];
            aCard = arrayInt(bingoBalls);
            bingoCard = cardGen(aCard);
            cardGen(aCard);
            ChangeNumbers(bingoCard);
            

            break;

}

    
}

     
function displayScore(array){
    console.log(playerName + " a continuación os mostramos las puntuaciones del juego");//el cartón se muestra al final de cada turno con los cambios efectuado, indicando al usuario que número se ha encontrado
     
    for (let i = 0; i < array.length; i++){
        var totalSc = array[i].points/array[i].turns;
        var orderScore = array.slice(0);
        orderScore.sort(function(a, b){
            return b.points - a.points;
        });
        var totalScO = Math.round((orderScore[i].points/orderScore[i].turns)*100); 
        /*console.log(" - " + array[i].player + " completado en  " + array[i].turns + " turnos con la obtención de " + array[i].points + " puntos y con una marca total de " +  parseFloat(totalSc).toFixed(2).replace(/0+$/,'')+ " - ");*/
        console.log(" - " + orderScore[i].player + " completado en  " + orderScore[i].turns + " turnos con la obtención de " + Math.round(orderScore[i].points) + " puntos y con una marca total de " + totalScO + " - ");
    }      
    
}

function bingo () {
turn = 0;
score = 0;
bingoBalls = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];
aCard = [ ];
aCard = arrayInt(bingoBalls);    
displayScore(userData);    
userName();
cardGen(aCard);
ChangeNumbers(bingoCard);

};

bingo ();







//cuando el juego concluya deberá decirle al usuario  en cuantos turnos has completado el cartón, y si desea volver a jugar