// @ts-nocheck
const vscode = require("vscode");
const assert = require("assert");
const { after } = require("mocha");
const converter = require("../../src/converter");
const { name, publisher } = require("../../package.json");

const extName = `${publisher}.${name}`;

/**
 * @param {string} str
 */
function filterString(str) {
  return str
    .split("\n")
    .map((v) => v.trim().replace(/,$/, ""))
    .filter((v) => v);
}

/**
 * @param {string} s1
 * @param {string} s2
 */
function matchOutput(s1, s2) {
  const x = filterString(s1);
  const y = filterString(s2);
  if (x.length !== y.length) {
    return false;
  }
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== y[i]) return false;
  }
  return true;
}

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  after(() => {
    vscode.window.showInformationMessage("All tests done!");
  });

  test("Extension should be present", () => {
    assert.ok(vscode.extensions.getExtension(extName));
  });

  test("should activate", async function () {
    await vscode.extensions
      .getExtension(extName)
      .activate()
      .then(() => assert.ok(true));
  });

  test("Test Case 1", async () => {
    const resp = await converter("display: grid;");
    assert.equal(`"display": "grid"`, resp.trim());
  });

  test("Test Case 2", async () => {
    const input = `
      display: grid;
      color: red;
      background-color: red;
      flex: 1;
    `;

    const expOp = `
      "display": "grid",
      "color": "red",
      "backgroundColor": "red",
      "WebkitFlex": "1",
      "MozBoxFlex": "1",
      "msFlex": "1",
      "flex": 1
    `;

    const resp = await converter(input);
    assert.ok(matchOutput(resp, expOp));
  });

  test("Test Case 3", async () => {
    const input = `
      user-select: none;
      transition: all .5s;
    `;

    const expOp = `
      "WebkitUserSelect": "none",
      "MozUserSelect": "none",
      "msUserSelect": "none",
      "userSelect": "none",
      "WebkitTransition": "all .5s",
      "transition": "all .5s"
    `;

    const resp = await converter(input);
    assert.ok(matchOutput(resp, expOp));
  });

  test("Test invalid css string", async () => {    
    const input = `
      user-select: none;
      transition: all .5s;
      random-string
    `;

    await converter(input).then(() => {
      assert.ok(false);
    }).catch((error) => {
      const {name, reason, line}= error;
      if(name === 'CssSyntaxError' && reason === "Unknown word" && line === 4) {
        assert.ok(true)
      }
    })
  });
});
