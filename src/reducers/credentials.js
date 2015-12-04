import { CLEAR_CREDENTIALS, CHECK_CREDENTIALS, CHECK_CREDENTIALS_SUCCESS,
         CHECK_CREDENTIALS_FAILURE, ADD_CREDENTIALS, ADD_CREDENTIALS_SUCCESS,
         ADD_CREDENTIALS_FAILURE, SWITCH_TO_REGISTERING, SWITCH_TO_LOGIN } from '../constants/CredentialsActionTypes';

const initialState = {
  authenticated: false,
  checkingToken: false,
  loggingIn: false,
  hint: false,
  registering: false
};

export default function credentials(state = initialState, action) {
  const { type, hint } = action;

  switch (type) {
    case CLEAR_CREDENTIALS:
      return initialState;
    case CHECK_CREDENTIALS:
      return {
        ...initialState,
        checkingToken: true
      };
    case CHECK_CREDENTIALS_SUCCESS:
      return {
        ...initialState,
        checkingToken: false,
        authenticated: true
      };
    case CHECK_CREDENTIALS_FAILURE:
      return {
        ...initialState,
        checkingToken: false
      };
    case ADD_CREDENTIALS:
      return {
        ...initialState,
        loggingIn: true
      };
    case ADD_CREDENTIALS_SUCCESS:
      return {
        ...initialState,
        authenticated: true,
        loggingIn: false
      };
    case ADD_CREDENTIALS_FAILURE:
      return {
        ...initialState,
        hint
      };
    case SWITCH_TO_REGISTERING:
      return {
        ...initialState,
        registering: true
      }
    case SWITCH_TO_LOGIN:
      return {
        ...initialState,
        registering: false
      }
    default:
      return state;
  }
}
