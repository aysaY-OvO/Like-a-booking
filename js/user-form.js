const adForm = document.querySelector('.ad-form'),
  typeOfHousing = adForm.querySelector('#type'),
  costPerNight = adForm.querySelector('#price'),
  timeIn = adForm.querySelector('#timein'),
  timeOut = adForm.querySelector('#timeout');

const checkType = () => {
  typeOfHousing.addEventListener('change', () => {
    const elementIndex = typeOfHousing.selectedIndex;
    switch (elementIndex) {
      case 0:
        costPerNight.placeholder = 'От 0 руб.';
        break;
      case 1:
        costPerNight.placeholder = 'От 1000 руб.';
        break;
      case 2:
        costPerNight.placeholder = 'От 5000 руб.';
        break;
      case 3:
        costPerNight.placeholder = 'От 10000 руб.';
        break;
      default:
        costPerNight.placeholder = 'От 1000 руб.';
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
