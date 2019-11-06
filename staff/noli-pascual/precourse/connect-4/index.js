//Areas

let welcome = document.getElementById('welcome');
let results = document.getElementById('results');

let tableroContainer = document.getElementById('tableroContainer');
let board = document.getElementById('tablero')
let turnoJugador = document.getElementById('turnoJugador');
let coloresJugadores = document.getElementById('coloresJugadores');
let avatars = document.getElementById('avatars');
let jugadorRojo = document.getElementById('jugadorRojo');
let jugadorAmarillo = document.getElementById('jugadorAmarillo');


//Botones
let playButton = document.getElementById('play');
let salir = document.getElementById('salir');
let login = document.getElementById('login');
let loginForm = document.getElementById('login-form');
let puntuaciones = document.getElementById('puntuaciones');


//DISPLAY SI DE UN ELEMENTO DOM
function aparecer(elem) {
    if(elem.style.display = "none") {
        
        elem.style.display = "flex";
    }
}

//DISPLAY NO
function desaparecer(elem) {
    elem.style.display = "none";
}

//celdas
let celdasCollection = document.getElementsByClassName('celda');
let celdas = Array.from(celdasCollection);

//columnas

let colsCollection = document.getElementsByClassName('col');
let cols = Array.from(colsCollection);

//array bidimensional 

let colsArrays = [];
cols.forEach(col => colsArrays.push(Array.from(col.children)));

//creamos tablero

let tablero = [];
let arr = [];//temp

function createFila(index) {
    colsArrays.forEach(col => {
        arr.push(col[index])
     
    })
    tablero.push(arr);
    arr = [];
}

for(i = 0; i < 6; i++) {
    createFila(i);
}


//style tablero
function iniciarTablero() {
    desaparecer(welcome);
    tableroContainer.style.display = "flex";
    /* board.style.width = '80%';
    board.style.minHeight = '250px'; */
    board.style.maxWidth = '580px';
    board.style.maxHeight = '400px';
    
 
    celdas.forEach(item => {
        item.style.width = '98%';
        item.style.height = '10vh';      
        item.value = 0;
        item.style.backgroundColor = '#ffffff';
        item.style.color = '#ffffff';
    });
    
    
    playerOne.jugadas = 0;
    playerTwo.jugadas = 0;
    fichasDiagonales = [];
    
}
function resetTablero() {
  
    celdas.forEach(item => {
        /* item.style.width = '50px'; */
        
        item.style.backgroundColor = '#ffffff';
        item.style.color = '#ffffff';
        item.value = 0;
        });
}

let currentPlayer;
let user1 = '';
let user2 = '';
let playerOne;
let playerTwo;
let partidaFinalizada = 0;

//Factory para crear jugador:
function Player(name, fichas, color, letra, img) {
    return {
        name,
        fichas,
        color,
        letra,
        jugadas: 0,
        puntos: 0,
        img,

        setBackground(celda) {
            celda.style.backgroundColor = this.color;
        },

        setAvatar() {
            
            let name = document.createElement('div');
            name.setAttribute('id', this.name)
            name.textContent = this.name;
            coloresJugadores.appendChild(name);

            let avatar = document.createElement('img');
            avatar.setAttribute('src', this.img);
            avatar.setAttribute('id', this.color);
            avatar.style.opacity = '0.3';
            coloresJugadores.appendChild(avatar);
                        
        },

        isFinished() {
            if(this.jugadas === 21) {
                return true;
            }
            else {
                return false;
            }
        },
                
        empty() {
            this.name = '';
            this.jugadas = 0;
        },
        
    }
}


function asignarJugadores() {
    user1 = document.getElementById('user1').value;
    user2 = document.getElementById('user2').value;

    if(user1 === '') {
        document.getElementById('user1').focus();
    }
    if(user2 === '') {
        document.getElementById('user2').focus();
    }
    playerOne = new Player(user1,'ROJAS', 'red', 'R', 'avatarRojo.png');
    playerTwo = new Player(user2, 'AMARILLAS', 'yellow', 'A','avatarAmarillo.png');
    
    closeLogin();
    
}


