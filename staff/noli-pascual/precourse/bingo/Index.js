let bingoCard = [];//Aquí guardaré el objeto cartón
let numbers = []; // Aquí guardaré los números para rellenar el cartón.
let bomboNumbers = []; // Números del bombo
let teamScores = []; 
let player;
let jugadas = 0;
let bingos = 0;
let lineas = 0;

function bingo() {
    
    const jugar = confirm(`Bienvenido al BINGO Skylab, quiere jugar?`);

    if(jugar) {

        function empezar() {

            player = prompt('Cómo se llama?');

            if(player) {
            alert('Ésta es la normativa de puntos: \r  Bingo en 43 o menos jugadas: 10 puntos. \r  Bingo entre 44 y 47 jugadas: 6 puntos. \r  Bingo en más de 47 jugadas: 3 puntos.  \r  Bingo sin completar: 0 puntos.');
            setGame();
            function confirmCards() {
            const confirmCarton = prompt('Éste es su cartón, está seguro de que lo quiere? YES / NO');
            switch(confirmCarton) {
                case 'YES':
                case 'yes': 
                turno();
                break;
                case 'NO':
                case 'no':
                resetGame(); confirmCards();
                break;
                default: resetGame();confirmCards();                
            }
            }      
            confirmCards();  
            }

            else if(player === null) {
            alert('Debe especificar su nombre');
            empezar();
            }  

            else {
            alert('Debe especificar su nombre');
            empezar();
            }  
            }
        
        empezar();
          
    }
    else {
        alert('Hasta luego');
        ranking();
    }
}

bingo();

//factory function para crear el cartón
function Card() {
    return {
        number: randomCard(),
        matched: false
    }
}
//crear el cartón
function createCard() {
    for(i = 0; i < 15; i++) {
        const bingoCardItem = new Card();
        bingoCard.push(bingoCardItem);
    }
}

//vaciar el cartón
function emptyCard() {
    bingoCard.splice(0,bingoCard.length);
}

//limpiar y llenar de nuevo los array para nutrir el cartón y el bombo.
function vaciarArr(arr) {
    arr.splice(0,arr.length);
}
function llenarArr(arr,min,max) {
    for(i = min; i< max; i++) {
        arr.push(i);
    }
}

//Shuffle arrays (bombo y carton):
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//Mostrar cartón

function showBingoCard() {
    //llenamos array de los números escogidos:
    let arr = [];
    bingoCard.forEach(item =>{
        arr.push(item.number);
    })
    console.log('ÉSTE ES TU CARTÓN:\n' + arr.slice(0,5).join(',') + '\n' + arr.slice(5,10).join(',') +'\n' + arr.slice(10,15).join(','));
    
}


//empezar el juego (llenar los arrays, shuffle y crear cartón)
function setGame() {
    console.clear();
    llenarArr(numbers,1,50);
    shuffleArray(numbers);
    llenarArr(bomboNumbers,1,50);
    shuffleArray(bomboNumbers);
    createCard();
    showBingoCard();
    jugadas = 0;
    bingos = 0;
  
}
//resetearlo (en caso de que no quiera ese cartón)
function resetGame() {
    console.clear();
    jugadas = 0;
    bingos = 0;
    lineas = 0;
    vaciarArr(numbers);
    vaciarArr(bomboNumbers);
    emptyCard();
    llenarArr(numbers,1,50);
    shuffleArray(numbers);
    llenarArr(bomboNumbers,1,50);
    shuffleArray(bomboNumbers);
    createCard();
    showBingoCard();
    
}

