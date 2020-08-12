# MajorKey
---

### A Cross-platform desktop app to remap keyboards

### Known Issues
- [F12 key can't be remapped on Windows](https://github.com/electron/electron/issues/5066)
  - Still works if using modifier
- certain key combonations that are already used by the operating system can't be remapped

## Steps to build

### change script `abirebuild` in package.json `target` to your version of electron and `abi` to your node abi version

```bash
npm i 
npm install --global --production windows-build-tools
npm run abirebuild
./node_modules/.bin/electron-rebuild
```

#### thanks to @vatyx for encouraging me to pick this project back up

# Notes from the project I forked this from
---

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a server that sends hot updates to the renderer process:

```bash
npm run dev
```

Run these two commands __simultaneously__ in different console tabs:

```bash
npm run start-renderer-dev
npm run start-main-dev
```

## Packaging

To package apps for the local platform:

```bash
npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for dependencies.

Then,
```bash
npm run package-all
```

To package apps with options:

```bash
npm run package -- --[option]
```

## Further commands

To run the application without packaging run

```bash
npm run build
npm start
```

To run End-to-End Test

```bash
npm run build
npm run test-e2e
```

#### Options

See [electron-builder CLI Usage](https://github.com/electron-userland/electron-builder#cli-usage)

## How to add modules to the project

You will need to add other modules to this boilerplate, depending on the requirements of your project. For example, you may want to add [node-postgres](https://github.com/brianc/node-postgres) to communicate with PostgreSQL database, or 
[material-ui](http://www.material-ui.com/) to reuse react UI components.

 Please read the following section before installing any dependencies 

### Module Structure

This boilerplate uses a [two package.json structure](https://github.com/electron-userland/electron-builder/wiki/Two-package.json-Structure). This means, you will have two `package.json` files.

1. `./package.json` in the root of your project
1. `./app/package.json` inside `app` folder

### Which `package.json` file to use

**Rule of thumb** is: all modules go into `./package.json` except native modules. Native modules go into `./app/package.json`.

1. If the module is native to a platform (like node-postgres) or otherwise should be included with the published package (i.e. bcrypt, openbci), it should be listed under `dependencies` in `./app/package.json`.
2. If a module is `import`ed by another module, include it in `dependencies` in `./package.json`.   See [this ESLint rule](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md). Examples of such modules are `material-ui`, `redux-form`, and `moment`.
3. Otherwise, modules used for building, testing and debugging should be included in `devDependencies` in `./package.json`.

### Further Readings

See the wiki page, [Module Structure — Two package.json Structure](https://github.com/chentsulin/electron-react-boilerplate/wiki/Module-Structure----Two-package.json-Structure) to understand what is native module, the rationale behind two package.json structure and more.

For an example app that uses this boilerplate and packages native dependencies, see [erb-sqlite-example](https://github.com/amilajack/erb-sqlite-example).

## Static Type Checking
This project comes with Flow support out of the box! You can annotate your code with types, [get Flow errors as ESLint errors](https://github.com/amilajack/eslint-plugin-flowtype-errors), and get [type errors during runtime](https://github.com/codemix/flow-runtime) during development. Types are completely optional.


# Additional development notes
---
## Lifecycle
-> Node main.dev.js app starts
  -> on build
    -> pre-built static react app is served to a new chromium window
      -> keeps running in the background unless the app is "exited"
    -> Menu and tray objects are created and set
    -> check if the user has saved settings
    -> start watching the files for changes from the front end
  -> on quit
    -> shut down app window
    -> stop watching files
    -> close the app
    

## Useful links
https://github.com/electron-userland/electron-json-storage

