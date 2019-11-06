var panel = new Array(7).fill(-1).map(() => new Array(6).fill(-1));
var currentPlayer = 0;
var racha = [0,0];
var enemy=(currentPlayer+1)%2;
var asideElem= document.getElementsByTagName("aside");
var readyComplete=[false,false];
var panelComplete=0;
var ranking=JSON.parse(localStorage.getItem("rankingConecta4"));
var slideIndex = 1;
var sound = document.getElementById("snd");
var vsmachine = false;
var players=[];

console.table(panel);

function Player (nombre) {
    this.name = nombre,
    this.wins = 0,
    this.loses = 0,
    this.ties = 0,
    this.best = 0,
    this.avatar = slideIndex-1;
}

function deslizarFicha(idCol){
    var col=parseInt(idCol[3]);
    var fil = panel[col].lastIndexOf(-1);
    var fichas = document.getElementById(idCol).children;
    var classPlayer = "fichaPlayer"+currentPlayer;

    panel[col][fil]=currentPlayer;
    fichas[fil].className=classPlayer;
    if (fil===0) {    
        //la columna está llena, desactivar el onClick;
        document.getElementById(idCol).removeAttribute("onclick");
        panelComplete++;
    }
    console.table(panel);
    if (comprobarCuatro(col,fil)) {
        endGame();
    }

    if (panelComplete>=7){
        endGame(true);
    } else {
        changePlayer();
        if (vsmachine && currentPlayer === 1) {
            while(panel[col][0]!=-1) { 
                col = (col+1)%7;
            }
            playMachine(col);
        }
    }
}

function playMachine (col) {
    var i = Math.floor(Math.random()*3);
    var prev=(col-1+7)%7;
    var post=(col+1)%7;

    while (panel[prev][0]!=-1) {
        prev=(prev-1+7)%7;
    }

    while (panel[post][0]!=-1) {
        post=(post+1)%7;
    }

    switch (i) {
        case 0:
           { deslizarFicha("col"+prev); break; }
        case 1:
           { deslizarFicha("col"+col); break; }
        case 2:
           { deslizarFicha("col"+post); break; }
    }

}

function changePlayer () {
    currentPlayer=(currentPlayer+1)%2;
    enemy=(currentPlayer+1)%2;
    asideElem[currentPlayer].style.opacity='1';
    asideElem[enemy].style.opacity='0.5';
}

function comprobarCuatro (x,y) {
    let ini, fin;
    // comprobamos si hay 4 en raya Verticalmente:

    if (y>0){
        for (let i=y; i>0; i--){
            if (panel[x][i]===currentPlayer){
                ini=i;
            } else break;
        }
    } else ini=y;

    for (let i=y; i<6;i++){
        if (panel[x][i]===currentPlayer){
            fin=i;
        } else break;
    }
    
    if (((fin-ini)+1)===4) { return true; }

    //comprobamos si hay 4 en raya Horizontalmente:
    if (x>=0){
        for (let i=x; i>=0; i--){
            if (panel[i][y]===currentPlayer){
                ini=i;
            } else break;
        }
    } else ini=y;

    for (let i=x; i<7;i++){
        if (panel[i][y]===currentPlayer){
            fin=i;
        } else break;
    }
    if (((fin-ini)+1)===4) { return true; }

    //comprovamos si hay 4 en raya Diagonales:
    var camino1=[x,y,true], camino2=[x,y,true], camino3=[x,y,true], camino4=[x,y,true];

    while (camino1[2] || camino2[2] || camino3[2] || camino4[2]) {
        if (camino1[2]){
            if( ((camino1[0]-1)>=0) && ((camino1[1]-1)>=0) && (panel[camino1[0]-1][camino1[1]-1]===currentPlayer) ) {
                camino1=[camino1[0]-1,camino1[1]-1,true];
            } else {
                camino1[2]=false;
            }
        }

        if(camino2[2]) {
            if( ((camino2[0]+1)<=6) && ((camino2[1]-1)>=0) && (panel[camino2[0]+1][camino2[1]-1]===currentPlayer) ) {
                camino2=[camino2[0]+1,camino2[1]-1,true];
            } else {
                camino2[2]=false;
            }
        }

        if(camino3[2]) {
            if( ((camino3[0]-1)>=0) && ((camino3[1]+1)<=5) && (panel[camino3[0]-1][camino3[1]+1]===currentPlayer) ) {
                camino3=[camino3[0]-1,camino3[1]+1,true];
            } else {
                camino3[2]=false;
            }
        }

        if(camino4[2]) {
            if( ((camino4[0]+1)<=6) && ((camino4[1]+1)<=5) && (panel[camino4[0]+1][camino4[1]+1]===currentPlayer) ) {
                camino4=[camino4[0]+1,camino4[1]+1,true];
            } else {
                camino4[2]=false;
            }
        }
    }
    if (((camino4[0]-camino1[0])+1) === 4) { return true; }
    if (((camino2[0]-camino3[0])+1) === 4) { return true; }
    return false;
}


