const getFormSubmissionID = async (req,res) => {
    const newDoc = await formSubmissionCollection.add({});
    writeFileSync('./local/submissionID.txt',newDoc.id);
    res.send("Form-submission ID generated");
};

const addUserResponse = async (req,res) => {
    const {formID} = req.query;
    const docRef = formCollection.doc(formID);
    const {key,value} = req.body;
    if (!formID || !docRef || !key || !value) {
        return res.send("Invalid response");
    }
    try {
        const submissionID = readFileSync('./local/submissionID.txt','utf-8');
        let data = {};
        data[`${key}`] = value;
        await formSubmissionCollection.doc(submissionID).set(data, {merge: true});
        await formSubmissionCollection.doc(submissionID).set({form: docRef}, {merge: true});
        res.send("Submission Success!");
    } catch (error) {
        console.log(error);
        res.send("Submission Failed!");
    }
}
