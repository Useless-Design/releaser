/* eslint-disable no-unused-expressions */
const format = require('date-fns/format');
const config = require('../utils/config');

/**
 *
 * @param {*} message
 * @param {import('simple-git').DefaultLogFields} commit
 * @param {*} template
 * @returns
 */
const formatMessage = (message, commit, template, type) => {
  const {
    author, date, hash, email,
  } = template;
  const result = [];
  result.push(`- ${message.replace(`${type}(`, '`').replace(')', '`')}`);
  author && result.push(` **@${commit.author_name}** ${email ? `<${commit.author_email}>` : ''} \r`);
  date && result.push(` **${format(new Date(commit.date), 'yyyy-MM-dd HH:mm:ss')}**`);
  hash && result.push(` **\`${commit.hash.substring(0, 7)}\`**`);
  return result.join('');
};

const transformCommitsToMd = (commits, version, template, enums) => {
  const result = [`## 🎐 ${version} **\`${format(new Date(), 'yyyy-MM-dd')}\`**`, '---'];
  const emojis = config.getEmojis();
  const sections = config.getSections();
  enums.forEach((item) => {
    if (commits[item].length > 0) {
      result.push(`### ${emojis[item]} ${sections[item]}`);
      commits[item].forEach((commit) => {
        const { message } = commit;
        result.push(formatMessage(message, commit, template, item));
      });
    }
  });
  return result.join('\r');
};

module.exports = transformCommitsToMd;