function setCurrentPlayer() {
    currentPlayer = playerOne;
    
}

//EMPEZAR A JUGAR

playButton.addEventListener('click', conecta4);

function conecta4() {
    
    if(isLogin()) {
        playButton.innerHTML = 'Play Again';
        
        iniciarTablero();
        partidaFinalizada = 0;
        setCurrentPlayer();
       
        changeAvatar();
        
    }
    else {
        modalPlay.style.display = 'block';
    }
    
} 



function turno() {
    
    paintFirstInColumn();
    checkConectaVertical();
    checkConectaHorizontal();
    checkConectaDiagonal();
    
    currentPlayer.jugadas ++;
    displayResult();
    
    changePlayer();
    changeAvatar();
}

function displayResult() {
     
    if(playerOne.jugadas === 21 && playerTwo.jugadas === 21) {
        if(partidaFinalizada === 0) {
            
          resultados.textContent = 'PARTIDA NULA';
          modalResults.style.display = 'block';
        }
    }
    else {
        if(partidaFinalizada) {
            resultados.textContent = 'Punto para ' + currentPlayer.name;
            modalResults.style.display = 'block';
        }
    }
}

function changePlayer() {
    if(currentPlayer === playerOne) {
        
        currentPlayer = playerTwo;
    }
    else {
        currentPlayer = playerOne;
    }
}

function changeAvatar() {
    let redAvatar = document.getElementById('red');
    let yellowAvatar = document.getElementById('yellow');

    if(currentPlayer.color === 'yellow') {
        redAvatar.style.opacity = '0.2';
        yellowAvatar.style.opacity = '1';
        
    }
    else {
        redAvatar.style.opacity = '1';
        yellowAvatar.style.opacity = '0.2';
    }
}
   

let colActiva;//la columna que clicamos
let numCol;
let isColActivaEmpty;

cols.forEach(item =>{
    item.addEventListener('mouseover', function () {
        item.style.opacity = '0.3';
    })
    item.addEventListener('mouseout', function () {
        item.style.opacity = '1';
    })
})

cols.forEach(item => {
    item.addEventListener('click', function activarColumna() {
        
        numCol = this.id;
        
        colActiva = Array.from(item.children);
        
        function isNull(cell) {
            return cell.value === '0';
        }
        isColActivaEmpty = colActiva.some(isNull);
      
        if(partidaFinalizada === 0) {
            if(isColActivaEmpty) {
                if(!currentPlayer.isFinished()) {
                    turno();
                    
                }
                    
            }    
        }
               
    })

})
    
function paintFirstInColumn() {
    
    let cellToChange = colActiva.find(cell => cell.value === '0');
    
    if(cellToChange !== undefined) {
        cellToChange.value = currentPlayer.letra;
        cellToChange.style.color = currentPlayer.color;
        cellToChange.style.backgroundColor = currentPlayer.color;
      
    }
    
}

let fourConected = [];
function paintCombination() {
    fourConected.forEach(cell => {
        cell.style.backgroundColor = "black";
        cell.style.color = "black";
    });
}

//BUSQUEDA CONECTA 4 EN LAS COLUMNAS

let indexFichaActual;

function checkConectaVertical() {

    indexFichaActual = colActiva.findIndex(cell => cell.value === currentPlayer.letra);
    fourConected = [colActiva[indexFichaActual], colActiva[indexFichaActual + 1] , colActiva[indexFichaActual + 2] , colActiva[indexFichaActual + 3]]    
    if(indexFichaActual <= 2) {

        if(colActiva[indexFichaActual + 1].value === currentPlayer.letra && colActiva[indexFichaActual + 2].value === currentPlayer.letra && colActiva[indexFichaActual + 3].value === currentPlayer.letra) {
            
            paintCombination();
            currentPlayer.puntos ++;
            partidaFinalizada ++;
            
        }
    }
}

