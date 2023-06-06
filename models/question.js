
/**
Abstract class for a question.

@abstract
@class Question
*/
class Question {

  constructor() {
    if (this.constructor === Question) {
      throw new TypeError('Abstract class "Question" cannot be instantiated directly.');
    }
  }

  /**
  Every question has a type. This method returns the type of the question.

  # Example
  for a text question, this method would return {text: `<some-text>`, maxLength: `<some-number>`}
  */
  getParameters() { }
}

/**
A text question.
@class TextQuestion
@extends Question

*/
class TextQuestion extends Question {
  /**
  Constructor for the text question
  @param {number} maxLength - The maximum length of the answer to the question
  @param {string} text - The text of the question
  */
  constructor(maxLength, text) {
    this.maxLength = maxLength;
    this.text = text;
  }

  /**
  This method returns the type of the question and additional parameters required for the question.


  @typedef {Object} TextQuestionParameters
    @property {string} type - The type of the question
    @property {string} text - The text of the question
    @property {number} maxLength - The maximum length of the answer to the question


  @returns {TextQuestionParameters} The parameters of the question
  */
  getParameters() {
    return { type: 'text', text: this.text, maxLength: this.maxLength };
  }
}

/**
A MCQ question.
@class OptionQuestion
@extends Question

*/
class OptionQuestion extends Question {

  /**
  Constructor for the text question
  @param {string} text - The text of the question
  @param {string[]} options - The options for the question
  */
  constructor(options, text) {
    this.options = options;
    this.text = text;
  }

  /**
  This method returns the type of the question and additional parameters required for the question.

  @typedef {Object} OptionQuestionParameters
    @property {string} type - The type of the question
    @property {string} text - The text of the question

  @returns {OptionQuestionParameters} The parameters of the question
  */
  getParameters() {
    return { type: 'option', text: 'text', options: this.options };
  }

}

module.exports = { TextQuestion, OptionQuestion };
