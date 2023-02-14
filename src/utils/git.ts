import {
  CleanOptions,
  DefaultLogFields,
  LogResult,
  simpleGit,
  SimpleGit,
  SimpleGitOptions,
} from "simple-git";

const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
};

// 使用simpleGit库，封装一个单例git类
class Git {
  private git: SimpleGit;
  #branch: string;

  constructor() {
    this.git = simpleGit(options).clean(CleanOptions.FORCE);
    this.#branch = "";
  }

  // 创建tag
  public async createTag(tagName: string): Promise<{ name: string }> {
    const tag = await this.git.addTag(tagName);
    return tag;
  }

  // 获取当前分支
  public async getCurrentBranch() {
    const branch = await this.git.branch();
    this.#branch = branch.current;
    return branch.current;
  }

  // 获取当前分支的所有的commit
  public async getCommits(): Promise<LogResult<DefaultLogFields>> {
    const branch = await this.getCurrentBranch();
    const commits = await this.git.log({ from: branch });
    return commits;
  }
}

const git = new Git();

export default git;
