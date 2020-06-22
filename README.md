# cleandir

![Test](https://github.com/mstssk/cleandir/workflows/Test/badge.svg)

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
