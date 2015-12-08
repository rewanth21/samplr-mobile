import * as types from '../constants/SurveyActionTypes';

export function loadedQuestions(questions) {
  return {
    type: types.LOADED_QUESTIONS,
    questions
  }
}

export function answerQuestion(responseValue) {
  return {
    type: types.ANSWER_QUESTION,
    responseValue
  }
}

export function clearAnsweredQuestions() {
  return {
    type: types.CLEAR_ANSWERED_QUESTIONS
  }
}
