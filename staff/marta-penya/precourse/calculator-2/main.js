//Declaracion de variables
let num1 = 0;
let num2 = 0;
let opera;

//Función que coloca el número presionado
function giveNum(numero){
 if(num1==0 && num1 !== '0.'){
     num1 = numero;
 }else{
     num1 += numero;
 }
 save();
}

//Función que coloca la coma al presionar dicho botón
function dot(){
 if(num1 == 0) {
     num1 = '0.';
 } else if(num1.indexOf('.') == -1) {
     num1 += '.';
 }
 save();
}

//Función que borra todo 
function del(){
 num1 = 0;
 num2 = 0;
 save();
}

//funcion para borrar el ultimo valor introducido
function back(){

num1 = num1.slice(0,-1);

save();
}

//Esta función realiza las distintas operaciones en función del botón pulsado
function operation(valor){
 if (num1 == 0){
     num1 = parseFloat(document.getElementById("resultview").value);
 }
 num2 = parseFloat(num1);
 num1= 0;
 opera = valor;
}

//Función para pulsar igual


function results(){
 num1 = parseFloat(num1);
 switch (opera){
     case 'add':
         num1 += num2;
     break;
     case 'subs':
         num1 = num2 - num1;
     break;
     case 'mult':
         num1 *= num2;
     break;
     case 'div':
         num1 = num2 / num1;
     break;
    }
save();
 num2 = parseFloat(num1);
 num1 = 0;
}

//funcion para ir guardando el valor introducido
function save(){
 document.getElementById("resultview").value = num1;
}