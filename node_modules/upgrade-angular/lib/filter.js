function getStable(versions) {
    return versions.filter(v => v.indexOf('-') === -1);
}

function getLatest(versions, stable = true) {
    return _getLatest(stable ? getStable(versions) : versions);
}

function getLatestByPattern(versions, pattern, stable = true) {
    return _getLatest(filterPattern(versions, pattern, stable));
}

function _getLatest(versions) {
    return versions[versions.length - 1];
}

function filterPattern(versions, pattern, stable = false) {
    const xPattern = '[0-9.]+';
    const unstablePattern = '(-[a-z0-9.\\-]+)?';
    const parsedPattern = pattern.replace('x', xPattern);
    const regexPattern = '^'+parsedPattern + (stable ? '' : unstablePattern)+ '$';
    const regex = new RegExp(regexPattern);
    return versions.filter(version => regex.test(version));
}

module.exports = {
    getStable,
    getLatest,
    getLatestByPattern,
    filterPattern
}