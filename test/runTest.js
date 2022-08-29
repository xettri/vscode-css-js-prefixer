const fs = require("fs");
const path = require("path");
const { runTests } = require("@vscode/test-electron");

async function createSettingFile() {
  try {
    const folder = "test/.vscode";
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    const config = {
      "cssJsPrefixer.options": {
        browsers: [],
      },
    };
    fs.writeFileSync(
      `${folder}/settings.json`,
      JSON.stringify(config, undefined, 2)
    );
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  try {
    await createSettingFile();
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, "../");

    // The path to the extension test script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, "./suite/index");

    // Download VS Code, unzip it and run the integration test
    await runTests({ extensionDevelopmentPath, extensionTestsPath, launchArgs: ['--disable-extensions'] });
  } catch (err) {
    console.error("Failed to run tests");
    process.exit(1);
  }
}

main();
