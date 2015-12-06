import * as types from '../constants/GeneralActionTypes';

export function routeToPage(page) {
  return {
    type: types.ROUTE_TO_PAGE,
    page
  }
}

export function mount() {
  return {
    type: types.MOUNT
  };
}
