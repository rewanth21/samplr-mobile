import { LOADED_QUESTIONS, ANSWER_QUESTION } from '../constants/SurveyActionTypes';

const initialState = {
  questions: [],
  answeredQuestions: []
};

export default function survey(state = initialState, action) {
  const { questions, responseValue } = action;

  switch(action.type) {
    case LOADED_QUESTIONS:
      return {
        ...state,
        questions
      }

    case ANSWER_QUESTION:
      return {
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

    default:
      return state;
  }
}
