import { LOADED_QUESTIONS, ANSWER_QUESTION, CLEAR_ANSWERED_QUESTIONS } from '../constants/SurveyActionTypes';

const initialState = {
  questions: [],
  answeredQuestions: [],
  loaded: false
};

export default function survey(state = initialState, action) {
  const { questions, responseValue } = action;

  switch(action.type) {
    case LOADED_QUESTIONS:
      return {
        ...state,
        loaded: true,
        questions
      }

    case ANSWER_QUESTION:
      return {
        ...state,
        // Remove the answered question from the front
        questions: state.questions.slice(1, state.questions.length),
        answeredQuestions: [
          ...state.answeredQuestions,
          {
            id: state.questions[0].id,
            value: responseValue
          }
        ]
      }

    case CLEAR_ANSWERED_QUESTIONS:
      return {
        ...state,
        answeredQuestions: []
      }

    default:
      return state;
  }
}
