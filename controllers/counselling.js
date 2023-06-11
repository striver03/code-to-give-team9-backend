import db from "../db/connect.js";
const counsellingBookedCollection = db.collection("counselling-booked");

const nextIdFromRef = (ref) => {
  if (typeof ref === "string") {
    return ref;
  }
  let segments = ref._path.segments;
  let newNext = segments[segments.length - 1];

  return newNext;
};

const getCounsellingData = async (req, res) => {
  counsellingBookedCollection
    .get()
    .then(async (querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => doc.data());
      const data = [];
      for (let idx in docs) {
        console.log(docs[idx].submission);

        let formSubmissionId =
          typeof docs[idx].submission === "string"
            ? docs[idx].submission
            : nextIdFromRef(docs[idx].submission);

        if (formSubmissionId == null) continue;

        const formSubmissionDocRef = db
          .collection("form-submissions")
          .doc(formSubmissionId);
        const snapshot = await formSubmissionDocRef.get();
        data.push(snapshot.data());
      }
      res.status(200).json({ data: data.filter((d) => d != null) });
    })
    .catch((error) => {
      console.log(error);
      res.send("failed with error: " + error);
    });
};

export { getCounsellingData };
