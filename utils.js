const isArray = (v) => Object.prototype.toString.call(v) === "[object Array]";
const isPlainObject = (v) =>
  Object.prototype.toString.call(v) === "[object Object]";

const filterCssObject = (css, options) => {
  const ob = {};
  for (let k in css) {
    if (isArray(css[k])) {
      if (css[k].length) {
        ob[k] = css[k].slice(-1).pop();
      }
    } else if (isPlainObject(css[k])) {
      if (k[0] === "&") {
        ob[k] = filterCssObject(css[k], options);
      } else {
        const sp = "&" + (k[0] === "." ? " " : "");
        ob[sp + k] = filterCssObject(css[k], options);
      }
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
