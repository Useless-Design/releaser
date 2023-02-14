import fse from "fs-extra";
import { simpleGit, SimpleGit } from "simple-git";

// 使用simpleGit库，封装一个单例git类
class Git {
  private git: SimpleGit;

  constructor() {
    this.git = simpleGit();
  }

  // 创建tag
  public async createTag(tagName: string): Promise<{ name: string }> {
    const tag = await this.git.addTag(tagName);
    return tag;
  }
}

const git = new Git();

export default git;
