const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: process.env.OPENAI
})
const openai = new OpenAIApi(configuration)
// let history = [{"role": "user", "content": "Hello!"},
// {"role":"assistant", "content":"Hello how can i help you!"},
// {"role":"user", "content":"my gender is male"},
// {"role":"assistant", "content":"Ok got it!"},];

let history = [];

const getInfo = async (req, res)=>{
  if (typeof req.body.prompt === "string") {
    history.push({
      "role":"user", "content":req.body.prompt
    });
    const response = await openai.createChatCompletion({
      //below is used for a single prompt only (with the createCompetion method)
      // model: "text-davinci-003",
      // prompt: req.body.prompt,
      // temperature: 0.2,
      // max_tokens: 1000

      //below can be used for the message presevation
      model: "gpt-3.5-turbo",
      messages: history,
      temperature: 0.2,
    })
    
    // res.status(200).json({ text: response.data.choices[0].text }) //1st choice
    // console.log(response.data);
    history.push(response.data.choices[0].message); //keep on updating the history (but this will be the response of the assistance not user)
    // console.log(response.data.choices[0].message);
    res.status(200).json({ text: response.data.choices[0].message.content})
  } else {
    res.status(200).json({ text: "Invalid prompt provided." }) //error (will create custom error class too)
  }
}

module.exports = getInfo;