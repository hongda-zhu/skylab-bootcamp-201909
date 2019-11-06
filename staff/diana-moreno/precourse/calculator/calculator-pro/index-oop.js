//CALCULATOR PRO- OOP

class Operations {
  constructor(num1, num2) {

  }

  defineDecimals(result) {
    if(result.toString().split("").includes(".") === true) {
      return Number.parseFloat(result.toFixed(3));
    }
  }

  add() {
    let acc = 0;
    for(let i in arguments) {
      acc += arguments[i];
    }
    return this.defineDecimals(acc) || acc;
  }

  sub() {
    let acc = arguments[0];
    for(let i = 1; i < arguments.length; i++) {
      acc -= arguments[i];
    }
    return this.defineDecimals(acc) || acc;
  }

  mul() {
    let acc = 1;
    for(let i in arguments) {
      acc *= arguments[i];
    }
    return this.defineDecimals(acc) || acc;
  }

  div() {
    let acc = arguments[0];
    for(let i = 1; i < arguments.length; i++) {
      if(arguments[i] === 0) {
        return "You cannot divide between 0"
      }
      acc /= arguments[i];
    }
    return this.defineDecimals(acc) || acc;
  }

  sqrt() {
    let acc = Math.sqrt(arguments[0]);
    return this.defineDecimals(acc) || acc;
  }
}

class Calculator {
  constructor() {
    this.userNumbers = [];
    this.addNumbers();
    this.operations = new Operations()
    this.getResults(this.userNumbers);
    this.calculateAgain();
  }

  addNumbers() {
    let answer = confirm("Do you want to add a number?")
    if(!answer) {
      console.log("Ok, it's enough to add numbers.")
    } else {
      let num = prompt("Please, insert your number.");
      if(isNaN(num) || num === "") {
        console.log("Please, insert only numbers.");
        this.addNumbers();
      } else if(num === null) {
        console.log("Ok, we won't add more numbers.")
      }
      else {
        console.log("Your number is " + num);
        this.userNumbers.push(parseInt(num));
        this.addNumbers();
      }
    }
  }

  getResults(numbers) {
    console.log("Your numbers are: " + numbers)
    numbers.length === 1
      ? console.log(`You only inserted one number.\n√${numbers} = ${this.operations.sqrt(numbers)}`)
      : console.log(`Addition = ${this.operations.add(...numbers)}\nSubtraction = ${this.operations.sub(...numbers)}\nMultiplication = ${this.operations.mul(...numbers)}\nDivision = ${this.operations.div(...numbers)}`)
  }

  calculateAgain() {
    confirm('Do you want to calculate again?') ? new Calculator() : alert("Ok, bye!")
  }
}

new Calculator();