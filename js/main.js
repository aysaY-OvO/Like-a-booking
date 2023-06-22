import './create-advt.js';
import { setUserFormSubmit } from './user-form.js';
import './page-state.js';
import { createPins } from './map.js';
import { getData } from './api.js';
import { showSuccessMessage } from './alerts.js';

const ADVT_MARKERS_COUNT = 10;

setUserFormSubmit(showSuccessMessage);
getData((offers) => {
  offers.slice(0, ADVT_MARKERS_COUNT).forEach(offer => {
    createPins(offer);
  });
});