showSlides(slideIndex,'player1avatar');
showSlides(slideIndex,'player2avatar');

function plusSlides(n,player) {
  showSlides(slideIndex += n,player);
}

function showSlides(n,player) {
  var i;
  var slides = document.getElementsByClassName(player);
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";
}

function go (machine) {
    document.getElementById("wellcome").style.display="none";
    
    document.getElementById("player1").style.display="flex";
    document.getElementById("player2").style.display="flex";
    if (machine) {
        vsmachine=true;
        ready('machine');
    }
    
    if ( ranking === null) {
        ranking=[];
    }
}

function ready (id) {
    
    if (id != 'machine') {
        var playerName = document.getElementById("nombre"+id).value;

        if (!playerName) {
            playerName="Anonimo "+id;
        }
          
        var player = ranking.filter(function (obj) {
            if (playerName === obj.name) { return true; }
            else return false;
        });

        if (player.length===0) {
            players[id-1] = new Player(playerName);
        } else {
            players[id-1]=player[0];
            document.getElementById("wins"+id).innerHTML = players[id-1].wins;
            document.getElementById("loses"+id).innerHTML = players[id-1].loses;
            document.getElementById("ties"+id).innerHTML = players[id-1].ties;
            document.getElementById("best"+id).innerHTML = players[id-1].best;
        }
        var slides = document.getElementsByClassName('player'+id+'avatar');
        var img = slides[players[id-1].avatar].getElementsByTagName("img");
        img = img[0].src;

        document.getElementById("player"+id).style.opacity="0.5";
        document.getElementById("name"+id).innerHTML="<h6>"+playerName+"</h6>";
        document.getElementById("avatar"+id).innerHTML = "<img src='"+img+"' style='padding-top: 10%'></img>";
        readyComplete[parseInt(id)-1]=true;
        
        if (readyComplete[0] && readyComplete[1]) {
            document.getElementById("tablero").style.display="flex";
            asideElem[currentPlayer].style.opacity='1';
            asideElem[enemy].style.opacity='0.5';
        }
        document.getElementById("ready"+id).style.display="none";
    } else {
        players[1] = new Player('BOT');
        document.getElementById("player2").style.opacity="0.5";
        document.getElementById("name2").innerHTML="<h6>EVIL BOT</h6>";
        document.getElementById("avatar2").innerHTML="<img src='./img/evilbot.png' style='padding-top: 10%'>";
        document.getElementById("ready2").style.display="none";
        readyComplete[1]=true;
    }
}

function hideFlechas (flechas) {
    for (let i=0; i<flechas.length;i++){
        flechas[i].style.transition="0s";
        flechas[i].style.visibility="hidden";
    }
}

function buscarPlayer (pl) {

    for (let i=0; i<ranking.length; i++) {
        if (ranking[i].name === pl.name) { return i };
    }
    return -1;
}

function actualizarRanking () {
    var index;
    
    for (let i=0; i<players.length;i++){
        if (players[i].name != 'EVIL BOT') {

            index = buscarPlayer (players[i]);

            if (index<0) {
                ranking.push(players[i]);
            } else {
                ranking[index] = players[i];
            }
        }
    }
}

