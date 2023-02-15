import fse from 'fs-extra';

export const getRootPath = () => {
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

export const readConfig = async () => {
  const rootPath = getRootPath();
  const configPath = `${rootPath}/.commitlint.js`;
  const config = await fse.readJSON(configPath);
  return config;
};

export default getRootPath;
