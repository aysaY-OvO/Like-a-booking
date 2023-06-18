import { activeState, inActiveState } from './page-state.js';
import { renderOffer } from './create-advt.js';

const adForm = document.querySelector('.ad-form'),
  mapFilters = document.querySelector('.map__filters'),
  addressInput = adForm.querySelector('#address');

const L = window.L;

const map = L.map('map-canvas');
inActiveState(adForm);
inActiveState(mapFilters);

map.on('load', () => {
  activeState(adForm);
  activeState(mapFilters);
})
  .setView({
    lat: 35.7065030935718,
    lng: 139.7042938163505,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

//Main Pin Marker
const mainPinMarker = L.marker(
  {
    lat: 35.7065030935718,
    lng: 139.7042938163505,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
const latLng = mainPinMarker.getLatLng();
const lat = latLng.lat;
const lng = latLng.lng;
addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

mainPinMarker.addTo(map)
  .on('move', (evt) => {
    const latLng = evt.target.getLatLng();
    const lat = latLng.lat;
    const lng = latLng.lng;
    addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });

//Similar offers pins
const renderSimilarAdvts = () => {
  const ADVT_MARKERS_COUNT = 10;
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      data.slice(0, ADVT_MARKERS_COUNT).forEach(item => {
        const { lat, lng } = item.location;
        const marker = L.marker(
          {
            lat,
            lng,
          },
          {
            icon: pinIcon,
          },
          {
            keepInView: true,
          },
        );

        marker.addTo(map)
          .bindPopup(
            renderOffer(item),
          );
      });
    });
};
renderSimilarAdvts();
