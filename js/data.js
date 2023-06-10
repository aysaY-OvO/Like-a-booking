import { getRandomInt, getRandomFloating } from './util.js';
const _ = window._;

const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const CHECK = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const ADVT_COUNTS = 10;

const getRandomArrayItem = (array) => {
  return array[_.random(0, array.length - 1)];
};

const getFeatures = () => {
  const features = [];
  const maxLength = FEATURES.length;
  const lengthOfFeatures = getRandomInt(1, maxLength);

  while (features.length < lengthOfFeatures) {
    const indexOfElement = getRandomInt(0, maxLength - 1);
    const feature = FEATURES[indexOfElement];

    if (!features.includes(feature)) {
      features.push(feature);
    }
  }
  return features;
};

const getPhotos = () => {
  const photos = [];
  const maxLength = getRandomInt(1, 10);

  while (photos.length < maxLength) {
    const indexOfElement = getRandomInt(0, PHOTOS.length - 1);
    const photo = PHOTOS[indexOfElement];
    photos.push(photo);
  }

  return photos;
};

const createData = () => {
  const data = {
    author: {
      avatar: `img/avatars/user0${getRandomInt(1, 8)}.png`,
    },
    offer: {
      title: 'Лучшее обьявление!',
      address: '',
      price: getRandomInt(1000, 5000),
      type: getRandomArrayItem(TYPE),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: getRandomArrayItem(CHECK),
      checkout: getRandomArrayItem(CHECK),
      features: getFeatures(),
      description: 'Лучшее предложение за свои деньги!',
      photos: getPhotos(),
    },
    location: {
      x: getRandomFloating(35.65000, 35.70000, 5),
      y: getRandomFloating(139.70000, 139.80000, 5),
    },
  };

  data.offer.address = `${data.location.x}, ${data.location.y}`;

  return data;
};

const dataArray = new Array(ADVT_COUNTS).fill(null).map(() => createData());

export { dataArray };
