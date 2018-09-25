const npm = require('./util/npm');
const filter = require('./filter');
const update = require('./update');
const log = require('./util/log');

const ERR_NO_MATCHING_VERSION = 'Sorry, there was no matching version found!';

const modes = {
    ANGULAR: 'angular',
    ANGULARJS: 'angularjs'
}

function getOptions(mode) {
    return require(`../config/${modes[mode]}`);
}

async function exec(mode, packageJson, versionPattern, stable) {
    const options = getOptions(mode);
    const versionHistory = await log.action('Reading version history', async () => await npm.getVersions(options.reference));
    try {
        const version = !!versionPattern ? filter.getLatestByPattern(versionHistory, versionPattern, stable)
            : filter.getLatest(versionHistory, stable);
        if (version) {
            log.action(`Updating angular in package.json to ${version}`, () => { update.updatePackageJson(packageJson, options.peers, version) });
        } else {
            log.fatalError(ERR_NO_MATCHING_VERSION);
        }
    } catch(err) {
        log.fatalError(ERR_NO_MATCHING_VERSION);
    }
}

module.exports = exec;