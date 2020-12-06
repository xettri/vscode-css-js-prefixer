const isArray = (v) => Object.prototype.toString.call(v) === "[object Array]";
const isPlainObject = (v) =>
  Object.prototype.toString.call(v) === "[object Object]";

const filterCssObject = (css, p = "") => {
  const ob = {};
  for (let k in css) {
    if (isArray(css[k])) {
      if (css[k].length) {
        ob[k] = css[k].slice(-1).pop();
      }
    } else if (isPlainObject(css[k])) {
      ob[p + k] = filterCssObject(css[k], p);
    } else {
      ob[k] = css[k];
    }
  }
  return ob;
};

module.exports = {
  isArray,
  isPlainObject,
  filterCssObject,
};
