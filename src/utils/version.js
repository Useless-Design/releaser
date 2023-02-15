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

// 获取目标根目录中的package.json文件中的version
export const getVersion = async () => {
  const rootPath = getRootPath();
  const packagePath = `${rootPath}/package.json`;
  const packageJson = await fse.readJSON(packagePath);
  return packageJson.version;
};

/**
 * @description major 升级
 * 1.0.0 => 2.0.0
 * v1.0.0 => v2.0.0
 * v1.0.0-alpha.1 => v2.0.0
 * @param version
 * @returns string
 */
export const upgradeForMajor = (version) => {
  const [major] = version.split('.');
  // 匹配开头的英文信息 并在升版本后保留
  const prefix = version.match(/^[a-zA-Z]+/);
  if (prefix) {
    return `${prefix[0]}${Number(major) + 1}.0.0`;
  }
  return `${Number(major) + 1}.0.0`;
};

/**
 * @description minor 升级
 * 1.0.0 => 1.1.0
 * v1.0.0 => v1.1.0
 * v1.0.0-alpha.1 => v1.1.0
 * @param version
 * @returns string
 */
export const upgradeForMinor = (version) => {
  const [major, minor] = version.split('.');
  return `${major}.${Number(minor) + 1}.0`;
};

/**
 * @description patch 升级
 * 1.0.0 => 1.0.1
 * v1.0.0 => v1.0.1
 * v1.0.0-alpha.1 => v1.0.1
 * @param version
 * @returns string
 */
export const upgradeForPatch = (version) => {
  const [major, minor, patch] = version.split('.');
  return `${major}.${minor}.${Number(patch) + 1}`;
};

/**
 * @description alpha 升级
 * 1.0.0 => 1.0.1-alpha.1
 * v1.0.0 => v1.0.1-alpha.1
 * v1.0.0-alpha.1 => v1.0.0-alpha.2
 * @param version
 * @returns string
 */
export const upgradeForAlpha = (version) => {
  const [major, minor, patch] = version.split('.');
  const alpha = version.match(/alpha\.\d+/);
  if (alpha) {
    const [prefix, num] = alpha[0].split('.');
    return `${major}.${minor}.${patch}-${prefix}.${Number(num) + 1}`;
  }
  return `${major}.${minor}.${patch}-alpha.1`;
};

/**
 * @description beta 升级
 * 1.0.0 => 1.0.1-beta.1
 * v1.0.0 => v1.0.1-beta.1
 * v1.0.0-beta.1 => v1.0.0-beta.2
 * v1.0.0-alpha.1 => v1.0.0-beta.1
 * @param version
 * @returns string
 */
export const upgradeForBeta = (version) => {
  const [major, minor, patch] = version.split('.');
  const beta = version.match(/beta\.\d+/);
  if (beta) {
    const [prefix, num] = beta[0].split('.');
    return `${major}.${minor}.${patch}-${prefix}.${Number(num) + 1}`;
  }
  return `${major}.${minor}.${patch}-beta.1`;
};

/**
 * @description rc 升级
 * 1.0.0 => 1.0.1-rc.1
 * v1.0.0 => v1.0.1-rc.1
 * v1.0.0-rc.1 => v1.0.0-rc.2
 * v1.0.0-beta.1 => v1.0.0-rc.1
 * v1.0.0-alpha.1 => v1.0.0-rc.1
 * @param version
 * @returns string
 */
export const upgradeForRc = (version) => {
  const [major, minor, patch] = version.split('.');
  const rc = version.match(/rc\.\d+/);
  if (rc) {
    const [prefix, num] = rc[0].split('.');
    return `${major}.${minor}.${patch}-${prefix}.${Number(num) + 1}`;
  }
  return `${major}.${minor}.${patch}-rc.1`;
};

/**
 * @description 自定义版本号
 * @param version
 * @returns string
 */
export const upgradeForCustom = (version) => version;

// 获取所有升级后的版本号
export const getNewVersion = (version) => {
  const major = upgradeForMajor(version);
  const minor = upgradeForMinor(version);
  const patch = upgradeForPatch(version);
  const alpha = upgradeForAlpha(version);
  const beta = upgradeForBeta(version);
  const rc = upgradeForRc(version);
  const custom = upgradeForCustom(version);
  return {
    major,
    minor,
    patch,
    alpha,
    beta,
    rc,
    custom,
  };
};