// generar un random para llenar el cartón:
function randomCard() {
    
    var index = Math.floor((Math.random() * numbers.length)); 
    var random = numbers[index];
    numbers.splice(index,1);
    return random;
}  
//generamos random para escoger del bombo
function randomBombo() {
    
    shuffleArray(bomboNumbers);//removemos el bombo
    var indexBombo = Math.floor((Math.random() * bomboNumbers.length)); 
    var randomBomboNumber = bomboNumbers[indexBombo];
    bomboNumbers.splice(indexBombo,1);//eliminamos el escogido del array para que no vuelva a salir
    return randomBomboNumber;
}
//Turno o jugada
function turno() {
    
    console.clear();  
    jugadas ++;
    const num = randomBombo();
    const indexCrear = bingoCard.findIndex(item => {
    return item.number === num;
    });
    
    //si el indice random extraido no existe en el cartón:
    if(indexCrear === -1) {
        
        showBingoCard();
        console.log('Random Number is ' + num);
        console.log('Ninguna coincidencia...');
        
        
    }
    //Si existe:
    else {
        
        bingoCard[indexCrear].number = 'X';  
        bingoCard[indexCrear].matched = true;
        showBingoCard();
        console.log('Random Number is ' + num);
        console.log('1 acierto!');
        
        
    }
    //comprobamos si hay línea o bingo.
    checking();
    
}  

//comprobaciones linea y bingo
function checking() {
    //si hace bingo
    checkBingo();
    
    if(lineas === 0) {
        checkLinea();
    }
    if(bingos === 0) {
        deseaSeguir(); 
    }         
     
}

function checkBingo() {
    const cardNumbers = bingoCard.every(item => {
        return item.number === 'X';
    })
    if(cardNumbers) {
        bingos ++;
        alert(`BINGO!!! ${player}, has completado el Bingo en ${jugadas} jugadas.`);
        createScore(); 
        
        alert(`Resultado de ${player}: BINGO en ${jugadas} jugadas.`);
        emptyCard();
        vaciarArr(numbers);
        vaciarArr(bomboNumbers);              
        bingo();
    }
}




function checkLinea() {
   
    let lineaOne = bingoCard.slice(0, 5);
    const isLineaOne = lineaOne.every(item => {
        return item.number === 'X' && item.matched === true;
    })
    let lineaTwo = bingoCard.slice(5, 10);
    const isLineaTwo = lineaTwo.every(item => {
        return item.number === 'X' && item.matched === true;
    })
    let lineaThree = bingoCard.slice(10, 15);
    const isLineaThree = lineaThree.every(item => {
        return item.number === 'X'&& item.matched === true;
    })
    
        if(isLineaOne) {
        alert('Han Cantado Línea');
        lineas ++;
        }
        else if(isLineaTwo) {
        alert('Han Cantado Línea');
        lineas ++;
        }
        else if(isLineaThree) {
        alert('Han Cantado Línea');
        lineas ++;
        }
    
}



//preguntar nuevo turno
function deseaSeguir() {
    const nuevoTurno = confirm('Desea jugar un nuevo turno??');
    if(nuevoTurno) {
        turno(); 
    }
    else {
        
        createScore();
        const isBingo = teamScores.findIndex(item => {
            return item.bingos === 0;
        })
        if(isBingo === -1) {
            ranking();
        }
        else {
            alert('No has completado un bingo: 0 puntos.');
            alert('Hasta luego');
            ranking();
            bingo();
        }
    }
}

//RANKING. 
//factory function para crear la puntuación del jugador
function Scores(player,jugadas) {
    return {
        player: player,//global
        jugadas: jugadas,//global
        bingos: bingos,
        get points() {
            if(this.bingos === 0) {
                return 0;
            }
            else{
                if(this.jugadas <= 43) {
                return 10;
                }
                else if(this.jugadas <=47 & this.jugadas > 43) {
                return 6;
                }
                else if(jugadas > 47) {
                return 3;
                }
            }
        },
        
    }
}
//creamos puntuación jugador actual
function createScore() {
    const currentScore = new Scores(player,jugadas);
    //return currentScore;
    teamScores.push(currentScore);
}

//mostrar ranking de puntos al finalizar:
function ranking() {
    console.clear();
    console.log('RANKING Bingo Skylab:');
    
    const orderedScores = teamScores.sort(function(a,b) {
        if (a.jugadas > b.jugadas) {
            return 1;
          }
          if (a.jugadas < b.jugadas) {
            return -1;
          }

          // a must be equal to b
          return 0;
    })
    orderedScores.forEach(item => {
        
        console.log(`${item.player} Num. jugadas: ${item.jugadas}, total ${item.points} puntos.`);
    });
    
}
