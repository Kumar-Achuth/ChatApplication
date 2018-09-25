# Upgrade Angular

For Angular / AngularJS, there are a lot of dependencies which must have the same version installed.
Updating all of them can be a bit annoying. Therefore, use this tool to quickly update all angular packages.

## Installation

```
npm install -g upgrade-angular
```

## Usage for Angular

```
upgrade-angular [arguments] [version]
```

Where arguments can be

| Command  | Description             | Default           |
|----------|-------------------------|-------------------|
| --file   | Path to package.json    | `./package.json`  |
| --stable | Whether to only include stable version    | `true`  |

`version` can be any particular version or a placeholder, such as 5.x for the latest 5 version.
Or just use latest to get the latest overall version.

> **Attention** Be aware that any semver notation will be overwritten by the exact version.

### Examples

Normal use case:

```
upgrade-angular
```

Upgrading to angular 5.x:

```
upgrade-angular 5.x
```

From a different folder:

```
upgrade-angular --file my_project/package.json
```

## Usage for Angular.JS ( <= 1.6)

```
upgrade-angularjs [arguments] [version]
```

For options, see the Angular version.