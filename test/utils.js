const fs = require('fs-extra');
const path = require('path');
const tmp = require('tmp');

async function createTempDir() {
  return new Promise((resolve, reject) => {
    tmp.dir((err, dir) => {
      if (err) {
        return reject(err);
      }
      resolve(dir);
    });
  });
}

const setupUserDataDir = async () => {
  if (!process.env.EXTENSION_TEMP_TEST_USER_DIR) {
    const dir = await createTempDir();
    fs.ensureDirSync(path.resolve(dir));
    process.env.EXTENSION_TEMP_TEST_USER_DIR = dir;
    return dir;
  } else {
    return process.env.EXTENSION_TEMP_TEST_USER_DIR;
  }
};

const removeTempDataDir = () => {
  if (process.env.EXTENSION_TEMP_TEST_USER_DIR) {
    try {
      fs.removeSync(process.env.EXTENSION_TEMP_TEST_USER_DIR);
    } catch (err) {
      console.error(err);
    }
  }
};

const createSettingFile = (conf = {}) => {
  if (!process.env.EXTENSION_TEMP_TEST_USER_DIR) {
    throw new Error('Temporary user data directory not exist for testing');
  }
  try {
    const settingsPath = path.resolve(
      process.env.EXTENSION_TEMP_TEST_USER_DIR,
      'User',
      'settings.json'
    );
    fs.ensureDirSync(path.dirname(settingsPath));

    const config = {
      'cssJsPrefixer.options': {
        browsers: [],
        ...conf,
      },
    };

    fs.writeFileSync(settingsPath, JSON.stringify(config, undefined, 2));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  setupUserDataDir,
  createSettingFile,
  removeTempDataDir,
};
