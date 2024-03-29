const path = require('path');
const { runTests } = require('@vscode/test-electron');
const {
  createSettingFile,
  setupUserDataDir,
  removeTempDataDir,
} = require('./utils');

async function main() {
  try {
    const tempDataDir = await setupUserDataDir();
    createSettingFile({ browsers: ['chrome > 20', 'ie >= 9', 'Firefox > 20'] });

    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../');

    // The path to the extension test script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index.js');

    // Download VS Code, unzip it and run the integration test
    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: [
        '--disable-extensions',
        '--enable-proposed-api',
        `--user-data-dir=${tempDataDir}`,
      ],
    });
  } catch (err) {
    console.error('Failed to run tests');
    process.exit(1);
  } finally {
    removeTempDataDir();
  }
}

main();
