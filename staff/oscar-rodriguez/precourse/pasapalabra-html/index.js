////////////////////////////////// CREACION DEL ELEMENTO ROSCO EN LA PAGINA ///////////////////////////////////
{
    var x = document.body.querySelector(".rosco");
    var letters =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    for (let i=0; i<letters.length; i++) {
        var elem = document.createElement("div");
        elem.className="button";
        elem.id=i;
        if (i===14) {
            elem.innerHTML="&Ntilde;";
        } else {
            elem.innerHTML=letters[i];
        }
        x.appendChild(elem);
    }
    document.getElementById('0').style.transform="translate(0px,6px)";
    document.getElementById('1').style.transform="translate(52px,-30px)";
    document.getElementById('2').style.transform="translate(105px,-56px)";
    document.getElementById('3').style.transform="translate(148px,-72px)";
    document.getElementById('4').style.transform="translate(187px,-79px)";
    document.getElementById('5').style.transform="translate(215px,-77px)";
    document.getElementById('6').style.transform="translate(235px,-67px)";
    document.getElementById('7').style.transform="translate(237px,-57px)";
    document.getElementById('8').style.transform="translate(230px,-45px)";
    document.getElementById('9').style.transform="translate(208px,-41px)";
    document.getElementById('10').style.transform="translate(181px,-39px)";
    document.getElementById('11').style.transform="translate(142px,-47px)";
    document.getElementById('12').style.transform="translate(97px,-67px)";
    document.getElementById('13').style.transform="translate(45px,-95px)";
    document.getElementById('14').style.transform="translate(-5px,-133px)";
    document.getElementById('15').style.transform="translate(-61px,-183px)";
    document.getElementById('16').style.transform="translate(-113px,-248px)";
    document.getElementById('17').style.transform="translate(-160px,-326px)";
    document.getElementById('18').style.transform="translate(-199px,-413px)";
    document.getElementById('19').style.transform="translate(-223px,-505px)";
    document.getElementById('20').style.transform="translate(-238px,-603px)";
    document.getElementById('21').style.transform="translate(-239px,-703px)";
    document.getElementById('22').style.transform="translate(-227px,-800px)";
    document.getElementById('23').style.transform="translate(-200px,-897px)";
    document.getElementById('24').style.transform="translate(-163px,-989px)";
    document.getElementById('25').style.transform="translate(-112px,-1065px)";
    document.getElementById('26').style.transform="translate(-61px,-1131px)";
}

////////////////////////////////// CODIGO JUEGO PASAPALABRA COMIENZA AQUI //////////////////////////////////////

