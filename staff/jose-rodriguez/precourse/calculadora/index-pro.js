var USER_NUMBERS = [];

function decimals(dec) {
    if (dec && !Number.isInteger(dec)) {
        return Number.parseFloat(dec.toFixed(3));
    }

}

function suma(nums) {
    var result = 0
    for (i in nums) {
        result += nums[i]
    }
    return decimals(result) || result;
}

function resta(nums) {
    var result = nums[0]
    for (var i = 1; i < nums.length; i++) {
        result -= nums[i]
    }
    return decimals(result) || result;
}

function mult(nums) {
    var result = 1
    for (i in nums) {
        result *= nums[i]
    }
    return decimals(result) || result;
}

function div(nums) {
    var result = 0;
    for (i in nums) {
        if (i === '0') {
            result = nums[i]
        } else {
            result /= nums[i]
        }
    }
    return decimals(result) || result
}

function sqrt(num) {
    return Math.sqrt(num)
}

function calc() {
    var operations = []
    if (USER_NUMBERS.length === 1) {
        operations.push(["raíz cuadrada", sqrt(USER_NUMBERS[0])])
    } else {
        operations = [
            ["suma", suma(USER_NUMBERS)],
            ["resta", resta(USER_NUMBERS)],
            ["multiplicacion", mult(USER_NUMBERS)],
            ["division", div(USER_NUMBERS)]
        ]
    }
    for (var i = 0; i < operations.length; i++) {
        console.log("El resultado de la " + operations[i][0] + " es: " + operations[i][1])
    }
}

function executeContinuePrompt(message) {
    return prompt(message, "SI/NO");
}
function getOut() {
    var response = executeContinuePrompt('Estas seguro?').trim();
            if (response.toLowerCase() === "si") {
                if (USER_NUMBERS.length === 0) {
                    return alert("Hasta la próxima");
                } else {
                    calc();
                }
            } else if (response.toLowerCase() === "no") {
                getNumbers();
            } else {
                executeContinuePrompt("Por favor, contesta:");
            }
}

function getNumbers() {
    var number = prompt("Introduce un número: ");
    if (isNaN(number)) {
        alert("Debes introducir solo números");
        getNumbers();
    } else if (!number.trim()) {
        var cont = executeContinuePrompt("No has introducido ningun número. Quieres continuar introduciendo números?").toLowerCase()
        
        switch (cont) {
            
            case "si":
                getNumbers();
                break;
            case "no":
                getOut();
                break;
            default:
                executeContinuePrompt();
                break;
            }
        } else {
        USER_NUMBERS.push(Number.parseFloat(number));
        getNumbers();
    }
}
getNumbers()
