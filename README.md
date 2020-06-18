# cleandir

`cleandir` just empty output directories.

- Single purpose and feature.
  - Empty compiler's output directories.
  - Remain specified top directory.
      - `.gitkeep` and `.keep` is also remained.
- Very tiny!
  - No dependencies.

## Install

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

(async function() {
    await cleandir(dirPaths);
})();
```
