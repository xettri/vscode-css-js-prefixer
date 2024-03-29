'use strict';
const vscode = require('vscode');
const postcss = require('postcss');
const postcssJs = require('postcss-js');
const autoprefixer = require('autoprefixer');
const { filterCssObject } = require('./utils');

/**
 * @param {string} code
 */
function converter(code) {
  return new Promise((resolve, reject) => {
    const settings = vscode.workspace.getConfiguration('cssJsPrefixer');
    const options = settings && settings.options ? settings.options : {};

    const autoprefixerOptions = {
      browsers: [],
      ...options,
    };

    let autoprefixerConfig;
    if (autoprefixerOptions.options) {
      autoprefixerConfig = autoprefixer(
        autoprefixerOptions.browsers,
        autoprefixerOptions.options
      );
    } else {
      autoprefixerConfig = autoprefixer(autoprefixerOptions);
    }

    const prefixer = postcssJs.sync([autoprefixerConfig]);
    try {
      const root = postcss.parse(code);
      const postCssObject = postcssJs.objectify(root);
      const prefixCss = prefixer(postCssObject);
      const filteredCssOb = filterCssObject(prefixCss);

      // remove extra {} and quotes
      const filteredCssString = JSON.stringify(filteredCssOb, null, 2)
        .slice(1, -1)
        .replace(/^"([^"!(.|,|:)]+)":/g, '$1:');

      // remove extra lines
      const lines = filteredCssString.split('\n');
      return resolve(lines.slice(1, -1).join('\n'));
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = converter;
