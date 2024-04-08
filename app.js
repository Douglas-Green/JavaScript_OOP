import chalk from "chalk";
import wrap from "word-wrap";

const exercise1Desc =
  "Created a class Person using class notation. Then declared the constructor method with names, pets, residence, and hobbies as parameters. Then I had to assign the 'this' dot property to all the parameters. Added two methods to the Person class addHobby() and removeHobby(). As well as a greeting() method which I logged to the console.";

const exercise2Desc =
  "Also using class notation, I created a Coder class that inherits from the Person class. I declared the constructor method with the same parameters as the Person class by using the 'super' keyword. I also added an occupation property to the Coder class. I then overrode the greeting() method from Person and logged a different greeting() that is customized for the Coder class.";

const exercise3Desc =
  "I created a variable and assigned a Person object to it using the 'new' button (NO PUN INTENDED) followed by the class constructor (Person). THen created an instance of the Coder class and assigned it to a variable. I then chose a fancy way to check all of my work by returning the toString() method of both the Person and Coder objects. This way I can see all the properties of the objects in a nice, formatted way. Probably not needed, but I enjoy the practice as well as the formatting.\n";

const exercise4Desc =
  "I created a Calculator class using class notation. Created a result property within the calculator constructor with an initial value of '0'. Then declared methods to represent basic arithmetic operations. These methods have two parameters, 'a' and 'b' and depending on which method is invoked, the result property is updated with the result of the operation. I also added a displayResult() method that logs the result to the console. EXTRA: I added a simple 'if' statement to check whether or not 2 values were in deed passed to the method. If only 1 value was given as an argument, then the code with set the objects current result property to the first argument in the operation. This will give the calculator the ability to chain operations together.";

const wrappedText1 = wrap(exercise1Desc, { width: 60 });
const wrappedText2 = wrap(exercise2Desc, { width: 60 });
const wrappedText3 = wrap(exercise3Desc, { width: 60 });
const wrappedText4 = wrap(exercise4Desc, { width: 60 });

// Exercise 1 Section
console.log(chalk.bold.underline("EXERCISE 1:\n==========\n"));
console.log(chalk.cyanBright(wrappedText1));

class Person {
  constructor(name, pets, residence, hobbies) {
    this.name = name;
    this.pets = pets;
    this.residence = residence;
    this.hobbies = hobbies;
  }

  addHobby(hobby) {
    this.hobbies.push(hobby);
  }

  removeHobby(hobby) {
    const index = this.hobbies.indexOf(hobby);
    if (index > -1) {
      this.hobbies.splice(index, 1);
    }
  }

  greeting() {
    console.log(`Hello, fellow person!`);
  }

  toString() {
    let output = "";
    for (let key in this) {
      if (this.hasOwnProperty(key) && key !== "occupation") {
        output += `${chalk.green(key)}: ${this[key]}\n`;
      }
    }
    return output;
  }
}

// Exercise 2 Section
console.log(chalk.bold.underline("\nEXERCISE 2:\n==========\n"));
console.log(chalk.blueBright(wrappedText2));

class Coder extends Person {
  constructor(name, pets, residence, hobbies, occupation) {
    super(name, pets, residence, hobbies);
    this.occupation = occupation;
  }

  greeting() {
    console.log("Hello fellow coder!");
  }

  toString() {
    return `${super.toString()}${chalk.green("Occupation")}: ${chalk.green(
      this.occupation
    )}\n`;
  }
}

// Exercise 3 Section
console.log(chalk.bold.underline("\nEXERCISE 3:\n==========\n"));
console.log(chalk.cyanBright(wrappedText3));
console.log("\n");
let person = new Person("John Wick", 2, "Boston, MA", [
  "Gaming",
  "Mountain Climbing",
]);
person.addHobby("Coding");
person.removeHobby("Mountain Climbing");
console.log(person.toString());

let coder = new Coder(
  "Jill Wick",
  0,
  "New York, NY",
  ["Shooting guns", "Stand-Up Comedy"],
  "Full Stack Web Developer"
);
coder.addHobby("Coding");
coder.removeHobby("Shooting guns");
console.log(coder.toString());

// Exercise 4 Section
console.log(chalk.bold.underline("\nEXERCISE 4:\n==========\n"));
console.log(chalk.yellowBright(wrappedText4));

class Calculator {
  constructor() {
    this.result = 0;
    this.lastOperation = "";
    this.lastOperands = [];
    this.history = [];
  }

  calculate(operation, a, b = this.result) {
    const validOperations = ["add", "subtract", "multiply", "divide"];
    if (!validOperations.includes(operation.toLowerCase())) {
      console.log("ERROR: Invalid Operation");
      return;
    }

    this.lastOperation = operation;
    this.lastOperands = [a, b];

    if (arguments.length === 2) {
      b = a;
      a = this.result;
    }

    switch (operation.toLowerCase()) {
      case "add":
        this.result = a + b;
        break;
      case "subtract":
        this.result = a - b;
        break;
      case "multiply":
        this.result = a * b;
        break;
      case "divide":
        if (b === 0) {
          throw new Error("ERROR: Division by zero is not allowed.");
        }
        this.result = a / b;
        break;
      default:
        console.log("ERROR: Invalid Operation");
    }
    this.history.push({
      a: this.lastOperands[0],
      operation: this.lastOperation,
      b: this.lastOperands[1],
      result: this.result,
    });
    this.displayResult();
  }

  displayResult() {
    console.log(
      `The result of the ${
        this.lastOperation
      } operation on ${this.lastOperands.join(" and ")} is: ${this.result}`
    );
  }
  displayHistory() {
    console.table(this.history);
  }

  clearHistory() {
    this.history = [];
  }
}

let calculator = new Calculator();
console.log("\n");
calculator.calculate("add", 3647, 6846846);
calculator.displayResult();
console.log("\n");

calculator.calculate("divide", 2, 29);
calculator.displayResult();
console.log("\n");

calculator.calculate("Subtract", 73647593, 238743793);
calculator.displayResult();
console.log("\n");

console.log("Calculator History");
calculator.displayHistory();
console.log("\n");

console.log("Clearing Calculator History...");
calculator.clearHistory();
calculator.displayHistory();
