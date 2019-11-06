const screen = document.getElementById("pantalla")
const others = document.getElementById("others")
const operations = document.getElementById("operations")
const keys = document.getElementById("keys")
let operationStatus = false
let operationDone = false
let data
let number1
screen.textContent = '0'

function calculator() {
    if(!keys) return false
    // e = event
    // t = target
    // d = data
    others.addEventListener('click', e => {
        const   t = e.target,
                d = t.dataset
            console.log(d.others)
        if(d.others) doFunction(d.others)
    })
    operations.addEventListener('click', e => {
        const   t = e.target,
                d = t.dataset
        if(d.operation){
          data = checkOperation(t,d.operation)
        } 
    })
    keys.addEventListener('click', e => {
        const   t = e.target,
                d = t.dataset
        if(d.number) print(d.number)
    })
}

function print(data){
    let hasComma = false
    if(screen.textContent.includes(',') &&  data === ','){
        hasComma = true
    }
    if(!hasComma){
        if(screen.textContent === '0' && data !== ',' || operationStatus === true || operationDone === true){
            if(operationStatus === true && data === ',' || operationDone === true && data === ','){
                screen.textContent = 0+data
            }else {
                screen.textContent = data
            }
            operationDone = false
        }else {
            screen.textContent += data
        }
    }
    operationStatus = false
}

function checkOperation(elem, operation){
    if(operation === "equals"){
        getResult()
    }else {
        const typeOperation = operation
        number1 = screen.textContent
        screen.textContent = elem.textContent
        operationStatus = true
        return {number1, typeOperation}
    }  
}
function getResult() {
    let number2 = parseFloat(screen.textContent.replace(',', '.'))
    number = parseFloat(data.number1.replace(',', '.'))
    
    if(!isNaN(number2)){
        switch (data.typeOperation) {
            case 'add':
                screen.textContent = number + number2
                break;
            case 'minus':
                screen.textContent = number - number2
                break;
            case 'multiply':
                screen.textContent = number * number2
                break;
            case 'divide':
                if(number2 !== 0){
                    screen.textContent = number / number2
                }else {
                    screen.textContent = 'Error'
                }
                break;
            default:
                break;
        }
        operationDone = true
    }else {
        screen.textContent = 'Error'
    }
}
function doFunction(func) {
    switch (func) {
        case "reset":
            screen.textContent = '0'
            number1 = 0
            break;
        case "undo":
            if(screen.textContent !== "0"){
                if(screen.textContent.length === 1){
                    screen.textContent = "0"
                }else{
                    screen.textContent = screen.textContent.substring(0, screen.textContent.length - 1)
                }
            }
            break;
        default:
            break;
    }
}
calculator()

// reset cuando acaba la operacion

