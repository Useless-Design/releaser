const fse = require('fs-extra');

const getRootPath = () => {
  let rootPath = '';
  while (rootPath === '') {
    if (fse.existsSync('.git')) {
      rootPath = process.cwd();
      break;
    } else {
      process.chdir('..');
    }
  }
  return rootPath;
};

const readConfig = async () => {
  const rootPath = getRootPath();
  const configPath = `${rootPath}/.commitlint.json`;
  let configFile = {};
  if (fse.existsSync(configPath)) {
    const configContent = await require(configPath);
    configFile = configContent;
  }
  return configFile;
};

module.exports = {
  readConfig,
  getRootPath,
};
