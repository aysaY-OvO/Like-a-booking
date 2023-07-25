import './create-advt.js';
import './page-state.js';
import { setUserFormSubmit, clearUserForm } from './user-form.js';
import { createPins, resetMap } from './map.js';
import { getData } from './api.js';
import { showSuccessMessage } from './alerts.js';
import { filterType, filterRooms, filterGuests, filterPrice, filterFeatures, mapFiltersChangeHandler, resetMapFilters } from './map-filter.js';

const resetButton = document.querySelector('.ad-form__reset');
const ADVT_MARKERS_COUNT = 10;

setUserFormSubmit(showSuccessMessage);
getData((data) => {
  createPins(data);
  mapFiltersChangeHandler(() => {
    createPins(data
      .slice()
      .filter((offer) => filterType(offer) && filterRooms(offer) && filterGuests(offer) && filterPrice(offer) && filterFeatures(offer)))
      .slice(0, ADVT_MARKERS_COUNT);
  });
  buttonResetHandler(() => {
    createPins(data.slice(0, ADVT_MARKERS_COUNT));
  });
});

const buttonResetHandler = (cb) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetMap();
    resetMapFilters();
    clearUserForm();
    cb();
  });
};
