const inActiveState = (parent) => {
  Array.from(parent.classList).forEach(token => {
    parent.classList.add(`${token}--disabled`);
  });
  Array.from(parent.children).forEach(child => {
    child.setAttribute('disabled', true);
  });
};

const activeState = (parent) => {
  Array.from(parent.classList).forEach(token => {
    parent.classList.remove(`${token}--disabled`);
  });
  Array.from(parent.children).forEach(child => {
    child.removeAttribute('disabled');
  });
};

export { activeState, inActiveState };
