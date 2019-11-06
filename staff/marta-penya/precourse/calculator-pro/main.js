//funcion para redondear a 3 decimales en caso de que haya
function roundThree(num) {    
    return +(Math.round(num + "e+3")  + "e-3");
};

//funciones individuales para operaciones: suma, resta, multipliación y división respectivamente
let sum = function() {
    let i, sum = 0;
    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return roundThree(sum);
};


let rest = function(){
    let i, rest = arguments[0];
    for (i = 1; i < arguments.length; i++){
        rest -= arguments[i];
    }
    return roundThree(rest);
};


let mult = function(){
    let i, mult = arguments[0];
    for (i = 1; i < arguments.length; i++){
        mult *= arguments[i];
    }
    return roundThree(mult);
};


let div = function(){
    let i, div = arguments[0];
    for(i = 1; i < arguments.length; i++){
        div /= arguments[i];
    }
    return roundThree(div);
};


/*función para realizar las 4 operaciones sean cuales sean el número de argumentos pasados a la función, 
junto a las condiciones de si solo hay un número introducido salga su raiz cuadrada y, si hay alguna letra o caracter
 que no es númerico, la calculadora indicará que debe insertarse un número*/

function calculator(){
  
  for(let i in arguments) {
  if (typeof arguments[i] !== typeof(1)){
    console.log('This is not a number');
  return "Insert only numbers";
  }}
  for(let i in arguments) {
    if(arguments.length === 1){
 results.push(roundThree(Math.sqrt(arguments[0])));
    } else {
     results.push(sum(...arguments), rest(...arguments), mult(...arguments), div(...arguments));
    break;
};
}
console.log(results);
return question();
}

/*funcion para que después de hacer todas las operaciones, el programa pregunte al usuario si desea volver a realizar 
otra operación, volviendo a almacenar más resultados y mostrándolos.*/

function question(){
  let question = prompt("Do you wanna do another operation?", "yes/no")
  let num1;
  let num2;
  
  switch(question){
    case "yes":
        num1 = parseFloat(prompt("Insert a number"));
        num2  = parseFloat(prompt("Insert another number"));
        prompt(calculator(num1,num2));
      break;
      case "no":
        alert("See you soon!");
        break;
  };

};
let results = [];
calculator(3.12332, 3, 10.88888);
