# CSS Js Prefixer

[![VSCode Marketplace](https://img.shields.io/vscode-marketplace/v/bcrazydreamer.css-js-prefixer.svg?style=flat-square&label=vscode%20marketplace)](https://marketplace.visualstudio.com/items?itemName=bcrazydreamer.css-js-prefixer) [![Total Installs](https://img.shields.io/vscode-marketplace/d/bcrazydreamer.css-js-prefixer?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=bcrazydreamer.css-js-prefixer) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/xettri/vscode-css-js-prefixer/)

> vscode extension for CSS -> CSS-in-JS

**CSS JS Prefixer** is a powerful extension designed to streamline your development process by converting CSS properties into JavaScript object notation. Simply select your CSS code, trigger the extension, and watch as it transforms your styles into a clean and structured JavaScript object format. With support for popular CSS properties and seamless integration into your workflow, this extension helps you maintain consistency and efficiency in your projects. Say goodbye to manual conversions and hello to effortless CSS to JS transformation with **CSS JS Prefixer**.

![Live Server Demo VSCode](https://raw.githubusercontent.com/xettri/vscode-css-js-prefixer/master/image/screenshot/css-js-prefixer-demo.gif)

## Example

**CSS included code**

```js
const card = css({
  display: grid;
  color: red;
  background-color: blue;
  font-size: 1rem;
})
```

Selected from `display: grid;` to `font-size: 1rem;` and applied extension

**CSS in js code**

```js
const card = css({
  display: 'grid',
  color: 'red',
  backgroundColor: 'blue',
  fontSize: '1rem',
});
```

## Installation

To install search **css-js-prefixer** in extensions and install

## Settings

In your vscode `settings.json` or **VS Code Settings**, users can configure the [Autoprefixer options](https://github.com/postcss/autoprefixer#options) under the key cssJsPrefixer.options. This configuration object will be directly passed to Autoprefixer i.e. `autoprefixer(/* cssJsPrefixer.options */)`

Here's how you can structure your settings:

#### Config Example 1:

```json
{
  "cssJsPrefixer.options": {
    "browsers": ["last 4 versions", "ie >= 9", "> 5%"]
  }
}
```

#### Config Example 2:

```json
{
    "cssJsPrefixer.options": {
        "env": <string>
        "flexbox": <boolean>,
        ...
    },
}
```

#### Config Example 3:

```json
{
    "cssJsPrefixer.options": {
        "browsers": ["last 4 versions", "ie >= 9", "> 5%"],
        "options": {
            ...
        }
    }
}
```

## Keyboard shortcuts

To run this VS Code extension, simply select code and press `Ctrl+Shift+K`. Alternatively, you can execute the command using its name: `autoprefixer.execute`

## License

This extension is licensed under the [MIT License](https://github.com/xettri/vscode-css-js-prefixer/blob/master/LICENSE)
