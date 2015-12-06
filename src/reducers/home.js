import { LOADED_HOME_INFO, LOAD_HOME_INFO } from '../constants/HomeActionTypes';

const initialState = {
  loading: true,
  name: null,
  surveysCompleted: null,
  activeHours: null
};

export default function home(state = initialState, action) {
  const { name, surveysCompleted, activeHours } = action;

  switch (action.type) {
    case LOAD_HOME_INFO:
      return {
        ...state,
        loading: true
      }

    case LOADED_HOME_INFO:
      return {
        loading: false,
        name: name,
        surveysCompleted: surveysCompleted,
        activeHours: activeHours
      }

    default:
      return state;
  }
}
