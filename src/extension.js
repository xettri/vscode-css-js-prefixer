const vscode = require('vscode');
const converter = require('./converter');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const disposable = vscode.commands.registerCommand(
    'cssJsPrefixer.execute',
    doExecute
  );
  context.subscriptions.push(disposable);
}

// main execute function
async function doExecute() {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const selection = editor.selection;
    const code = document.getText(selection);
    try {
      const css = await converter(code);
      if (css) {
        editor.edit((editBuilder) => {
          editBuilder.replace(selection, css);
        });
      }
    } catch (error) {
      console.log(error);
      if (error.message) {
        const errorMsg = error.message.split(':');
        vscode.window.showErrorMessage(
          `CSS JS Prefixer: ${errorMsg[errorMsg.length - 1]}`
        );
      }
    }
  }
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
