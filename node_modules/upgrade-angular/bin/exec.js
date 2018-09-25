const argv = require('yargs')
.default('file', './package.json')
.default('stable', true)
.argv;

const upgrade = require('../lib');

module.exports = function(mode) {
    upgrade(mode, argv.file, argv._[0], argv.stable);
}