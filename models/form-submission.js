// type formSubmission = { [string]: number|string|boolean|Array<number|string|boolean> }
// Make this a JS Doc comment

const db = require("../db/connect");

class FormSubmissionDao {
  static async find(params) {
    const { district } = params;
    let formSubmissionsRef = db.collection("form-submissions");
    let query = formSubmissionsRef;

    if (district) {
      query = query.where("district", "==", district);
    }

    const querySnapshot = await query.get();

    const formSubmissions = [];
    querySnapshot.forEach((doc) => {
      formSubmissions.push(doc.data());
    });

    return formSubmissions;
  }
}

module.exports = { FormSubmissionDao };
