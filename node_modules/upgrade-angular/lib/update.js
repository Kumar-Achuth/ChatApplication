const fs = require('fs');

const dependencyGroup = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];

function updateDependency(dependencyGroup, dependency, version) {
    if(dependencyGroup[dependency]) {
        dependencyGroup[dependency] = version;
    }
}
function updateDependencyGroup(dependencyGroup, dependencies, version) {
    dependencies.forEach(dependency => {
        updateDependency(dependencyGroup, dependency, version);
    });
}

function updatePackageJsonContent(packageJson, dependencies, version) {
    dependencyGroup.forEach(group => {
        if(packageJson[group]) {
            updateDependencyGroup(packageJson[group], dependencies, version);
        }
    });
    return packageJson;
}

function updatePackageJson(packageJsonPath, dependencies, version) {
    let content = readPackageJson(packageJsonPath);
    content = updatePackageJsonContent(content, dependencies, version);
    writePackageJson(packageJsonPath, content);
}

function readPackageJson(packageJsonPath) {
    return JSON.parse(fs.readFileSync(packageJsonPath).toString());
}

function writePackageJson(packageJsonPath, packageJson) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

module.exports = {
    updatePackageJson
}