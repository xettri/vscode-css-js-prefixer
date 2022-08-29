# CSS Js Prefixer
[![VSCode Marketplace](https://img.shields.io/vscode-marketplace/v/bcrazydreamer.css-js-prefixer.svg?style=flat-square&label=vscode%20marketplace)](https://marketplace.visualstudio.com/items?itemName=bcrazydreamer.css-js-prefixer) [![Total Installs](https://img.shields.io/vscode-marketplace/d/bcrazydreamer.css-js-prefixer?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=bcrazydreamer.css-js-prefixer) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/bcrazydreamer/vscode-css-js-prefixer/)
> vscode extension for CSS -> CSS-in-JS

It will convert css code into css-in-js with cross browser compatibility support

![Live Server Demo VSCode](https://raw.githubusercontent.com/bcrazydreamer/vscode-css-js-prefixer/master/image/screenshot/css-js-prefixer-demo.gif)

## Example
**css code**
```css
display: grid;
color: red;
background-color: blue;
font-size: 1rem;
```
**css in js code**
```js
"display": "grid",
"color": "red",
"backgroundColor": "blue",
"fontSize": "1rem"
```

## Installation
To install search css-js-prefixer in extensions and install

## Settings
Its support all [postcss autoprefixer](https://github.com/postcss/autoprefixer#options) settings.
Extension key for custom settings is ```cssJsPrefixer.options```
```
{
    "cssJsPrefixer.options": {
        browsers: ["last 4 versions", "ie >= 9", "> 5%"],
    },
}
```
```
{
    "cssJsPrefixer.options": {
        env: <string>
        grid: <boolean>,
        cascade: <boolean>,
        flexbox: <boolean>,
        supports: <boolean>
        ...
    },
}
```
## Keyboard shortcuts
Default Keyboard shortcuts
for **mac** ```cmd+F cmd+P``` and for **other** ```alt+F alt+P```

to overwrite use command name ```autoprefixer.execute```

## License
This extension is licensed under the [MIT License](https://github.com/bcrazydreamer/vscode-css-js-prefixer/blob/master/LICENSE)
