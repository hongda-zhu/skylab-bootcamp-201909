
var num1 = 0;
var num2 = 0;
var op;


function getNumber(numero) {
    if(num1===0 && num1!=="0.") {
        num1=numero;
    } else {
        num1 += numero;
    }
    showNum();
}

function dot() {
    if (num1===0) {
        num1 = '0.'
    } else if (num1.indexOf(',') == -1) {
        num1+= '.'
    }
    showNum();
}

function operar(oper){
    if (num1 == 0){
        num1 = parseFloat(document.getElementById("display").value);
    }
    num2 = parseFloat(num1);
    num1= 0;
    op = oper;
}

function esIgual(){
    num1 = parseFloat(num1);
    switch (op){
        case 1:
            num1 += num2;
        break;
        case 2:
            num1 = num2 - num1;
        break;
        case 3:
            num1 *= num2;
        break;
        case 4:
            num1 = num2 / num1;
        break;
    }
    showNum();
    num2 = parseFloat(num1);
    num1 = 0;
}

function AC() {
    num1 = 0;
    num2 = 0;
    showNum();
}

function delBut() {
    num1 = document.getElementById("display").value
    num1 = num1.slice(0,-1);
    if (num1.length == 0) {
        num1 = 0;
    }
    showNum();
}


function showNum() {
    document.getElementById("display").value = num1;
}