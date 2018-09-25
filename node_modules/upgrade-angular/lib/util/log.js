const readline = require('readline');
const chalk = require('chalk');
const figures = require('figures');

function fatalError(message) {
    error(message);
    process.exit(1);
}

function error(message) {
    console.error(chalk.red(`\nFATAL ERROR: ${message}`));
}

function writeWithTicks(message, tickCount) {
    let ticks = '.'.repeat(tickCount);
    process.stdout.write(`${ticks}\t${message}`);
}

function resetLine() {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout);
    readline.cursorTo(process.stdout, 0);
}

function logAction(message, callback) {
    process.stdout.write(`${chalk.yellow('...')}\t${message}\n`);
    let result = callback();
    resetLine();
    process.stdout.write(`${chalk.green(figures.tick)}\t${message}\n`);
    return result;
}



module.exports = {
    fatalError,
    error,
    action: logAction
}
