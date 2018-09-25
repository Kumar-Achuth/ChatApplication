const http = require('./http.util');

const URL = 'https://registry.npmjs.org/';

function makeUrl(repo) {
    return `${URL}${repo}`;
}

async function getVersions(repo) {
    const info = await http.get(makeUrl(repo));
    return Object.keys(info.versions);
}

module.exports = {
    getVersions
}