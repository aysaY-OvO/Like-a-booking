const _ = window._;

const getRandomInt = (min, max) => {
  return _.random(min, max);
};

const getRandomFloating = (min, max, decimals) => {
  return _.random(min, max).toFixed(decimals);
};

export { getRandomInt, getRandomFloating };
