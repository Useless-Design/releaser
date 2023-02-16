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
  const configPath = `${rootPath}/.commitlint.json`;

  let configFile = {};
  // 获取js文件导出的信息 支持commonjs和es6
  if (fse.existsSync(configPath)) {
    // 导入json文件
    configFile = await import(configPath,{assert: { type: 'json' }}).default; 
  }
  return configFile;
};

export default getRootPath;