//variables globales
var tablaDefiniciones = [

    [   { letra: "a", palabra: "avellana", status: 0, definicion: "CON LA A. Fruto comestible del avellano"},
        { letra: "a", palabra: "avion", status: 0, definicion: "CON LA A. Vehículo más pesado que el aire, provisto de alas, que vuela propulsado por uno o varios motores"},
        { letra: "a", palabra: "abecedario", status: 0, definicion: "CON LA A. Conjunto de las letras de un idioma puestas en orden."}
    ],
    [   { letra: "b", palabra: "buitre", status: 0, definicion: "CON LA B. Ave rapaz que suele alimentarse especialmente de animales muertos, aunque son capaces de cazar presas vivas."},
        { letra: "b", palabra: "bar", status: 0, definicion: "CON LA B. Unidad de medida de la presión atmosférica, donde vas a tomarte unas cañas."},
        { letra: "b", palabra: "babero", status: 0, definicion: "CON LA B. Tela que se pone a los bebés en el pecho para que no se manchen al comer."}
    ],
    [   { letra: "c", palabra: "circulo", status: 0, definicion: "CON LA C. Superficie limitada por la circunferencia."},
        { letra: "c", palabra: "conmutativa", status: 0, definicion: "CON LA C. Propiedad según la cual el orden de los factores no altera el producto."},
        { letra: "c", palabra: "cabeza", status: 0, definicion: "CON LA C. Parte superior del cuerpo que está sobre el cuello."}
    ],
    [   { letra: "d", palabra: "docil", status: 0, definicion: "CON LA D. Fácil de educar, apacible, dulce."},
        { letra: "d", palabra: "doraemon", status: 0, definicion: "CON LA D. Gato cósmico de ficción, compañero de aventuras de Novita."},
        { letra: "d", palabra: "dormir", status: 0, definicion: "CON LA D. Forma de descanso que hacemos por las noches o en la siesta, con los ojos cerrados, sin darnos cuenta de nada."}
    ],
    [   { letra: "e", palabra: "encefalo", status: 0, definicion: "CON LA E. Conjunto de órganos que forman parte del sistema nervioso de los vertebrados"},
        { letra: "e", palabra: "encuadernar", status: 0, definicion: "CON LA E. Juntar, unir o coser varias hojas o pliegos y ponerles cubiertas."},
        { letra: "e", palabra: "elefante", status: 0, definicion: "CON LA E. Animal mamífero enorme, de color marrón o gris, que vive en Asia o frica, y que tiene trompa y grandes orejas."}
    ],
    [   { letra: "f", palabra: "faraon", status: 0, definicion: "CON LA F. Soberano del antiguo Egipto."},
        { letra: "f", palabra: "fotomontaje", status: 0, definicion: "CON LA F. Técnica que consiste en combinar dos o más fotografías para crear una nueva composición"},
        { letra: "f", palabra: "fiebre", status: 0, definicion: "CON LA F. Aumento de la temperatura del cuerpo que tenemos cuando estamos enfermos."}
    ],
    [   { letra: "g", palabra: "gotico", status: 0, definicion: "CON LA G. Estilo arquitectónico que resulta de la evolución del románico, caracterizado por el arco ojival y la bóveda de aristas."},
        { letra: "g", palabra: "guion", status: 0, definicion: "CON LA G. Texto a seguir por los actores de una obra teatral o película."},
        { letra: "g", palabra: "globo", status: 0, definicion: "CON LA G. Especie de pelota de goma, que se hincha con aire, y que a veces los niños llevan flotando atado con una cuerda."}
    ],
    [   { letra: "h", palabra: "herviboro", status: 0, definicion: "CON LA H. Animal que solo se alimenta de hierbas o plantas."},
        { letra: "h", palabra: "hazaña", status: 0, definicion: "CON LA H. Acción o hecho, y especialmente hecho ilustre, señalado y heróico."},
        { letra: "h", palabra: "humo", status: 0, definicion: "CON LA H. Lo usaban los nativos americanos para comunicarse a grandes distancias, mediante una hoguera y una manta."}
    ],
    [   { letra: "i", palabra: "idoneo", status: 0, definicion: "CON LA I. Perfecto para, que tiene buena disposición o aptitud para algo."},
        { letra: "i", palabra: "insulina", status: 0, definicion: "CON LA I. Hormona segregada por el páncreas, que regula la cantidad de glucosa existente en la sangre, cuya ausencia provoca la diabetes."},
        { letra: "i", palabra: "iglesia", status: 0, definicion: "CON LA I. Lugar de culto religioso en el que se celebran las misas, las bodas, los bautizos, las comuniones,…"}
    ],
    [   { letra: "j", palabra: "jabalina", status: 0, definicion: "CON LA J. Especie de vara que se emplea en competiciones atléticas."},
        { letra: "j", palabra: "joya", status: 0, definicion: "CON LA J. Adorno de oro, plata o platino, con perlas o piedras preciosas o sin ellas."},
        { letra: "j", palabra: "jardin", status: 0, definicion: "CON LA J. Zona que rodea algunas casas o edificios y que está lleno de césped, flores, árboles…"}
    ],
    [   { letra: "k", palabra: "klingon", status: 0, definicion: "CON LA K. Raza de humanoides y enemigos principales de la serie Star Trek."},
        { letra: "k", palabra: "kimono", status: 0, definicion: "CON LA K. Túnica de origen japonés, de mangas anchas y largas, abierta por delante y que se ciñe, cruzándola, mediante un cinturón."},
        { letra: "k", palabra: "kilo", status: 0, definicion: "CON LA K. Unidad de medida que suele equivaler a 1000 unidades."}
    ],
    [   { letra: "l", palabra: "lagrima", status: 0, definicion: "CON LA L. Cada una de las gotas del líquido que segrega la glándula lagrimal."},
        { letra: "l", palabra: "leia", status: 0, definicion: "CON LA L. Ojo spoiler! Hermana de Luke: "},
        { letra: "l", palabra: "luna", status: 0, definicion: "CON LA L. Satélite de la Tierra, de color blanco, que se 'llena' cada 27 días."}
    ],
    [   { letra: "m", palabra: "mantel", status: 0, definicion: "CON LA M. Tela que se pone en las mesas a la hora de comer."},
        { letra: "m", palabra: "metro", status: 0, definicion: "CON LA M. Unidad de medida de longitud, en la que puedes desplazarte por toda Barcelona (haciendo algunos trasbordos)."},
        { letra: "m", palabra: "meridiano", status: 0, definicion: "CON LA M. Cada uno de los semicírculos de la esfera terrestre que van de polo a polo."}
    ],
    [   { letra: "n", palabra: "navegar", status: 0, definicion: "CON LA N. Viajar por el agua con una embarcación o por internet."},
        { letra: "n", palabra: "nido", status: 0, definicion: "CON LA N. Tipo de casa que construyen los pájaros para poner sus huevos."},
        { letra: "n", palabra: "nomada", status: 0, definicion: "CON LA N. Dicho de un individuo, de una tribu, de un pueblo: Carente de un lugar estable para vivir. Antónimo de sedentario."}
    ],
    [   { letra: "ñ", palabra: "caño", status: 0, definicion: "CONTIENE LA Ñ. En fútbol, pasar la pelote por entre las piernas del rival."},
        { letra: "ñ", palabra: "rebaño", status: 0, definicion: "CONTIENE LA Ñ. Conjunto o grupo de ganado, especialmente del lanar."},
        { letra: "ñ", palabra: "ñapa", status: 0, definicion: "CON LA Ñ. Actividad o trabajo de mala calidad, especialmente si se hace por una urgencia."}
    ],
    [   { letra: "o", palabra: "objetivo", status: 0, definicion: "CON LA O. Que no se deja influir por consideraciones personales en sus juicios o en su comportamiento."},
        { letra: "o", palabra: "oscurecer", status: 0, definicion: "CON LA O. Reducir la cantidad de luz o claridad de algo."},
        { letra: "o", palabra: "ojo", status: 0, definicion: "CON LA O. Órgano del sentido de la vista. Lo que usamos para ver."}
    ],
    [   { letra: "p", palabra: "portatil", status: 0, definicion: "CON LA P. Que se puede mover o transportar con facilidad, como un ordenador."},
        { letra: "p", palabra: "prenda", status: 0, definicion: "CON LA P. Ropa, cada una de las vestimentas de una persona."},
        { letra: "p", palabra: "peces", status: 0, definicion: "CON LA P. Animales que viven en el agua, cubiertos de escamas, con aletas para nadar."}
    ],
    [   { letra: "q", palabra: "quebrado", status: 0, definicion: "CON LA Q. Otro nombre de las fracciones. Roto"},
        { letra: "q", palabra: "quemar", status: 0, definicion: "CON LA Q. Calentar demasiado una cosa, especialmente hasta el punto de estropearla, por estar mucho tiempo expuesta al fuego o a una temperatura elevada."},
        { letra: "q", palabra: "quijote", status: 0, definicion: "CON LA Q. Hidalgo de ficción, natural de la Mancha, creado por Miguel de Cervantes."}
    ],
    [   { letra: "r", palabra: "renacuajo", status: 0, definicion: "CON LA R. Cría o larva de un anfibio, especialmente la de la rana."},
        { letra: "r", palabra: "romeria", status: 0, definicion: "CON LA R. Fiesta popular que se celebra en el campo inmediato a alguna ermita o santuario."},
        { letra: "r", palabra: "rapido", status: 0, definicion: "CON LA R. Veloz."}
    ],
    [   { letra: "s", palabra: "soltero", status: 0, definicion: "CON LA S. Que no está casado."},
        { letra: "s", palabra: "sacapuntas", status: 0, definicion: "CON LA S. Lo que usas para que tus lápices tengan la punta afilada."},
        { letra: "s", palabra: "sinonimo", status: 0, definicion: "CON LA S. Lo contrario de antónimo."}
    ],
    [   { letra: "t", palabra: "timbre", status: 0, definicion: "CON LA T. Aparato mecánico o eléctrico de llamada o de aviso que se coloca normalmente en las casas."},
        { letra: "t", palabra: "tormenta", status: 0, definicion: "CON LA T. Lluvia intensa, de corta duración, acompañada de rayos y truenos."},
        { letra: "t", palabra: "tenedor", status: 0, definicion: "CON LA T. Objeto que se usa para pinchar los alimentos y comérselos."}
    ],
    [   { letra: "u", palabra: "ultimo", status: 0, definicion: "CON LA U. Que dentro de una serie no tiene nada detrás."},
        { letra: "u", palabra: "uña", status: 0, definicion: "CON LA U. Parte dura que está en la punta de los dedos, que cortamos cuando crece y que las mujeres se pintan a veces."},
        { letra: "u", palabra: "unicornio", status: 0, definicion: "CON LA U. Criatura mitológica representada habitualmente como un caballo blanco con patas de antílope, ojos de chivo y un cuerno en la frente."}
    ],
    [   { letra: "v", palabra: "viaje", status: 0, definicion: "CON LA V. Recorrido o itinerario que se realiza para ir de un lugar a otro."},
        { letra: "v", palabra: "vidente", status: 0, definicion: "CON LA V. Que tiene capacidad para ver, generalmente utilizado para describir a quien puede ver el futuro."},
        { letra: "v", palabra: "verano", status: 0, definicion: "CON LA V. Estación del año en la que hace mucho calor."}
    ],
    [   { letra: "w", palabra: "wikipedia", status: 0, definicion: "CON LA W. Principal enciclopedia digital, accesible desde Internet, creada en 2001 por Jimmy Wales y Larry Sanger."},
        { letra: "w", palabra: "william", status: 0, definicion: "CON LA W. Nombre del dramaturgo, poeta y actor inglés conocido por ser el autor, etre otros, de Hamlet o Romeo y Julieta."},
        { letra: "w", palabra: "windsurf", status: 0, definicion: "CON LA W. Deporte que se practica en el mar, de pie sobre una tabla alargada que lleva una vela triangular."}
    ],
    [   { letra: "x", palabra: "examen", status: 0, definicion: "CONTIENE LA X. Prueba de conocimientos, aptitudes, habilidades o de unas capacidades físicas."},
        { letra: "x", palabra: "exhibir", status: 0, definicion: "CONTIENE LA X. Exponer una cosa públicamente de forma que pueda ser vista por un gran número de personas con detenimiento."},
        { letra: "x", palabra: "taxi", status: 0, definicion: "CONTIENE LA X. Coche con conductor que lleva a las personas donde quieren ir y les cobra según los kilómetros recorridos."}
    ],
    [   { letra: "y", palabra: "yunke", status: 0, definicion: "CON LA Y. Bloque macizo de piedra o metal que se usa como soporte para forjar metales como hierro o acero."},
        { letra: "y", palabra: "ayuntamiento", status: 0, definicion: "CONTIENE LA Y. Corporación que administra el municipio."},
        { letra: "y", palabra: "yate", status: 0, definicion: "CON LA Y. Barco de lujo."}
    ],
    [   { letra: "z", palabra: "zancada", status: 0, definicion: "CON LA Z. Paso largo."},
        { letra: "z", palabra: "azahar", status: 0, definicion: "CONTIENE LA Z. Flor blanca del naranjo, limonero y cidro."},
        { letra: "z", palabra: "zoo", status: 0, definicion: "CON LA Z. Parque en el que hay todo tipo de animales de todo el mundo que se pueden visitar por el público."}
    ]
];
var hitSound = document.getElementById("hit");
var failSound = document.getElementById("fail");
var respuesta='', clock;
var player, rosco;
var endGame=false;
var index=0;
var ranking, bote;

