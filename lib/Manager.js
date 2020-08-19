// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    // this.github = github;
    this.officeNumber = officeNumber;
  }
  //   getGithub() {
  //     return this.github;
  //   }
  getOffice() {
    return this.officeNumber;
  }
  getRole() {
    return "Manager";
  }
  getOfficeNumber() {
    return 100;
  }
}
module.exports = Manager;
