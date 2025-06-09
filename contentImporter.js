const chalk = require('chalk');

const { getBlogposts } = require('./directus/blogposts');
const { getWinners } = require('./directus/winners');
const { getJudges } = require('./directus/judges');

console.log('');
console.log(chalk.green('Starting importing data from Directus...'));
console.log('');
console.log(chalk.green('[ NEW COMMONS: BLOGPOSTS - WINNERS - JUDGES ]'));

getBlogposts();
getWinners();
getJudges();