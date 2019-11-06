//CALCULATOR OOP

class Operations {
  constructor(num1, num2) {
  }

  defineDecimals(result) {
    if(result.toString().split("").includes(".") === true)
      return Number.parseFloat(result.toFixed(3));
  }

  add(num1, num2) {
    let acc = num1 + num2;
    return this.defineDecimals(acc) || acc;
  }

  sub(num1, num2) {
    let acc = num1 - num2;
    return this.defineDecimals(acc) || acc;
  }

  mul(num1, num2) {
    let acc = num1 * num2;
    return this.defineDecimals(acc) || acc;
  }

  div(num1, num2) {
    let acc = num1 / num2;
    return num2 === 0 ? "You cannot divide by 0" : this.defineDecimals(acc) || acc;
  }

  sqrt(num1) {
    let acc = Math.sqrt(num1);
    return this.defineDecimals(acc) || acc;
  }
}

class Calculator {
  constructor() {
    this.insertNumbers();
    this.operations = new Operations()
    this.logic();
  }

  insertNumbers() {
    this.num1 = prompt("Please, insert your first number");
    this.num2 = prompt("Please, insert your second number");
  }

  logic() {
    let arrayResults = [];
    if(this.num1 === null || this.num2 === null || this.num1 === "" || this.num2 === "") {
      this.num1 === null || this.num1 === "" ? console.log("You only inserted one number.\n√" + this.num2 + " = " + this.operations.sqrt(this.num2)) : console.log("You only insert one number.\n√" + this.num1 + " = " + this.operations.sqrt(this.num1))
    } else if(isNaN(this.num1) || isNaN(this.num2)) {
      console.log("Please, insert only numbers");
    } else {
      this.num1 = parseInt(this.num1);
      this.num2 = parseInt(this.num2);
      arrayResults.push(
        this.operations.add(this.num1, this.num2), this.operations.sub(this.num1, this.num2), this.operations.mul(this.num1, this.num2), this.operations.div(this.num1, this.num2));
      console.log(`${this.num1} + ${this.num2} = ${arrayResults[0]}\n${this.num1} - ${this.num2} = ${arrayResults[1]}\n${this.num1} x ${this.num2} = ${arrayResults[2]}\n${this.num1} / ${this.num2} = ${arrayResults[3]}`)
    }
  }
}

new Calculator()