import { CleanOptions, simpleGit } from 'simple-git';

const options = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
};

// 使用simpleGit库，封装一个单例git类
class Git {
  #git;

  #branch;

  constructor() {
    this.#git = simpleGit(options).clean(CleanOptions.FORCE);
    this.#branch = '';
  }

  // 创建tag
  async createTag(tagName) {
    const tag = await this.#git.addTag(tagName);
    return tag;
  }

  // 获取当前分支
  async getCurrentBranch() {
    const branch = await this.#git.branch();
    this.#branch = branch.current;
    return branch.current;
  }

  // 获取当前分支的所有的commit
  async getCommits() {
    const branch = await this.getCurrentBranch();
    const commits = await this.#git.log({ from: branch });
    return commits;
  }

  // 获取所有的提交信息
  async getAllCommits() {
    const commits = await this.#git.log();
    return commits;
  }

  // 判断是否有未提交的数据
  async hasUncommittedChanges() {
    const status = await this.#git.status();
    return status.files.length > 0;
  }
}

const git = new Git();

export default git;
