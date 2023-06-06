const db = require("../db/connect");
const { FormDoesNotExistError } = require("./errors/form");

/*
Model for the form object
*/
class Form {
  /**
  Constructor for the form object

  @typedef {Object} Form
  @property {string} name - The name of the form
  @property {string} createdBy - The user who created the form
  @property {string} id - The id of the form
  @param {Form} form - The form object
  */
  constructor({ name, createdBy, id = null }) {
    if (name == null || name === "") {
      throw new Error("Form name is undefined");
    }

    if (createdBy == null || createdBy === "") {
      throw new Error("Form createdBy is undefined");
    }

    this.name = name;
    this.createdBy = createdBy;
    this.id = id;
  }

  /**
  Returns a JSON representation of the form
  @return {Object} - The JSON representation of the form
  */
  json() {
    return {
      name: this.name,
      createdBy: this.createdBy,
      id: this.id,
    };
  }
}

class FormDao {
  /**
  Fetches a form from the database
  @param {string} id - The id of the form to fetch
  @return {Promise<Form>} - The form object

  @throws {Error} - If the form does not exist
  */
  static async getForm(id) {
    const formRef = db.collection("forms").doc(id);
    const formDoc = await formRef.get();

    if (!formDoc.exists) {
      throw new FormDoesNotExistError();
    }

    const form = new Form({
      name: formDoc.data().name,
      createdBy: formDoc.data().createdBy,
      id: formDoc.id,
    });

    return form;
  }

  /**
  Creates a form in the database
  @param {Form} form - The form to create

  @return {Promise<Form>} - The form object
  */
  static async createForm(form) {
    const formsRef = db.collection("forms");

    const setForm = await formsRef.add({
      name: form.name,
      createdBy: form.createdBy,
    });

    return new Form({
      name: form.name,
      createdBy: form.createdBy,
      id: setForm.id,
    });
  }
}

module.exports = { Form, FormDao };
