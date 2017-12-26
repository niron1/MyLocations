import { REMOVE_LOCATIONS, ADD_LOCATION, EDIT_LOCATION, CHANGE_SORT } from '../actions/constants';

const preloadedState = {
  list: {
    10: { name: 'tel aviv', address: 'Rotschild', lat: 31.7965334, lon: 35.0349279, category_id: 10 },
    20: { name: 'jerusalem', address: 'Rotschild', lat: 31.7965334, lon: 35.0349279, category_id: 20 },
    30: { name: 'new york', address: 'Rotschild', lat: 40.6976684, lon: -74.2605625, category_id: 30 },
    40: { name: 'los angeles', address: 'Rotschild', lat: 34.0207289, lon: -118.692618, category_id: 30 },
    50: { name: 'colorado', address: 'Rotschild', lat: 38.9806097, lon: -107.8000352, category_id: 50 },
    60: { name: 'budapest', address: 'Rotschild', lat: 47.4813598, lon: 18.9898742, category_id: 20 },
    70: { name: 'connecticut', address: 'Rotschild', lat: 41.5004267, lon: -73.3193536, category_id: 10 },
    80: { name: 'seattle', address: 'Rotschild', lat: 47.6131742, lon: -122.4824933, category_id: 50 },
    90: { name: 'oregon', address: 'Rotschild', lat: 44.1273266, lon: -122.8325195, category_id: 30 },
  },
  autonum: 100,
  sort: -1,
};

export default function LocationsReducer(state = preloadedState, action) {
  switch (action.type) {
    case REMOVE_LOCATIONS: {
      const newList = Object.assign({}, state.list);
      const keys = Object.keys(state.list);
      Object.values(action.removeList).forEach((item) => {
        delete newList[keys[item]];
      });
      return { ...state, list: newList };
    }

    case ADD_LOCATION:
      return { ...state, list: Object.assign({}, state.list, { [state.autonum]: action.obj }), autonum: state.autonum + 10 };

    case EDIT_LOCATION: {
      const list = Object.assign({}, state.list);
      list[action.id] = action.obj;
      return { ...state, list };
    }

    case CHANGE_SORT:
      return { ...state, sort: action.category };

    default:
      return state;
  }
}
