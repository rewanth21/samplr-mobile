import { LOADED_QUESTIONS } from '../constants/SurveyActionTypes';

const initialState = {
  questions: [],
  answeredQuestions: []
};

export default function survey(state = initialState, action) {
  const { questions } = action;

  switch(action.type) {
    case LOADED_QUESTIONS:
      return {
        ...state,
        questions
      }

    default:
      return state;
  }
}