if (localStorage.getItem("bote")===null) {
    bote=1000;
} else {
    bote=parseInt(localStorage.getItem("bote"));
}
document.getElementById("award").innerHTML=bote;


//realiza acción al presionar 'ENTER'
window.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        if (player!=undefined){        
            getPalabra();
        } else {
            player=new Player();
            startGame();
        }
    }
}, false);


//CONSTRUCTORES de player y Quesion.
function Player () {
    this.name = document.getElementById("nombre").value,
    this.aciertos = 0,
    this.time = 0
}

function Question (i) {
    var j=Math.floor(Math.random()*3);

    this.letra=tablaDefiniciones[i][j].letra;
    this.palabra=tablaDefiniciones[i][j].palabra;
    this.status=0;
    this.definicion=tablaDefiniciones[i][j].definicion;
}   

function mostrarRanking() {
    
    document.getElementById("ranking").innerHTML='<h1>RANKING</h1><h4>NOMBRE - ACIERTOS - SEGUNDOS</h4><ol id="data"></ol>';
    var data = document.getElementById("data");
    for (let i=0; i<ranking.length; i++) {
        var li = document.createElement("li");
        li.className="def";
        li.innerHTML=ranking[i].name+" - "+ranking[i].aciertos+" - "+ranking[i].time+".";
        data.appendChild(li);
    }
    document.getElementById("ranking").style="display: block";
}
//comprueba la respuesta y muestra acierto o fallo en la página o realiza Pasapalabra o EndGame
function comprobarRespuesta() {
    switch (respuesta) {
        case 'pasapalabra' :
                document.getElementById(index).className="button";
                document.getElementById("match").innerHTML="";
                break;
        case 'end':
                endGame=true;
                break;
        case rosco[index].palabra:
                document.getElementById("match").style="color:green";
                document.getElementById("match").innerHTML="CORRECTO!!";
                document.getElementById(index).className="button-hit";
                hitSound.play();
                rosco[index].status = 1;
                player.aciertos++;
                break;
        default:
                document.getElementById("match").style="color:red";
                document.getElementById("match").innerHTML="INCORRECTO!!<br>La respuesta correcta era "+rosco[index].palabra;
                document.getElementById(index).className="button-fail";
                failSound.play();
                rosco[index].status = -1;
    }

    index++;

    if (index >= 27) {
        index=0;
    }
    if(!roscoCompleto() && !endGame) {
        mostrarPregunta();
        
    } else if (roscoCompleto()) {
        clearInterval(clock);
        document.getElementById("pregunta").style="display:none";
        player.time=250-parseInt(document.getElementById("timer").innerHTML);
        document.getElementById("score").innerHTML='<span class="wellcome">Bravo '+player.name+'!</span><br><br>Has acertado '+player.aciertos+' palabras<br>en '+player.time+' segundos!<br>';
        document.getElementById("score").style="display:block";
        var restart = document.createElement("button");
        restart.innerHTML="Volver a jugar?";
        restart.id="restart";
        restart.setAttribute ("onclick", "reStart()");
        restart.style="background-color: green; color: white; margin: 20px auto;";
        document.getElementById("score").appendChild(restart);
        ranking.push(player);
        ranking.sort(function(a, b){return a.time - b.time});
        ranking.sort(function(a, b){return b.aciertos - a.aciertos});
        mostrarRanking();
        if(player.aciertos===27){
            alert("WOOOW. Has ganado el bote!!!\nTe llevas "+bote+"€");
            bote=1000;
        } else{
            bote+=100;
        }
        localStorage.setItem("ranking", JSON.stringify(ranking));
        localStorage.setItem("bote", bote);
        document.getElementById("award").innerHTML=bote;
        player=undefined;
    } else {
        clearInterval(clock);
        document.getElementById("pregunta").style="display:none";
        document.getElementById("fin").style="display:block";   
        var restart = document.createElement("button");
        restart.innerHTML="Volver a jugar?";
        restart.id="restart";
        restart.setAttribute ("onclick", "reStart()");
        restart.style="background-color: green; color: white; margin: 20px auto;";
        document.getElementById("fin").appendChild(restart);
        player=undefined;
    }
    
}

