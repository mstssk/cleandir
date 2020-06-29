# cleandir

![Test](https://github.com/mstssk/cleandir/workflows/Test/badge.svg)
[![npm version](https://badge.fury.io/js/%40mstssk%2Fcleandir.svg)](https://badge.fury.io/js/%40mstssk%2Fcleandir)

`cleandir` just empty output directories.

- Single purpose and feature.
  - Empty compiler's output directories.
  - Remain specified top directory.
    - `.gitkeep` and `.keep` is also remained.
- Very tiny!
  - No dependencies.

Inspired by https://stackoverflow.com/a/57866165

## Install

This package requires Node.js v12.12.0 or higher.

```
$ npm install --save-dev @mstssk/cleandir
```

### Install from GitHub Package

You can install from GitHub Package.
See a package page and GitHub Package document.

- Package: https://github.com/mstssk/cleandir/packages/285984
- Document: https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#installing-a-package

## Usage

In npm-run-script:

```json
// package.json
{
  "scripts": {
    "prebuild": "cleandir dist/",
    "build": "tsc"
  }
}
```

In your code:

```js
const { cleandir } = require("@mstssk/cleandir");

(async function () {
  await cleandir(dirPaths);
})();
```

### More complicated deleting?

I recommend to use [rimraf](https://www.npmjs.com/package/rimraf), if you want conditional deleting.

## Changelog

See https://github.com/mstssk/cleandir/releases
