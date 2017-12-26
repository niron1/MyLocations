import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from '../actions/constants';

const preloadedState = {
  snackbarMsg: '',
};

export default function GeneralReducer(state = preloadedState, action) {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return { ...state, snackbarMsg: action.snackbarMsg };
    case CLOSE_SNACKBAR:
      return { ...state, snackbarMsg: '' };
    default:
      return state;
  }
}
