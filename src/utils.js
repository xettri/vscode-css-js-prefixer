'use strict';
/**
 * @param {Object} obj
 * @returns {boolean}
 */
const isPlainObject = (obj) => {
  if (!obj) return false;
  const proto = Object.getPrototypeOf(obj);
  return (
    proto === null ||
    (Object.getPrototypeOf(proto) === null &&
      proto.constructor === obj.constructor)
  );
};

/**
 * @param {import('postcss-js').CssInJs} css
 * @returns {Object}
 */
const filterCssObject = (css) => {
  const ob = {};
  for (let k in css) {
    if (Array.isArray(css[k])) {
      if (css[k].length) {
        ob[k] = css[k].slice(-1).pop();
      }
    } else if (isPlainObject(css[k])) {
      if (k[0] === '&') {
        ob[k] = filterCssObject(css[k]);
      } else {
        const sp = '&' + (k[0] === '.' ? ' ' : '');
        ob[sp + k] = filterCssObject(css[k]);
      }
    } else {
      ob[k] = css[k];
    }
  }
  return ob;
};

module.exports = { filterCssObject };
