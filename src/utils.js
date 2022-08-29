const isArray = (v) => Object.prototype.toString.call(v) === '[object Array]';
const isPlainObject = (obj) => {
  if (!obj) return false;
  const proto = Object.getPrototypeOf(obj);
  return (
    proto === null ||
    (Object.getPrototypeOf(proto) === null &&
      proto.constructor === obj.constructor)
  );
};

const filterCssObject = (css) => {
  const ob = {};
  for (let k in css) {
    if (isArray(css[k])) {
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
