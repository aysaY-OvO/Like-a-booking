const filterList = document.querySelector('.map__filters');
const housingTypeSelect = filterList.querySelector('#housing-type');
const housingPriceSelect = filterList.querySelector('#housing-price');
const housingRoomsSelect = filterList.querySelector('#housing-rooms');
const housingGuestsSelect = filterList.querySelector('#housing-guests');

const _ = window._;

const DEFAULT_VALUE = 'any';
const housingPrice = {
  low: {
    from: 0,
    to: 10000,
  },
  middle: {
    from: 10000,
    to: 50000,
  },
  high: {
    from: 50000,
    to: Infinity,
  },
};

const filterType = (offer) => housingTypeSelect.value === DEFAULT_VALUE || offer.offer.type === housingTypeSelect.value;
const filterRooms = (offer) => housingRoomsSelect.value === DEFAULT_VALUE || offer.offer.rooms === Number(housingRoomsSelect.value);
const filterGuests = (offer) => housingGuestsSelect.value === DEFAULT_VALUE || offer.offer.guests === Number(housingGuestsSelect.value);
const filterPrice = (offer) => housingPriceSelect.value === DEFAULT_VALUE || (offer.offer.price >= housingPrice[housingPriceSelect.value].from && offer.offer.price <= housingPrice[housingPriceSelect.value].to);

const filterFeatures = (offer) => {
  const checkedFeatures = filterList.querySelectorAll('input[name="features"]:checked');
  if (offer.offer.features) {
    return Array.from(checkedFeatures).every((feature) => offer.offer.features.includes(feature.value));
  }
};

const mapFiltersChangeHandler = (cb) => {
  filterList.addEventListener('change', _.debounce(() => {
    cb();
  }, 500));
};

const resetMapFilters = () => {
  filterList.reset();
};

export { filterType, filterRooms, filterGuests, filterPrice, filterFeatures, mapFiltersChangeHandler, resetMapFilters };
