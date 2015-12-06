import { MOUNT, ROUTE_TO_PAGE } from '../constants/GeneralActionTypes';

const initialState = {
  mounted: false,
  page: '/login'
};

export default function general(state = initialState, action) {
  switch (action.type) {
    case ROUTE_TO_PAGE:
      return {
        ...state,
        page: action.page
      }

    case MOUNT:
      return {
        ...state,
        mounted: true
      };
    default:
      return state;
  }
}
