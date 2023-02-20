const { simpleGit } = require('simple-git');

const options = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
};

// 使用simpleGit库，封装一个单例git类
class Git {
  constructor() {
    this.git = simpleGit(options);
    this.branch = '';
  }

  // 创建tag
  async createTag(tagName) {
    const tag = await this.git.addTag(tagName);
    return tag;
  }

  // 获取当前分支
  async getCurrentBranch() {
    const branch = await this.git.branch();
    this.branch = branch.current;
    return branch.current;
  }

  // 获取当前分支的所有的commit
  async getCommits() {
    const branch = await this.getCurrentBranch();
    const commits = await this.git.log({ from: branch });
    return commits;
  }

  // 获取所有的提交信息
  async getAllCommits() {
    const commits = await this.git.log();
    return commits;
  }

  // 获取最新的tag
  async getLatestTag() {
    const tags = await this.git.tags();
    return tags.latest;
  }

  // 获取最新的tag到当前的commits
  async getCommitsFromLatestTag() {
    const latestTag = await this.getLatestTag();
    const commits = await this.git.log({ from: latestTag });
    return commits;
  }

  // 判断是否有未提交的数据 不对数据进行处理
  async hasUncommittedChanges() {
    const status = await this.git.status();
    return status.files.length > 0;
  }
}

const git = new Git();

module.exports = git;
