import fse from 'fs-extra';
import { getRootPath } from './version.js';

const createChangeLog = async (version) => {
  const rootPath = getRootPath();
  const changelogPath = `${rootPath}/CHANGELOG.md`;
  const changelog = await fse.readFile(changelogPath, 'utf-8');
  const newChangelog = changelog.replace(
    /## \[Unreleased\]/,
    `## [Unreleased]\n\n## [${version}] - ${new Date().toISOString().split('T')[0]}\n\n### Added\n\n### Changed\n\n### Fixed\n\n### Removed\n\n### Deprecated\n\n### Security\n\n`,
  );
  await fse.writeFile(changelogPath, newChangelog);
};

export default createChangeLog;
