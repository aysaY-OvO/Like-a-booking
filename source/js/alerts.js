const onSuccess = document.querySelector('#success').content.querySelector('.success'),
  onError = document.querySelector('#error').content.querySelector('.error'),
  errorButton = onError.querySelector('.error__button'),
  main = document.querySelector('main');

const showSuccessMessage = () => {
  onSuccess.cloneNode(true);
  main.append(onSuccess);
  setTimeout(() => {
    onSuccess.remove();
  }, 2000);
};

const showErrorMessage = () => {
  onError.cloneNode(true);
  main.append(onError);

  errorButton.addEventListener('click', () => {
    onError.remove();
  });
};

export { showErrorMessage, showSuccessMessage };