//realiza la acción de pasar Palabra
function pasaPalabra () {
    respuesta='pasapalabra';
    comprobarRespuesta();
    respuesta=null;
}

function finishGame () {
    respuesta='end';
    comprobarRespuesta();
    respuesta=null;
}

//recoge la palabra escrita en el Input correspondiente SI HAY PALABRA ESCRITA
function getPalabra () {
    respuesta=document.getElementById('palabra').value;
    if (respuesta==='') {
        document.getElementById('palabra').placeholder="respuesta?";
    } else {
        respuesta=respuesta.toLowerCase();
        document.getElementById('palabra').value="";
        comprobarRespuesta();
        respuesta=null;
    }
}

//crea un rosco de preguntas para cada letra del abecedario;
function crearRosco () {
    let rosco=[];

    for (let i=0; i<27; i++) {
        rosco[i]=new Question(i);
    }

    return rosco;
}

//retorna true si todas las letras han sido respondidas, correcta e incorrectamente
//es decir, si no queda ningún status=0;
function roscoCompleto () {
    for (let i=0; i<rosco.length; i++) {
        if (rosco[i].status===0) {
            return false;
        }
    }
    return true;
}

//muestra la letra y su definición.
function mostrarPregunta() {
    if (rosco[index].status === 0) {
        document.getElementById(index).className="button-current";
        document.getElementById("letra").innerHTML="Con la "+rosco[index].letra.toUpperCase();
        document.getElementById("def").innerHTML=rosco[index].definicion;
        document.getElementById("pregunta").style="display:block";
        document.getElementById("palabra").focus();
    } else {
        do {
            if (index>=27) {
                index=0;
            }
            else { 
                index++;
            }
        } while (rosco[index].status != 0);
        mostrarPregunta();
    }
}
//Establece el timeout que detendrá el juego al acabar el tiempo.
function startTime (counter) {
    var timer = document.getElementById("timer");
    clock = setInterval(function(){
    timer.innerHTML=counter;
    counter--;
    if (counter<0) {
        clearInterval(clock);
        endGame=true;
    }
    },1000);
}

