import * as types from '../constants/SurveyActionTypes';

export function loadedQuestions(questions) {
  return {
    type: types.LOADED_QUESTIONS,
    questions
  }
}
