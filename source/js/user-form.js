import { showErrorMessage } from './alerts.js';
import { sendData } from './api.js';

const adForm = document.querySelector('.ad-form'),
  typeOfHousing = adForm.querySelector('#type'),
  costPerNight = adForm.querySelector('#price'),
  timeIn = adForm.querySelector('#timein'),
  timeOut = adForm.querySelector('#timeout'),
  titleInput = adForm.querySelector('#title'),
  capacity = adForm.querySelector('#capacity'),
  roomNumber = adForm.querySelector('#room_number');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_COST_VALUE = 1000000;

const costInputCheck = (minValue) => {
  costPerNight.setAttribute('min', minValue);
  if (costPerNight.value < minValue) {
    costPerNight.setCustomValidity(`Минимальная цена ${minValue} руб.`);
  } else {
    costPerNight.setCustomValidity('');
  }
  costPerNight.reportValidity();
};

const checkType = () => {
  typeOfHousing.addEventListener('change', () => {
    costPerNight.value = '';
    const elementIndex = typeOfHousing.selectedIndex;
    switch (elementIndex) {
      case 0:
        costPerNight.placeholder = 'От 0 руб.';
        costInputCheck(0);
        break;
      case 1:
        costPerNight.placeholder = 'От 1000 руб.';
        costInputCheck(1000);
        break;
      case 2:
        costPerNight.placeholder = 'От 5000 руб.';
        costInputCheck(5000);
        break;
      case 3:
        costPerNight.placeholder = 'От 10000 руб.';
        costInputCheck(10000);
        break;
      default:
        costPerNight.placeholder = 'От 1000 руб.';
        costInputCheck(1000);
    }
  });
};

const checkTime = (firstTimeSelect, secondTimeSelect) => {
  firstTimeSelect.addEventListener('change', () => {
    switch (firstTimeSelect.selectedIndex) {
      case 0:
        secondTimeSelect.selectedIndex = 0;
        break;
      case 1:
        secondTimeSelect.selectedIndex = 1;
        break;
      case 2:
        secondTimeSelect.selectedIndex = 2;
        break;
    }
  });
};
checkTime(timeIn, timeOut);
checkTime(timeOut, timeIn);
checkType();

//Form validity
titleInput.addEventListener('input', () => {
  const vauleLength = titleInput.value.length;

  if (vauleLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Необходимо минимум ${MIN_TITLE_LENGTH} символов`);
  } else if (vauleLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Допускается максимум ${MAX_TITLE_LENGTH} символов`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});

costPerNight.addEventListener('input', () => {
  const value = costPerNight.value;
  if (value > MAX_COST_VALUE) {
    costPerNight.setCustomValidity(`Максимальная цена за ночь ${MAX_COST_VALUE}`);
  } else {
    costPerNight.setCustomValidity('');
  }
  costPerNight.reportValidity();
});

capacity.addEventListener('change', () => {
  const roomNumberIndex = roomNumber.selectedIndex;
  const capacityIndex = capacity.selectedIndex;

  if (roomNumberIndex === 0) {
    switch (capacityIndex) {
      case 0:
      case 1:
      case 3:
        capacity.setCustomValidity('Доступно только для 1 гостя');
        break;
      case 2:
        capacity.setCustomValidity('');
        break;
    }
  } else if (roomNumberIndex === 1) {
    switch (capacityIndex) {
      case 0:
      case 3:
        capacity.setCustomValidity('Доступно только для 1 и 2 гостей');
        break;
      case 1:
      case 2:
        capacity.setCustomValidity('');
    }
  } else if (roomNumberIndex === 2) {
    switch (capacityIndex) {
      case 3:
        capacity.setCustomValidity('Доступня для 1, 2 или 3 гостей');
        break;
      case 0:
      case 1:
      case 2:
        capacity.setCustomValidity('');
        break;
    }
  } else if (roomNumberIndex === 3) {
    switch (capacityIndex) {
      case 0:
      case 1:
      case 2:
        capacity.setCustomValidity('Доступен вариант только "не для гостей"');
        break;
      case 3:
        capacity.setCustomValidity('');
        break;
    }
  }
  capacity.reportValidity();
});

roomNumber.addEventListener('change', () => {
  const roomNumberIndex = roomNumber.selectedIndex;
  const capacityIndex = capacity.selectedIndex;

  if (capacityIndex === 0) {
    switch (roomNumberIndex) {
      case 0:
      case 1:
      case 3:
        roomNumber.setCustomValidity('Доступны только 3 комнаты');
        break;
      case 2:
        roomNumber.setCustomValidity('');
        break;
    }
  } else if (capacityIndex === 1) {
    switch (roomNumberIndex) {
      case 0:
      case 3:
        roomNumber.setCustomValidity('Доступны только 2 или 3 комнаты');
        break;
      case 1:
      case 2:
        roomNumber.setCustomValidity('');
        break;
    }
  } else if (capacityIndex === 2) {
    switch (roomNumberIndex) {
      case 1:
      case 2:
      case 3:
        roomNumber.setCustomValidity('Доступны только 1 комната');
        break;
      case 0:
        roomNumber.setCustomValidity('');
        break;
    }
  } else if (capacityIndex === 3) {
    switch (roomNumberIndex) {
      case 0:
      case 1:
      case 2:
        roomNumber.setCustomValidity('Доступны только 100 комнат');
        break;
      case 3:
        roomNumber.setCustomValidity('');
        break;
    }
  }
  roomNumber.reportValidity();
});

//Form post
const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(
      () => onSuccess(),
      () => showErrorMessage(),
      formData,
    );
    clearUserForm();
    document.querySelector('.ad-form__reset').addEventListener('click', clearUserForm);
  });
};

const clearUserForm = () => {
  adForm.reset();
};

export { setUserFormSubmit, clearUserForm };
