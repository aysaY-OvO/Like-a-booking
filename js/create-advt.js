const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderOffer = ({ author, offer }) => {
  const advt = cardTemplate.cloneNode(true);

  try {
    advt.querySelector('.popup__avatar').src = author.avatar;
  } catch (error) {
    advt.querySelector('.popup__avatar').src = '../img/avatars/';
  }
  advt.querySelector('.popup__title').textContent = offer.title;
  advt.querySelector('.popup__text--address').textContent = offer.address;
  advt.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  advt.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  advt.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  advt.querySelector('.popup__description ').textContent = offer.description;

  //Create photos
  const getPhotos = (photos) => {
    const photosWrapper = advt.querySelector('.popup__photos');
    try {
      photos.forEach(photo => {
        return photosWrapper.insertAdjacentHTML(
          'beforeend',
          `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></div>`,
        );
      });
    } catch (error) {
      photosWrapper.style.display = 'none';
    }
  };

  //Create type
  const getType = (type) => {
    let equal;
    switch (type) {
      case 'flat':
        equal = 'Квартира';
        break;
      case 'bungalow':
        equal = 'Бунгало';
        break;
      case 'house':
        equal = 'Дом';
        break;
      case 'palace':
        equal = 'Дворец';
        break;
      case 'hotel':
        equal = 'Отель';
        break;
      default:
        equal = 'Не определено';
    }
    return advt.querySelector('.popup__type').textContent = equal;
  };
  getType(offer.type);

  //Create features
  const getFeatures = (features) => {
    const featuresWrapper = advt.querySelector('.popup__features');
    try {
      features.forEach(feature => {
        return featuresWrapper.insertAdjacentHTML(
          'beforeend',
          `<li class="popup__feature popup__feature--${feature}"></li>`,
        );
      });
    } catch (error) {
      return featuresWrapper.style.display = 'none';
    }
  };
  getPhotos(offer.photos);
  getFeatures(offer.features);

  return advt;
};

export { renderOffer };
