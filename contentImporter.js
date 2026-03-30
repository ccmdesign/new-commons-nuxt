const chalk = require('chalk');

const { getBlogposts } = require('./directus/blogposts');
const { getWinners } = require('./directus/winners');
const { getJudges } = require('./directus/judges');
const { getResources } = require('./directus/resources');

console.log('');
console.log(chalk.green('Starting importing data from Directus...'));
console.log('');
console.log(chalk.green('[ NEW COMMONS: BLOGPOSTS - WINNERS - JUDGES - RESOURCES ]'));

Promise.all([
  getBlogposts(),
  getWinners(),
  getJudges(),
  getResources(),
]).catch((err) => {
  console.error('Content import error:', err.message || err);
  process.exit(1);
});
