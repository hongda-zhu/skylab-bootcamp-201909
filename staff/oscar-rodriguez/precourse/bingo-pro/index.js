//constructores de Obj
function Number () {
    this.number= Math.floor(Math.random()*99)+1;
    this.matched= false;
}

function Player () {
    this.name = prompt ("Hola, como te llamas?","Oscar"),
    this.score = 0
}

function createCard (size) {
    var carton = []

    // creamos el carton con la cantidad de numeros pasada por $size.
    for (let i=0;i<size;i++) {
        carton[i]=new Number();
    }

    //comprovamos que no se haya generado ningún número repetido dentro del cartón.
    let listaNums=[carton[0].number];
    let j=1;
    
    for (let i=1; i<carton.length; i++) {
        while(listaNums.includes(carton[i].number)) {
            carton[i]=new Number();    
        }
            listaNums[j]=carton[i].number;
            j++;

    }
return carton;
}

//muestra por pantalla los números del cartón siempre que no hayan salido,
// o una X si ya ha salido.
function showCard (card) {
    let numLinias=card.length/5;
    let linia='';
    console.log('\n');
    for (let i=0; i<numLinias;i++) {
        for (let j=0; j<5; j++) {
            if (card[j+(i*5)].matched) {
                linia=linia+'X\t';
            } else {
                linia=linia+card[j+(i*5)].number+'\t';
            }
        }
        console.log(linia);
        linia='';
    }
    console.log('\n');
}

//retorna true si el carton está completo o false si no.
function cartonCompleto (card) {
    let uncomplete=false;
    
    for (let i=0; i<card.length;i++) {
        if (!card[i].matched) {
            uncomplete=true;
            break;
        }
    }
    return !uncomplete;
}

//retorna un numero aleatorio de 1 al 99 que no haya salido antes.
function randomNumber (list) {
    let random=Math.floor(Math.random()*99)+1;
    let numOk=false;

    while (!numOk) {
        if (list.includes(random)) {
            random=Math.floor(Math.random()*99)+1;
        } else { 
            numOk=true; 
        }
    }
    list.push(random);
    return random;
}

//retorna el índice de bingoCard donde se encuentra random, o -1 en caso de no encontrarlo.
function hayMatch (num,card) {
    for (let i=0; i<card.length; i++) {
        if (num===card[i].number) {
            return i;
        }
    }
    return -1;
}

//retorna true si hay linia o false si no.
function linia (card) {
    let numLinias=card.length/5;
    for (let i=0; i<numLinias;i++) {
        let linia=true;
        for (let j=0; j<5; j++) {
            if (!card[j+(i*5)].matched) {
                linia=false;
                break;
            }
        }
        if (linia) { return true; }
    }
    return false;
}

//establece la cantidad de números del cartón, solicitando un número de linias de 1 a 5;
function getDificulty () {
    var dificulty='.'; 
        while (isNaN(dificulty)) {
            dificulty=parseInt(prompt("Vamos a determinar la dificultad: Cuantas línias quieres que tenga tu cartón? (MAX 5!)"));
            if (dificulty<1 || dificulty>5) {
                dificulty='.';
            }
        }
    return dificulty*=5;
}

function bingoPro () {
    var continuePlaying=true;
    var ranking=[];
    
    while (continuePlaying) {
        var endGame=false;
        var turno=0;
        var listaRandoms=[];
        var player=new Player();
        var cantaLinia=false;
        
        console.log("\t\t\t\t\tBienvenido a BingoPro "+player.name+".");
        if (confirm("Quieres ver el sistema de puntos?")){
            console.log('\t\t\t\t\tEl sistema de puntos es el siguiente: ');
            console.log('\t\t\t\t\tLa partida de Bingo durará un máximo de 99 turnos. Conseguirás 1 punto \n\
\t\t\t\t\tpor cada turno que no utilices, es decir, cuantos menos turnos necesites, obtendrás más puntos! Pero...');
            console.log('\t\t\t\t\tOjo! la dificultad de tu cartón hará que consigas más o menos puntos:');
            console.log('\t\t\t\t\tAl final del juego, multiplicaremos el número de turnos no utilizados \n\
\t\t\t\t\tpor la cantidad de números de tu carto; Es más facil llenar un cartón de 5 números que de 25, no?');
            console.log('\t\t\t\t\tAah! Y si cantas Línia en los primeros 15 tunos, consigues 25 puntos EXTRA!');
            console.log('\t\t\t\t\tAaa jugaaar!');
        }
        var dificulty=getDificulty();
        var bingoCard=createCard(dificulty);
        showCard(bingoCard);

        while (!confirm('¿Deseas jugar con éste cartón?')) {
            bingoCard=createCard(dificulty);
            showCard(bingoCard);
        }

        while (!endGame) {
            if (!cartonCompleto(bingoCard)) {
                if (confirm('Deseas comenzar un nuevo turno?')){
                    let random;
                    turno++;
                    console.log("\t\t\t\t\t\t\t\tTurno número "+turno+" ... ");
                    random=randomNumber(listaRandoms);
                    console.log('\t\t\t\t\t\t\t\tEeeeeelll... '+random+'!!!');
                    let index=hayMatch(random,bingoCard);
                    if(index>=0){
                        bingoCard[index].matched=true;
                        console.log ('\t\t\t\t\t\t\t\tBravo!! Has tachado el '+bingoCard[index].number);
                        showCard(bingoCard);
                        if (!cantaLinia) {
                            if (linia(bingoCard)){
                                console.log('\t\t\t\t\t\t\t\tLINIA!!! Haaan cantado Liniaaaa!!');
                                cantaLinia=true;
                                if (turno<15) {
                                    console.log('\t\t\t\t\t\t\t\tBravo! Has conseguido 25 puntos extra!');
                                    player.score+=25;
                                }
                            }
                        }
                    }
                } else {
                    endGame=true;
                    console.log("\t\t\t\t\t\t\t\tGracias por intentarlo!");
                }
                if (turno>=99) {
                    endGame=true;
                    //Lose.
                }
            } else {
                player.score+=(99-turno)*dificulty;
                console.log("\t\t\t\t\t\t\t\tBINGO!!! Haaan cantadooo BINGOOO!!!");
                console.log("\t\t\t\t\t\t\t\tFelicidades! Has necesitado "+turno+"turnos para conseguirlo.");
                console.log("\t\t\t\t\t\t\t\tHas conseguido "+player.score+" puntos.")
                ranking.push(player);
                ranking.sort(function(a, b){return b.score - a.score});
                console.log("\t\t\t\t\t\t\t\tEste es el ranking de puntuación:");
                for (let i=0;i<ranking.length;i++) {
                    console.log('\t\t\t\t\t\t\t\t\t\t\t'+(i+1)+'º- '+ranking[i].name+'   -   '+ranking[i].score+' points.')
                }
                endGame=true;
            }
        }
        continuePlaying=confirm("Deseas seguir jugando?");
    }
}

bingoPro();