//BUSQUEDA CONECTA 4 EN LAS FILAS
let filActiva = [];

let firstIndexFila;

function checkConectaHorizontal() {
        filActiva = [];//inicializamos cada vez
    
        for(let i = 0; i < 7; i++) {
            filActiva.push(tablero[indexFichaActual][i]);
        }

        firstIndexFila = filActiva.findIndex(cell => cell.value === currentPlayer.letra)
        fourConected = [filActiva[firstIndexFila], filActiva[firstIndexFila + 1] , filActiva[firstIndexFila + 2] , filActiva[firstIndexFila + 3]] 
        
        if(firstIndexFila <= 3) {
            if(filActiva[firstIndexFila + 1].value === currentPlayer.letra && filActiva[firstIndexFila + 2].value === currentPlayer.letra && filActiva[firstIndexFila + 3].value === currentPlayer.letra) {
                
                paintCombination();
                currentPlayer.puntos ++;  
                partidaFinalizada ++;  
        }
    }
    
}

//BUSQUEDA CONECTA 4 EN DIAGONALES
let indexV;
let indexH;

let fichasDiagonales = [];

function changeCombinationDiagonal (elem)  {
    elem.style.backgroundColor = 'black';
    elem.style.color = 'black';
}

function checkConectaDiagonal() {
    
    indexV = colActiva.findIndex(cell => cell.value === '0') -1;
    indexH = parseInt(numCol);
    fichasDiagonales = [1];

    diagDchAba();
    diagIzqAba();
    diagDchArr();
    diagIzqArr();

    if(fichasDiagonales.length === 4) {
        partidaFinalizada ++;
    }

    function diagIzqArr() {
        if(tablero[indexV + 1] !== undefined && tablero[indexH -1] !== undefined) {
            if(tablero[indexV + 1][indexH - 1].value === currentPlayer.letra) {
                fichasDiagonales.push(1);
                
            
                if(tablero[indexV + 2] !== undefined && tablero[indexH - 2] !== undefined) {
                    if(tablero[indexV + 2][indexH - 2].value === currentPlayer.letra) {
                        fichasDiagonales.push(1);
                        
    
                        if(tablero[indexV + 3] !== undefined && tablero[indexH -3] !== undefined) {
                            if(tablero[indexV + 3][indexH - 3].value === currentPlayer.letra) {
                                fichasDiagonales.push(1);
                                
                              
                            }
                        } 
                    }
                }
            }    
        }
        
       
    }
    function diagDchAba() {

        if(tablero[indexV -1] !== undefined && tablero[indexH +1] !== undefined) {
            if(tablero[indexV - 1][indexH + 1].value === currentPlayer.letra) {
                fichasDiagonales.push(1);
                
            
                if(tablero[indexV - 2] !== undefined && tablero[indexH + 2] !== undefined) {
                    if(tablero[indexV - 2][indexH + 2].value === currentPlayer.letra) {
                        fichasDiagonales.push(1);
                       
    
                        if(tablero[indexV - 3] !== undefined && tablero[indexH + 3] !== undefined) {
                            if(tablero[indexV - 3][indexH + 3].value === currentPlayer.letra) {
                                fichasDiagonales.push(1);
                                
                              
                            }
                        } 
                    }
                }
            }    
        }

    }
    function diagIzqAba() {
        if(tablero[indexV -1] !== undefined && tablero[indexH - 1] !== undefined) {
            if(tablero[indexV - 1][indexH - 1].value === currentPlayer.letra) {
                fichasDiagonales.push(1);
                
            
                if(tablero[indexV - 2] !== undefined && tablero[indexH - 2] !== undefined) {
                    if(tablero[indexV - 2][indexH - 2].value === currentPlayer.letra) {
                        fichasDiagonales.push(1);
                        
    
                        if(tablero[indexV - 3] !== undefined && tablero[indexH - 3] !== undefined) {
                            if(tablero[indexV - 3][indexH - 3].value === currentPlayer.letra) {
                                fichasDiagonales.push(1);
                                
                                
                            }
                        } 
                    }
                }
            }    
        }

    }
    function diagDchArr() {
        if(tablero[indexV +1] !== undefined && tablero[indexH + 1] !== undefined) {
            if(tablero[indexV + 1][indexH + 1].value === currentPlayer.letra) {
                fichasDiagonales.push(1);
              
            
                if(tablero[indexV + 2] !== undefined && tablero[indexH + 2] !== undefined) {
                    if(tablero[indexV + 2][indexH + 2].value === currentPlayer.letra) {
                        fichasDiagonales.push(1);
                       
    
                        if(tablero[indexV + 3] !== undefined && tablero[indexH + 3] !== undefined) {
                            if(tablero[indexV + 3][indexH + 3].value === currentPlayer.letra) {
                                fichasDiagonales.push(1);
                                
                               
                            }
                        } 
                    }
                }
            }    
        }

    }    
}

