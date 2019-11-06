function sonTodosNumero (lista) {
    for (var i=0; i<lista.length; i++) {
        if (isNaN(lista[i])) { return false; }
    }
    return true;
}

function suma (lista) {
    var acum=lista[0];
    for (var i=1; i<lista.length; i++) {
        acum+=lista[i];
    }
    return acum;
}

function resta (lista) {
    var acum=lista[0];
    for (var i=1; i<lista.length; i++) {
        acum-=lista[i];
    }
    return acum;
}

function multi (lista) {
    var acum=lista[0];
    for (var i=1; i<lista.length; i++) {
        acum*=lista[i];
    }
    return acum;
}

function divi (lista) {
    var acum=lista[0];
    for (var i=1; i<lista.length; i++) {
        acum/=lista[i];
    }
    return Math.round(acum*1000)/1000;
}

function getArgs () {
    var j = 0;
    var args = [];
    var continuar=true;

    while (continuar) {
        args[j]=prompt("Introduce un numero: ");
        j++;
        continuar=confirm("Deseas introducir más numeros?");
    }
    return args;
}

function calculatorPro () {

    var results = [];
    var args = Array.prototype.slice.call(arguments);

    //comprovamos que haya al menos 1 parámentro.
    if (args.length < 1) { console.log ("ERROR! Debes introducir al menos 1 número!"); return; }
    else {
        if (typeof arguments[0] === 'object' ) {
            args=Array.prototype.slice.call(arguments[0]);
        }
        if (!sonTodosNumero(args)) { console.log("ERROR! Alguno de los datos no es numérico! ["+args+"]"); }
        else if (args.length === 1) {
            console.log ("La raíz cuadrada de "+args[0]+" es: "+Math.sqrt(args[0]));
            } else {
                results[0]=suma(args);
                results[1]=resta(args);
                results[2]=multi(args);
                results[3]=divi(args);
                console.log("results = ["+args.join("+")+" = "+results[0]+
                            ", "+args.join("-")+" = "+results[1]+
                            ", "+args.join("*")+" = "+results[2]+
                            ", "+args.join("/")+" = "+results[3]+" ]");
            }
        if (confirm("Deseas seguir realizando más operaciones?")) {
                args=getArgs();
                calculatorPro(args);
        } else { 
            console.log("Gracias por usar CalculadoraPro, Adios!"); return;
        }
    }
}

calculatorPro(9,4,5,24);