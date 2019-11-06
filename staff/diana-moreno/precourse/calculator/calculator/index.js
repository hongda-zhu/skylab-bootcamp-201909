///PROJECT 1 CALCULATOR

//function that rounds a decimal number if it has more than 3 decimals.

const decimals = function(result) {
  if(result.toString().split("").includes(".") === true) {
    return Number.parseFloat(result.toFixed(3));
  }
};

//One function for every mathematical operation. The return of this functions will choose between return a rounded decimal number or return an integer, It'll depend on the result.

const add = function(num1, num2) {
  let acc = num1 + num2;
  return decimals(acc) || acc;
};
const sub = function(num1, num2) {
  let acc = num1 - num2;
  return decimals(acc) || acc;
};
const mul = function(num1, num2) {
  let acc = num1 * num2;
  return decimals(acc) || acc;
};
const div = function(num1, num2) {
  let acc = num1 / num2;
  if(num2 === 0) {
    return "You cannot divide by 0"
  } else {
    return decimals(acc) || acc;
  }
};
const sqrt = function(num1) {
  let acc = Math.sqrt(num1);
  return decimals(acc) || acc;
};

//main function calculator
function calculator() {
  let num1 = prompt("Please, insert your first number");
  let num2 = prompt("Please, insert your second number");
  let arrayResults = [];
  if(num1 === null || num2 === null || num1 === "" || num2 === "") {
    num1 === null || num1 === "" ? console.log("You only inserted one number.\n√" + num2 + " = " + sqrt(num2)) : console.log("You only insert one number.\n√" + num1 + " = " + sqrt(num1))
  } else if(isNaN(num1) || isNaN(num2)) {
    console.log("Please, insert only numbers");
    calculator();
  } else {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    arrayResults.push(
      add(num1, num2), sub(num1, num2), mul(num1, num2), div(num1, num2));
    console.log(`${num1} + ${num2} = ${arrayResults[0]}\n${num1} - ${num2} = ${arrayResults[1]}\n${num1} x ${num2} = ${arrayResults[2]}\n${num1} / ${num2} = ${arrayResults[3]}`)
  }
}

calculator();

