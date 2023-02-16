// 定义命令行输出的颜色

const shellColor = () => ({
  red: (text) => {
    console.log(`\x1b[31m${text}\x1b[0m`);
  },
  green: (text) => {
    console.log(`\x1b[32m${text}\x1b[0m`);
  },
  yellow: (text) => {
    console.log(`\x1b[33m${text}\x1b[0m`);
  },
  pink: (text) => {
    console.log(`\x1b[35m${text}\x1b[0m`);
  },
  cyan: (text) => {
    console.log(`\x1b[36m${text}\x1b[0m`);
  },
  blue: (text) => {
    console.log(`\x1b[34m${text}\x1b[0m`);
  },
  bgRed: (text) => {
    console.log(`\x1b[41m${text}\x1b[0m`);
  },

});

module.exports = shellColor();
