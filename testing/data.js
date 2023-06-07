let baseQuestion = [
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

let formQuestions = [
  {
    text: "On a scale of 1 to 10, with 1 being not at all and 10 being extremely, how would you rate your current level of stress or emotional distress?",
    type: "slider",
    maxScale : 10,
    minScale : 1,
  },
  {

    text: "Have you personally observed or been offered drugs by your peers or acquaintances?",
    type: "option",
    option: [
      "Yes, on multiple occasions",
      "Yes, occasionally",
      "No, never",
    ],
  },
  {
    text: "How familiar are you with the potential risks and consequences associated with drug use?",
    type: "option",
    option: [
      "Very familiar",
      "Somewhat familiar",
      "Moderately familiar",
      "Not familiar",
    ],
  },
  {
    text: "Have you personally witnessed any negative consequences resulting from drug use among your peers?",
    type: "option",
    option: ["Yes", "No"],
  },
  {
    text: "Which of the following substances do you believe are commonly used among your peers or in your locality in general? (Multiple correct)",
    type: "option",
    option: ["Alcohol", "Ganja", "Marijuana", "LSD’s"],
  },
  {
    text: "Which sources do you think have the most influence on shaping attitudes and beliefs about drug use?",
    type: "option",
    option: [
      "Friends and peers",
      "Family members",
      "Media (like movies, music, etc.)",
      "Educational programs",
    ],
  },
  {
    text: "How easy do you believe it is to access drugs in your local area?",
    type: "option",
    option: [
      "Very difficult",
      "Somewhat difficult",
      "Moderately easy",
      "Very easy",
    ],
  },
  {
    text: "Do you believe there are sufficient resources and support available in your community to help individuals struggling with drug addiction?",
    type: "option",
    option: ["Yes", "No", "Unsure"],
  },
  {
    text: "How would you rate the effectiveness of the current drug rehabilitation programs in your community?",
    type: "option",
    option: [
      "Highly effective",
      "Moderately effective",
      "Somewhat effective",
      "Ineffective",
    ],
  },
  {
    text: "Have you ever felt curious about trying drugs, even if it was just out of experimentation?",
    type: "option",
    option: ["Yes", "No"],
  },
  {
    text: "Are you aware of any family members, friends, or acquaintances who have struggled with drug addiction?",
    type: "option",
    option: ["Yes", "No"],
  },
  {
    text: "How would you describe your overall perception of drug addiction in terms of its impact on individuals and society?",
    type: "option",
    option: [
      "Highly damaging and concerning",
      "Somewhat damaging and concerning",
      "Moderately damaging and concerning",
      "Not very damaging and concerning",
    ],
  },
  {
    text: "How comfortable do you feel discussing your concerns or questions about drugs with trusted adults, such as parents, teachers, or counselors?",
    type: "option",
    option: [
      "Very comfortable",
      "Somewhat comfortable",
      "Moderately comfortable",
      "Not comfortable",
    ],
  },
];


module.exports = {baseQuestion,formQuestions};
