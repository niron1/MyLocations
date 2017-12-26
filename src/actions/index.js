import { REMOVE_CATEGORIES, ADD_CATEGORY, EDIT_CATEGORY,
  REMOVE_LOCATIONS, ADD_LOCATION, EDIT_LOCATION,
  OPEN_SNACKBAR, CLOSE_SNACKBAR, CHANGE_SORT } from './constants';

export function removeCategories(removeList) {
  return {
    type: REMOVE_CATEGORIES,
    removeList: Object.assign({}, removeList),
  };
}
export function addCategory(name) {
  return {
    type: ADD_CATEGORY,
    name,
  };
}
export function editCategory(id, name) {
  return {
    type: EDIT_CATEGORY,
    id,
    name,
  };
}
export function removeLocations(removeList) {
  return {
    type: REMOVE_LOCATIONS,
    removeList: Object.assign({}, removeList),
  };
}
export function addLocation(obj) {
  return {
    type: ADD_LOCATION,
    obj,
  };
}
export function editLocation(id, obj) {
  return {
    type: EDIT_LOCATION,
    id,
    obj,
  };
}
export function openSnackbar(snackbarMsg) {
  return {
    type: OPEN_SNACKBAR,
    snackbarMsg,
  };
}
export function closeSnackbar() {
  return {
    type: CLOSE_SNACKBAR,
  };
}

export function changeSort(category) { // -1 = alphabet
  return {
    type: CHANGE_SORT,
    category,
  };
}
