const createQuestion = async (req,res) => {
    const {isFirst,prevID,prevOptionIdx} = req.query;
    const {type,key,text,required,isModifiable,options,minLength,maxLength} = req.body;

    const formID = readFileSync('./local/formID.txt', 'utf-8');
    const formRef = db.collection('forms').doc(formID);
    const questionCollection = db.collection('forms').doc(formID).collection('questions');

    const newQuestion = await questionCollection.add({});
    const questionID = newQuestion.id;
    const currentQuestionRef = formRef.collection('questions').doc(questionID);

    if (!type || !key || !text || required === undefined || isModifiable === undefined) {
        return res.status(400).send('Invalid Query');
    }

    if (isFirst === 'true') {
        formRef.set({start: currentQuestionRef}, {merge: true});
    }

    if (prevID) {
        const prevQuestionRef = formRef.collection('questions').doc(prevID);
        if (prevOptionIdx) {
            const snapshot = await prevQuestionRef.get();
            const arr = snapshot.data()['options'];
            for (const idx in prevOptionIdx) {
                arr[idx].next = currentQuestionRef;
            }
            prevQuestionRef.set({options: arr}, {merge: true});
        }
        else {
            prevQuestionRef.set({next: currentQuestionRef}, {merge: true});
        }
    }

    if (type === 'single-correct') {
        if (!options) {
            return res.status(404).send('Options not found');
        }
        await questionCollection.doc(questionID).set({
            id: questionID,
            type: type,
            key: key,
            isModifiable: isModifiable,
            required: required,
            options: options,
            text: text
        });
        return res.status(200).send("Success Single-Correct Question");
    }
    else if (type === 'multi-correct') {
        if (!options) {
            return res.status(404).send('Options not found');
        }
        await questionCollection.doc(questionID).set({
            id: questionID,
            type: type,
            key: key,
            isModifiable: isModifiable,
            required: required,
            options: options,
            text: text
        });
        return res.status(200).send("Success Multi-Correct Question");
    }
    else if (type === 'text') {
        await questionCollection.doc(questionID).set({
            id: questionID,
            type: type,
            key: key,
            isModifiable: isModifiable,
            required: required,
            text: text
        });
        return res.status(200).send("Success Text Question");
    }
    else if (type === 'slider') {
        if (!minLength || !maxLength) {
            return res.status(404).json({error: 'Limits not defined!'});
        }
        await questionCollection.doc(questionID).set({
            id: questionID,
            type: type,
            key: key,
            text: text,
            isModifiable: isModifiable,
            required: required,
            minLength:minLength,
            maxLength:maxLength,
        });
        return res.status(200).send("Success Slider Question");
    }
    else {
        return res.status(404).json({error: 'Invalid Question Type'});
    }
}