function reStart() {
    document.getElementById("wellcome").style="display:block";
    document.getElementById("nombre").value="";
    document.getElementById("fin").style="display:none";
    document.getElementById("score").style="display:none";
    document.getElementById("ranking").style="display:none";
    document.getElementById("timer").innerHTML="GO!";
    document.getElementById("timer").setAttribute("onclick","startGame()");
    document.getElementById("timer").style.removeProperty("position");
    
}
//inicializa el juego
function startGame() {
    index=0;
    endGame=false;
    if (player===undefined) {player = new Player();}
    rosco=crearRosco();
    ranking=JSON.parse(localStorage.getItem("ranking"));
    
    if ( ranking === null) {
        ranking=[];
    }
    if (localStorage.getItem("bote")===null) {
        bote=1000;
    } else {
        bote=parseInt(localStorage.getItem("bote"));
    }
    for (let i=0; i<letters.length;i++) {
        document.getElementById(i).className="button";
    }
    if (clock != null) {clearInterval(clock);}
    startTime(240);
    document.getElementById("timer").setAttribute("onclick","");
    document.getElementById("wellcome").style="display:none";
    document.getElementById("timer").style="position: absolute; top: 50px; left: 50px;";
    document.getElementById("award").innerHTML=bote;
    mostrarPregunta();
}