//MODALES

// MODAL login FORM
let modalForm = document.getElementById("modalForm");
let closeForm = document.getElementById('closeForm');

function isLogin() {
    if (user1 === '' && user2 === '') {
        return false;
    }
    else {
        return true;
    }
 }
 
 function closeLogin() {
    if(isLogin()) {
        modalForm.style.display = 'none';
    }
    
    playerOne.setAvatar();
    playerTwo.setAvatar();
 
 }

login.addEventListener('click', registro);

function registro() {
    
    modalForm.style.display = "block";
    
}

closeForm.addEventListener('click', closeLogin);

//Modal stop
let modalStop = document.getElementById("modalStop");

let siButton = document.getElementById('si');
let noButton = document.getElementById('no');

function parar() {
    modalStop.style.display = "block";
}

salir.addEventListener('click', parar);

siButton.addEventListener('click', function(e) {
    e.preventDefault();
    user1 = '';
    user2 = '';
    modalStop.style.display = 'none';
 
    reset();
})

noButton.addEventListener('click', function() {
    modalStop.style.display = 'none';
});

//Modal play button

let modalPlay = document.getElementById("modalPlay");
let closePlay = document.getElementById('closePlay');

closePlay.addEventListener('click', function() {
    modalPlay.style.display = 'none';
})

//Modal resultado partida
/* let resultadoPartida = document.getElementById('resultadoPartida'); */
let modalResults = document.getElementById("modalResults");
let closeResults = document.getElementById('closeResults');

closeResults.addEventListener('click', function() {
    modalResults.style.display = 'none';
})


//VACIAR PARA LA SIGUIENTE PARTIDA      
function reset() {
    
    aparecer(welcome);
   
    loginForm.reset();
    playerOne = {};
    playerTwo = {};
    resetTablero(); 
    playButton.innerHTML = 'PLAY';
    fichasDiagonales = [];
    partidaFinalizada = 0;
    removeAvatar();
    tableroContainer.style.display = "none";
  
}  


function removeAvatar() {
          
    var firstChild = coloresJugadores.firstElementChild; 
        while (firstChild) { 
        firstChild.remove(); 
        firstChild = coloresJugadores.firstElementChild; 
        } 
}
/*var p = document.getElementById('queue');
for (var i=0; i<p.childNodes.length; i++) {
    if (p.childNodes[i].tagName=='LI') {
        p.removeChild(p.childNodes[i]);
        break;
    }
 }
*/


let modalRanking = document.getElementById('modalRanking');
let closeRanking = document.getElementById('closeRanking');
let puntuacionJugador1 = document.getElementById('puntuacionJugador1');
let puntuacionJugador2 = document.getElementById('puntuacionJugador2');

function mostrarRanking() {
    puntuacionJugador1.textContent = playerOne.name + ': ' + playerOne.puntos;
    puntuacionJugador2.textContent = playerTwo.name + ': ' + playerTwo.puntos;
    modalRanking.style.display = 'block';
}

puntuaciones.addEventListener('click', mostrarRanking);

closeRanking.addEventListener('click', function() {
    modalRanking.style.display = 'none';
})
