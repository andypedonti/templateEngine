const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeList = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function basicQuestions() {
  inquirer
    .prompt([
      {
        message: "Enter your name",
        type: "input",
        name: "name",
      },
      {
        message: "What is your email?",
        type: "input",
        name: "email",
      },
      {
        message: "what is your ID?",
        type: "input",
        name: "id",
      },
      {
        message: "What is your position?",
        type: "list",
        name: "role",
        choices: ["manager", "engineer", "intern"],
      },
    ])
    .then((answer) => {
      switch (answer.role) {
        case "manager":
          addManager(answer);

          break;
        case "engineer":
          addEngineer(answer);
          break;
        case "intern":
          addIntern(answer);
          break;
      }
    });
}
basicQuestions();

function addManager(employeeData) {
  inquirer
    .prompt([
      {
        message: "what is your office number?",
        type: "input",
        name: "officeNumber",
      },
    ])
    .then((officeNumberanswer) => {
      const manager = new Manager(
        employeeData.name,
        employeeData.id,
        employeeData.email,
        officeNumberanswer.officeNumber
      );
      employeeList.push(manager);
      askUser();
      writeManager();
    }); //end then
}
function addEngineer(employeeData) {
  inquirer
    .prompt([
      {
        message: "what is your github profile?",
        type: "input",
        name: "github",
      },
    ])
    .then((githubAnswer) => {
      const engineer = new Engineer(
        employeeData.name,
        employeeData.id,
        employeeData.email,
        githubAnswer.github
      );
      employeeList.push(engineer);
      askUser();
    });
}
function addIntern(employeeData) {
  inquirer
    .prompt([
      {
        message: "which school do you attend?",
        type: "input",
        name: "school",
      },
    ])
    .then((internAnswer) => {
      const intern = new Intern(
        employeeData.name,
        employeeData.id,
        employeeData.email,
        internAnswer.school
      );
      employeeList.push(intern);
      askUser();
    });
}

function askUser() {
  inquirer.prompt([
    {
      message: "would you like to add another team member?",
      name: "new team",
      type: "list",
      choices: ["yes", "no"],
    },
  ]);
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

render(employeeList);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
function writeManager() {
  fs.writeFile("managernewfile.html", employeeList, function (err) {
    if (err) throw err;
  });
}
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

//need a recursion
