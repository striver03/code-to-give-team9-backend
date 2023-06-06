/**
Error thrown when a form does not exist
*/
class FormDoesNotExistError {
  constructor(message = "Form does not exist") {
    this.message = message;
    this.name = "FormDoesntExistError";
  }
}

module.exports = {
  FormDoesNotExistError,
};