function endGame (tie) {

    document.getElementById("endGame").style.visibility="visible";
    if (tie) {
        document.getElementById("endGameMsg").innerHTML="¿¡WTF!? ¡¡¡¡EMPATEEE!!!!"
        document.getElementById("ties"+(currentPlayer+1)).innerHTML=parseInt(document.getElementById("ties"+(currentPlayer+1)).innerHTML)+1;
        document.getElementById("ties"+(enemy+1)).innerHTML=parseInt(document.getElementById("ties"+(enemy+1)).innerHTML)+1;
        players[0].ties++;
        players[1].ties++;
    } else {
        racha[currentPlayer]=racha[currentPlayer]+1;
        document.getElementById("endGameMsg").innerHTML="PLAYER "+(currentPlayer+1)+", eres el Ganador!"
        document.getElementById("wins"+(currentPlayer+1)).innerHTML=parseInt(document.getElementById("wins"+(currentPlayer+1)).innerHTML)+1;
        document.getElementById("loses"+(enemy+1)).innerHTML=parseInt(document.getElementById("loses"+(enemy+1)).innerHTML)+1;
        players[currentPlayer].wins++;
        players[enemy].loses++;
        if (racha[currentPlayer] > document.getElementById("best"+(currentPlayer+1)).innerHTML) {
            document.getElementById("best"+(currentPlayer+1)).innerHTML=parseInt(document.getElementById("best"+(currentPlayer+1)).innerHTML)+1;
            players[currentPlayer].best++;
        }
    }
    
    actualizarRanking();
    
    localStorage.setItem("rankingConecta4", JSON.stringify(ranking));
    
}

function reiniciar (reset) {
    document.getElementById("endGame").style.visibility="hidden";
    
    reiniciarPanel();
    if (reset) { window.location.reload(); }
}

function reiniciarPanel () {

    var cols = document.getElementsByClassName("column");

    for (let i=0; i<cols.length; i++) {
        var fichas = cols[i].children;

        for (let j=0; j<fichas.length; j++) {
            fichas[j].className ="place";
        }
        cols[i].setAttribute("onclick","deslizarFicha(this.id)");
    }

    currentPlayer = 0;
    enemy=(currentPlayer+1)%2;
    panelComplete=0;
    panel = new Array (7).fill(-1).map (() => new Array (6).fill(-1));
}

function reiniciarPlayers () {
    reiniciarPanel();
    racha=[0,0];
    vsmachine=false;
}

function reproducir () {
    sound.play();
    sound.setAttribute("loop",true);
    var music = document.getElementById("music");
    music.innerHTML=".. Music Off ..";
    music.setAttribute("onclick","parar()");
    document.getElementById("playIcon").setAttribute("onclick","parar()");
}

function parar () {
    sound.pause();
    sound.load();
    var music = document.getElementById("music");
    music.innerHTML=".. Music On ..";
    music.setAttribute("onclick","reproducir()");
    document.getElementById("playIcon").setAttribute("onclick","reproducir()");
}

function showRanking () {
    nav = document.getElementsByClassName("start");
    for (let i=0; i<nav.length; i++) {
        if (nav[i].className==="start") {
            nav[i].style.display="none";
        }
    }
    document.getElementById("wellcome").style.width="20vw";
    document.getElementById("wellcome").style.height="60vh";
    document.getElementById("close").style.visibility="visible";
    document.getElementById("title").style.display="flex";    
    document.getElementById("title").innerHTML="- RANKING -";

    
    document.getElementById("ranking").innerHTML+="<ol id='list'></ol>"
    document.getElementById("rankingBox").style.display="block";

    if (ranking != null) {
        ranking.sort(function(a, b){return a.loses - b.loses});
        ranking.sort(function(a, b){return b.wins - a.wins});
    
        var lista = document.getElementById("list");
        for (let i=0; i<ranking.length; i++) {
            var li = document.createElement("li");
            li.innerHTML+=ranking[i].name+" - "+ranking[i].wins+" wins / "+ranking[i].loses+" loses.";
            lista.appendChild(li);
        }
    } else {
        document.getElementById("list").innerHTML="<h6>Aún no hay ranking!</h6>"
    }
}

function cerrar () {
    document.getElementById("close").style.visibility="hidden";
    document.getElementById("wellcome").style.width="40vw";
    document.getElementById("wellcome").style.height="30vh";
    document.getElementById("rankingBox").style.display="none";
    nav = document.getElementsByClassName("start");
    
    for (let i=0; i<nav.length; i++) {
        if (nav[i].className==="start") {
            nav[i].style.display="flex";
        }
    }
}

function esconder (elemId) {
    document.getElementById(elemId).style.opacity="0.4";
}

function mostrar (elemId) {
    document.getElementById(elemId).style.opacity="1";
}