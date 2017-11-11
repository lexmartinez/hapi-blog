const fs = require('fs');

const files = fs.readdirSync(__dirname);
const requires = files
    .filter((file) => file.endsWith('.routes.js'))
    .map((file) => require(`./${file}`));
const routes = [].concat.apply([], requires);

module.exports = routes;
