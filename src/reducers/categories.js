import { REMOVE_CATEGORIES, ADD_CATEGORY, EDIT_CATEGORY } from '../actions/constants';

const preloadedState = {
  list: {
    10: { name: 'books' },
    20: { name: 'televisions' },
    30: { name: 'strollers' },
    40: { name: 'computers' },
    50: { name: 'bags' },
    60: { name: 'lamps' },
    70: { name: 'beds' },
    80: { name: 'cellular' },
    90: { name: 'tablets' },
  },
  autonum: 100,
};

export default function CategoriesReducer(state = preloadedState, action) {
  switch (action.type) {
    case REMOVE_CATEGORIES: {
      const newList = Object.assign({}, state.list);
      const keys = Object.keys(state.list);
      Object.values(action.removeList).forEach((item) => {
        delete newList[keys[item]];
      });
      return { ...state, list: newList };
    }
    case ADD_CATEGORY:
      return { ...state, list: Object.assign({}, state.list, { [state.autonum]: { name: action.name } }), autonum: state.autonum + 10 };
    case EDIT_CATEGORY: {
      const list = Object.assign({}, state.list);
      list[action.id] = { name: action.name };
      return { ...state, list };
    }
    default:
      return state;
  }
}
