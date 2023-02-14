import git from "./utils/git";

async function main() {
  const commits = await git.getCommits();
  console.log("11-「index」", commits);
}

main();
