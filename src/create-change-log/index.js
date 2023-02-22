const fse = require('fs-extra');
const git = require('../utils/git');
const config = require('../utils/config');
const { askSaveUnqualifiedVCommits } = require('../utils/inquirer');
const transformCommitsToMd = require('./transform-commit-to-md');

const enums = config.getEnums();

// 获取上个tag到当前的commits记录
const getCommits = () => {
  const commits = git.getCommitsFromLatestTag();
  return commits;
};

const parserMessage = (message) => {
  // 对message进行解析 分类整理
  const result = {
    type: '',
    scope: '',
    subject: '',
    body: '',
    footer: '',
    isBreaking: false,
    breakingBody: '',
    breakingFooter: '',
    issues: '',
    references: '',
    revert: null,
  };

  const [type, content] = message.split(':');
  if (type.includes('(')) {
    const [curType, scope] = type.split('(');
    result.type = curType;
    result.scope = scope.replace(')', '');
  } else {
    result.type = type;
  }

  if (type === 'fix') {
    const [fix, subject] = content.split(' ');
    result.fix = fix;
    result.subject = subject;
    if (result.scope.includes('#')) {
      result.issues = result.scope;
    }
    return result;
  }
  if (type === 'revert') {
    const [revert, subject] = content.split(' ');
    result.revert = revert;
    result.subject = subject;
    return result;
  }
  if (content) {
    const [subject, body] = content.split('\n');
    result.subject = subject;

    const footer = body?.split('\n').slice(1).join('\n');
    if (footer && footer.includes('BREAKING CHANGE')) {
      result.isBreaking = true;
      const [breakingBody, breakingFooter] = footer.split('\n');
      result.breakingBody = breakingBody;
      result.breakingFooter = breakingFooter;

      if (result.breakingBody?.includes('issues')) {
        const [issues, references] = result.breakingBody.split('issues');
        result.issues = issues;
        result.references = references;
      } else {
        result.footer = footer;
        if (result.footer?.includes('issues')) {
          const [issues, references] = result.footer.split('issues');
          result.issues = issues;
          result.references = references;
        }
      }
    }
  }

  return result;
};

// 将commits进行分类 分类规则根据配置中的enums数组进行分类
const classifyCommits = (commits) => {
  const result = {};
  enums.forEach((item) => {
    result[item] = [];
  });
  // 过滤出不符合规范的commits
  const unqualifiedCommits = commits.all.filter((commit) => {
    const { message } = commit;
    const { type } = parserMessage(message);
    // 注意type是否是 feat 还是feat(xxx)甚至是包括emoji

    return !enums.includes(type);
  });
  // 将不符合规范的commits放到unqualified中
  result.unqualified = unqualifiedCommits;
  // 将符合规范的commits进行分类
  commits.all.forEach((commit) => {
    const { message } = commit;
    const { type } = parserMessage(message);
    enums.some((item) => {
      if (type.includes(item)) {
        result[item].push(commit);
        return true;
      }
      return false;
    });
  });
  return result;
};

// 追加到changelog.md文件中 如果没有md文件则创建
const appendToChangelog = async (cms, version) => {
  const commits = classifyCommits(cms);
  console.log('114-「index」', commits);
  const template = config.getTemplate();

  // 如果存在不规范的提交 询问是否保留，如果保留就新建other分组
  if (commits.unqualified.length > 0) {
    const { keep } = await askSaveUnqualifiedVCommits();
    if (!keep) {
      commits.unqualified = [];
    }
  }

  const newContent = transformCommitsToMd(commits, version, template, enums);

  // 判断是否本地有changelog.md文件 如果有 就在头部追加内容 没有就创建
  if (fse.existsSync('CHANGELOG.md')) {
    const content = fse.readFileSync('CHANGELOG.md', 'utf8');
    fse.writeFileSync('CHANGELOG.md', `${newContent} \r ${content}`);
  } else {
    fse.writeFileSync('CHANGELOG.md', newContent);
  }
};

module.exports = {
  getCommits,
  appendToChangelog,
};
