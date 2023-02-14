import git from "./utils/git";

git.createTag("v1.0.0").then((tag) => {
  console.log(tag);
});
