import { combineReducers } from 'redux';
import * as types from './actions';

const sideMenu = (state = false, action) => {
  switch (action.type) {
    case types.MENU_OPEN:
      return true;
    case types.MENU_CLOSE:
      return false;
    default:
      return state;
  }
};


export const isMenuVisible = state => state.sideMenu;

export default combineReducers({ sideMenu });