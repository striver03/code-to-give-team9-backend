const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  // apiKey: process.env.OPENAI,
  apiKey : "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"
});
const openai = new OpenAIApi(configuration);
// const { baseQuestion, formQuestions } = require("../testing/data");
let history = [{role:"user",content:`I'm conducting a survey to analyze the behavior of drug addicted people in Kerala. The question can be of one of the following types - 
1. Single-Correct Question:
{
"type": "single-correct",
"text": "xyz",
"options": ["optionA", "optionB", "optionC"]
}

Explanation: This is a single correct question where the respondent is expected to choose one option from the given options (optionA, optionB, optionC) as the correct answer.

2. Multi-Correct Question:
{
"type": "multi-correct",
"text": "xyz",
"options": ["optionA", "optionB", "optionC"]
}

Explanation: This is a multi-correct question where the respondent is expected to choose one or more options from the given options (optionA, optionB, optionC) as the correct answers. Multiple options can be selected.

3. Slider Question:
{
"type": "slider",
"text": "xyz",
"maxLength": xx,
"minLength": yy
}

Explanation: This is a range question where the respondent is expected to provide a response within a specified range. The question (xyz) is accompanied by a slider that can be adjusted by the respondent. The response should fall between the minimum length (yy) and maximum length (xx) specified.

4. Text Question:
{
"type": "text",
"text": "xyz"
}

Explanation: This is a subjective question where the respondent is expected to provide a free-text response to the question (xyz). There are no predefined options or restrictions on the answer format, allowing the respondent to express their answer in their own words.

There would also be a language parameter which denoted the language in which the question is to be modified.

Now, I'll provide you with questions in the format stated above. Use the data about the user that you'll collect on the fly to modify the question and make it more personalize and relevant to the user. Make sure the modified question is relevant with the options (if any) and the type. The meaning of the statement should be same as the original question.

Some examples of responses of the question are -

If asked : "Have you been offered drugs by anyone?"
The response should be the question integrated with the information of user that you know already. Like if you know the stress level of the user (which is high), you can modify the question as - "Based on your higher stress level, have you been offered drugs by anyone?"

If asked: "How easy do you believe it is to access drugs in your local area?"
If you know the locality of the user already, then try to integrate that information in the question. Like if you know the locality of user (which is Kunnar), you can modify the question as - "How easy do you believe is to access drugs in Kunnar?"

In this manner, you should treat all the questions i.e. using the responses of past questions to personalize the current question.
`}];


const getnextQues = async (req, res) => {
  //The previous question and nect question fields will be custom (not including the key and the next and the options will
  //be a simple array of strings)
  let {text,type,options,minLength,maxLength,prevData,isModifiable} = req.body;
  //In the body we will get the current question (which tht gpt will change) and the response of the previous question
  
  let curr = {text,type};
  if(type ==='slider')
  {
    curr.minLength = minLength;
    curr.maxLength = maxLength;
  }
  else if(type === 'single-correct' || type === 'multi-correct')
  {
    curr.options = options
  }
  else if(type!=="text")
  {
    return res.status(400).json({success:false,msg:"This is not a valid type of question!"});
  }
  
  if(!prevData) //when first question
  {
     return res.status(200).send({modifiedQues:curr.text});
  }



  
  
  //Adding the prompt to add the previous question's reponse
  let p = `I'm currently providing you the question with it's response by the user. Store it in your memory to make the questions asked in future more aligned to user's mindset. You don't need to modify this question, just collect the information about the user.
        ${JSON.stringify(prevData)}`;

  history.push({role:"user",content: p});
  
  if(!isModifiable) //doing it here because the previous question and its response will be stored none the less
  {
    return res.status(200).send({modifiedQues:curr.text});
  }

  let prompt = getQuesPrompt(curr);

    history.push({
      role: "user",
      content: prompt,
    });

    try {
      const resp = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: history,
        temperature: 0.7,
        // max_tokens:1000,
      });
      
      // console.log(resp.data.choices[0].message.content);
      const response = JSON.parse(resp.data.choices[0].message.content);
      if(Object.keys(response).length === 0)
      {
        //  console.log("Not modified");
         res.status(200).json({modifiedQues:curr.text});
      }
      else res.status(200).json({modifiedQues:response.text});
      
    } catch (error) {
      res.send(error);
    }
};

const getQuesPrompt = (curr) => {
  let prompt = `I'm giving you the question in JSON format. Based on the things you know about the user, personalize the question and return that in JSON format. Make sure you do not change the pronounce and context of the question. The question should be framed keeping in mind the type and options (if any) of the actual question and should not change the context of the actual question. The question in JSON format is and give the resonse in the similar format (keep options same though)-  ${JSON.stringify(curr)}`;
  return prompt;
};

module.exports = {getnextQues};
