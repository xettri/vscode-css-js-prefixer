const vscode = require("vscode");
const postcss = require("postcss");
const postcssJs = require("postcss-js");
const autoprefixer = require("autoprefixer");

const prefixer = postcssJs.sync([
  autoprefixer({ browsers: "last 4 versions, > 1%" }),
]);
const isArray = (v) => Object.prototype.toString.call(v) === "[object Array]";

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "css-js-prefixer.css-js-prefixer",
    function () {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;
        const code = document.getText(selection);

        let css;
        try {
          const root = postcss.parse(code);
          css = postcssJs.objectify(root);
          css = prefixer(css);

          //validate data if multiple value in array
          for (let k in css) {
            if (isArray(css[k])) {
              if (css[k].length) {
                css[k] = css[k].slice(-1).pop();
              } else {
                delete css[k];
              }
            }
          }

          // remove extra {}
          css = JSON.stringify(css, null, 2)
            .slice(1, -1)
            .replace(/"([^"]+)":/g, "$1:");

          // remove extra lines
          let lines = css.split("\n");
          console.log(lines.slice(1, -1));
          css = lines.slice(1, -1).join("\n");
        } catch (error) {
          console.log(error);
        }

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, css || code);
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
