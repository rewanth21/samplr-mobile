import { LOADED_HOME_INFO, LOAD_HOME_INFO, CREATE_NOTIFICATION, CLEAR_NOTIFICATION } from '../constants/HomeActionTypes';

const initialState = {
  loading: true,
  name: null,
  surveysCompleted: null,
  activeHours: null,
  notification: null
};

export default function home(state = initialState, action) {
  const { name, surveysCompleted, activeHours, notificationText } = action;

  switch (action.type) {
    case LOAD_HOME_INFO:
      return {
        ...state,
        loading: true
      }

    case LOADED_HOME_INFO:
      return {
        ...state,
        loading: false,
        name: name,
        surveysCompleted: surveysCompleted,
        activeHours: activeHours
      }

    case CREATE_NOTIFICATION:
      return {
        ...state,
        notification: notificationText
      }

    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: null
      }

    default:
      return state;
  }
}
