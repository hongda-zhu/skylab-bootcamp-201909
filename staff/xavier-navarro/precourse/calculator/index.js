function plus(a,b){
    return a+"+"+b+"= "+roundNumber(a+b)
}
function minus(a,b){
    return a+"-"+b+"= "+roundNumber(a-b)
}
function times(a,b){
    return a+"*"+b+"= "+roundNumber(a*b)
}
function divided(a,b){
    return a+"/"+b+"= "+roundNumber(a/b)
}
function squaredRoot(a){
    return "√"+a+"= "+roundNumber(Math.sqrt(a))
}
function isNumber(x){
    if(typeof(x) === "number"){
        return true
    }else{
        return false
    }
}
function roundNumber(x) {
    return Math.floor(x * 1000) / 1000
}
function calculator(a,b){
    if(a){
        a = parseFloat(a)
    }
    if(b){
        b = parseFloat(b)
    }
    
    let result
    
    if(a && isNumber(a) && !b){
        const squared = squaredRoot(a)
        result = [squared]
        return result
    }else if(b && isNumber(b) && !a) {
        const squared = squaredRoot(b)
        result = [squared]
        return result
    }else if(isNumber(a) && isNumber(b)) {
        const plusResult = plus(a,b)
        const minusResult = minus(a,b)
        const timesResult = plus(a,b)
        const dividedResult = divided(a,b)
        result = [plusResult,minusResult,timesResult,dividedResult]
        return result
    }else {
        return "Introduzca un número por favor."
    }   
}

// calculator(5,2)
let input = prompt("Por favor, introduzca dos números separados por una coma.")
let numbers = input.split(",")
console.log(calculator(numbers[0],numbers[1]))

