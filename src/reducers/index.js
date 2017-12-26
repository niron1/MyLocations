import { combineReducers } from 'redux';
import LocationsReducer from './locations';
import CategoriesReducer from './categories';
import GeneralReducer from './general';

export default combineReducers({
  LocationsReducer,
  CategoriesReducer,
  GeneralReducer,
});
