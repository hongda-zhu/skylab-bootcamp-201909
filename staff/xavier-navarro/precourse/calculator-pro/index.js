function areNumbers(numbers){
  let isNumber = true
    numbers.forEach(element => {
        if(isNaN(element)){
            isNumber = false
        }
    });
    if(!isNumber){
      return false
    }
    return true
}
function roundNumber(x) {
    return Math.floor(x * 1000) / 1000
}
function plus(numbers){
  let resultOperation = 0
  let operacion = ""
    numbers.forEach((val, key, numbers) => {
        if (Object.is(numbers.length - 1, key)) {
          operacion += val+"="
        }else {
          operacion += val+"+"
        }
        resultOperation += val
      });
    return operacion+roundNumber(resultOperation)
}
function minus(numbers){
  let resultOperation = 0
  let operacion = ""
  numbers.forEach((val, key, numbers) => {
      if(key == 0){
        resultOperation = val
      }else {
        resultOperation -=val
      }
      if (Object.is(numbers.length - 1, key)) {
        operacion += val+"="
      }else {
        operacion += val+"-"
      }
      
    });
  return operacion+roundNumber(resultOperation)
}
function times(numbers){
    let resultOperation = 0
    let operacion = ""
    numbers.forEach((val, key, numbers) => {
        if(key == 0){
          resultOperation = val
        }else {
          resultOperation *=val
        }
        if (Object.is(numbers.length - 1, key)) {
          operacion += val+"="
        }else {
          operacion += val+"*"
        }
        
      });
    return operacion+roundNumber(resultOperation)
}
function divided(numbers){
    let resultOperation = 0
    let operacion = ""
    numbers.forEach((val, key, numbers) => {
        if(key == 0){
          resultOperation = val
        }else {
          resultOperation /=val
        }
        if (Object.is(numbers.length - 1, key)) {
          operacion += val+"="
        }else {
          operacion += val+"/"
        }
        
      });
    return operacion+roundNumber(resultOperation)
}
function squaredRoot(a){
    return "√"+a+"= "+roundNumber(Math.sqrt(a))
}
function calculator(numbers){    
    let result  
    if(!areNumbers(numbers)){
        return "Sólo puede introducir números. Vuelva a intentarlo por favor."
    }else if(numbers.length == 1){
          let squared = squaredRoot(numbers[0])
          result = [squared]
          return result
    } else {
        
        let plusResult = plus(numbers)
        let minusResult = minus(numbers)
        let timesResult = times(numbers)
        let dividedResult = divided(numbers)
        result = [plusResult,minusResult,timesResult,dividedResult]
        return result
    }  
}
// calculator(5,2)
let globalResult
function callCalculator(){
  let input = prompt("Por favor, introduzca varios números separados por una coma.")
  let numbers = input.split(",").map(parseFloat)
  return calculator(numbers)
}
globalResult = callCalculator()
console.log(globalResult)
let repeat = prompt("Desea introducir nuevos números? s/n")

switch (repeat) {
  case "s":
      newResult = callCalculator()
      newResult.forEach(element => {
        globalResult.push(element)
      });
      console.log(globalResult)
    break;
  case "n":
      console.log("Bye!")
    break;

  default:
      console.log("Respuesta invalida")
    break;
}