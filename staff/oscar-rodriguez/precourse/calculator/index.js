function calculator (num1, num2) {

    if (!num2) {
        if (isNaN(num1)) {
            console.log ("Por favor, introduzca números.");
            return;
        } else {
            console.log ("La raíz cuadrada de "+num1+" es: "+Math.sqrt(num1));
        } 
    } else {
        if ( isNaN(num1) || isNaN(num2)) {
            console.log ("Por favor, introduzca números.");
            return;
        } else { 
            var sum = function (num1,num2) { return Math.round((num1+num2)*1000)/1000; };
            var rest = function (num1,num2) { return Math.round((num1-num2)*1000)/1000; };
            var mult = function (num1,num2) { return Math.round((num1*num2)*1000)/1000; };
            var div = function (num1,num2) { return Math.round((num1/num2)*1000)/1000; };

            var results=[];

            
                results[0]=sum(num1,num2);
                results[1]=rest(num1,num2);
                results[2]=mult(num1,num2);
                results[3]=div(num1,num2);
                console.log("results = ["+num1+" + "+num2+" = "+results[0]+", "
                                        +num1+" - "+num2+" = "+results[1]+", "
                                        +num1+" * "+num2+" = "+results[2]+", "
                                        +num1+" / "+num2+" = "+results[3]+".");
        }
    }
}

calculator(9,4);