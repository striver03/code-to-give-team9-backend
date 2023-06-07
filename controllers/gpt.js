const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  // apiKey: process.env.OPENAI,
  apiKey : "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"
});
const openai = new OpenAIApi(configuration);
// const { baseQuestion, formQuestions } = require("../testing/data");
let history = [];

// let index = 1;
// console.log(JSON.stringify(baseQuestion));

//current question submit -> current question res,type or next question
const getnextQues = async (req, res) => {
  let {text,type,options,maxScale,minScale,PrevResponse,PrevType} = req.body; //current question or response
  let curr = {text,type};
  if(type ==='slider')
  {
    curr.minScale = minScale;
    curr.maxScale = maxScale;
  }
  else if(type === 'option')
  {
    curr.options = options
  }
  else
  {
    return res.status(400).json({success:false,msg:"This is not a valid type of question!"});
  }
  
  if(!PrevType || !PrevResponse)
  {
    return res.status(200).send(curr);
  }



  let prevRes = {type:PrevType,response:PrevResponse};
  
  let p = `I'm giving you the response of the user of the previous question. Analyze and store it in your memory and use that to make the questions more personalized for the user. Gather some information around the question and it's response to analyze the behavior of user which can then help to modify the question statement as close to user's mindset as possible. The response in JSON format is -${JSON.stringify(prevRes)}`;

  history.push({"role":"user","content": p});


  let prompt = getQuesPrompt(curr);
  // if (typeof prompt === "string") {
    history.push({
      role: "user",
      content: prompt,
    });

    try {
      const resp = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: history,
        // temperature: 0.2,
        // max_tokens:1000,
      });
  
      // let finalNextQuestion = curr;
      // finalNextQuestion.text = resp.data.choices[0].message.content;
      // history.push(resp.data.choices[0].message);
      // history.push({"role":"assistant","content":finalNextQuestion});
      
      // res.status(200).json({ text: resp.data.choices[0].message.content});
      let newQues = JSON.parse(resp.data.choices[0].message.content);
      res.status(200).json({modifiedQues:newQues.text});
      
    } catch (error) {
      res.send(error);
    }

  // } else {
  //   res.status(200).json({ text: "Invalid prompt provided." }); //error (will create custom error class too)
  // }
};


const storeBaseInfo = async (req, res) => {
  let {baseQues} = req.body;
  /*
   The body should contain an array of base question in the format:-
   [
  {
    text: "What is your name?",
    type: "text",
    response : "Abhay"
  },
  {
    text: "What is your age?",
    type: "option",
    option: ["under 18", "18 to 25", "25 to 40", "above 40"],
    response : 1
  },
  {
    text: "What is your locality?",
    type: "option",
    option: ["Munnar", "Kochi", "Wayanad"],
    response : 2
  },
  {
    text : "Are you addicted to drugs?",
    type : "option",
    option:["yes","no"],
    response : 0
  },
  {
    text : "For whom are you fillisng this survey?",
    type : "option",
    option:["loved one","mySelf"],
    response : 1   
  }
];
  */
  //inside this call the getPromptBase and this will run when base questions have been asked
  history.push(...getPromptBase(baseQues));
  res.status(200).json({success:true,msg:"Base Questions, along with their responses has been acquired"})
};

const getPromptBase = (baseQuestion) => {
  let prompt1 =
    `Below are some questions that have been asked from a person who is filling a survey for itself or on behalf of some other person. Kindly look at the responses and the questions that have been asked from the user to get a perspective about the user.Now the questions are in an array , and the array is having objects at each index and these objects are nothing but the questions that have been asked. Each question has a text : which is the question that was asked , a field namely type : this represents the type of question as there can be three types of questions ie, 1)Option type which are the multiple choice questions , 2)Slider one (having a range between the max and the min scale , with the meaning of the scale defined in the question itself) , 3)the text type , which is a subjective question. After these there is a response which corresponds to the answer of the user , in case of option type question the response will be a numeric value which represents the value in the index(which is the number in response) of the option for that question , in the slider it is a numeric value between the max and the min scale and in the text type it is a textual response. The questions are given as ${JSON.stringify(baseQuestion)}`;
  
    let prompt2 = `In the upcoming questions that I'll ask, use the data about the user you've collected so far and try to put it in the question to modify and align it to the user's mindset as close as possible. For example - If you know the stress level of the user from the responses you get by going through the questions, and the next question asked is - have you been offered drugs by your peers, then try to integrate the stress level into this question as respond something like - Based on your higher stress level, have you ever been offered drugs by your peers? This information will help us know your social circle better.
    So just remember this type of pattern everytime you modify/personalize the question.`
    
    // console.log(prompt1,prompt2);
    return [{"role":"user","content":prompt1},{"role":"user","content":prompt2}];
};

const getQuesPrompt = (curr) => {
  let prompt = `I'm giving you the question in JSON format. Your response should only be the question in JSON format which is personalized wrt to the user's data collected. The question should be framed keeping in mind the type and options (if any) of the actual question. Please don't respond any extra statement. The question in JSON format is - ${JSON.stringify(curr)}`;
  return prompt;
};

module.exports = {getnextQues,storeBaseInfo};
