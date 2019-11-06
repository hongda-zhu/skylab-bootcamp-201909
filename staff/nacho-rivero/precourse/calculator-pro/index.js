var valNum = 0;
var valArray = [];
var resultSum = 0;
var resultRest = 0;
var resultMult = 1;
var resultDiv = 1;
var operations = [];
var reboot = "n";

function declareArray(){
    console.log('Introduce the number of values that will be processed in this session');
    valNum = prompt('Please introduce number of values');
    if (isNaN(valNum)){
        alert("value is not a number");
    } else if (valNum == 1){
        console.log('You have selected to proceed with value square root');
        valArray.push(prompt('Please introduce values'));
        var resultSq = Math.sqrt(valArray[0]);
        console.log("value square root " + parseFloat(resultSq).toFixed(3).replace(/0+$/,''));
    } else {
        for (var i = 0; i < valNum; i++){
            var intNum;
            while (isNaN(intNum = prompt("Enter the " + i + " element value", "Only numbers"))); //this prevents user to use values that are not numbers with prompt method.
            valArray.push(intNum);
        }
}
}



function makeCalcs(){  //I cannot declare  a variable at the same time that I make a sum
    for (var j = 0; j < valArray.length; j++){
        resultSum += Number(valArray[j]);
        resultRest -= Number(valArray[j]);
        resultMult *= Number(valArray[j]);
        resultDiv /= Number(valArray[j]);

    }
}

function results(){
    operations = ["Total Sum " + parseFloat(resultSum).toFixed(3).replace(/0+$/,''),
                 "Total Rest "+ parseFloat(resultRest).toFixed(3).replace(/0+$/,''),
                 "Total Multiplication "+ parseFloat(resultMult).toFixed(3).replace(/0+$/,''),
                 "Total Division "+ parseFloat(resultDiv).toFixed(3).replace(/0+$/,'')];
    operations.forEach(op => console.log(op));
}

function newNumbers(){
    reboot = prompt("Do you want to make new calculations?", "y/n");
    if (reboot == "y"){
        valNum = 0;
        valArray = [];
        resultSum = 0;
        resultRest = 0;
        resultMult = 1;
        resultDiv = 1;
        reboot = "n";
        operations = [];

        declareArray();
        makeCalcs();
        results();
        newNumbers();

    }else if(reboot =="n"){
    console.log('Thanks for using my calculator-pro! Bye!');
    }else{
    console.log('This is not a valid command, please retry');
    newNumbers();
    }   
}


declareArray();

makeCalcs();

results();
newNumbers();