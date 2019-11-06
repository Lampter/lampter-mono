# lampter-monorepo
[![Build Status](https://github.com/wixplosives/lampter-monorepo/workflows/CI/badge.svg)](https://github.com/wixplosives/lampter-monorepo/actions)

lampter monorepo setup with yarn workspaces, typescript, and lerna.

## Setup explained

### Tooling

-   Monorepo is installed using [yarn](https://github.com/yarnpkg/yarn).

    -   Packages are automatically linked together, meaning you can do cross-package work within the repo.
    -   `devDependencies` are common, and only appear in the root `package.json`. Easier to manage and upgrade.
    -   Each package has its own `scripts` and `dependencies`. They are being installed in the root `node_modules`, using the same deduping mechanism `yarn` uses for single packages.
    -   Adding new packages is as simple as dropping an existing package in the `packages` folder, and re-running `yarn`.

-   Monorepo scripts are being executed using [lerna](https://github.com/lerna/lerna).

    -   `lerna publish` - multi-package publishing.
    -   `lerna run` - running package scripts.
    -   `lerna updated` - shows changed packages (since last tag).

-   Sources and tests are written in strict [TypeScript](https://github.com/Microsoft/TypeScript).

    -   Common base `tsconfig.json`.
    -   [@ts-tools/node](https://github.com/AviVahl/ts-tools) is used to run code directly from sources.

-   Testing is done using [mocha](https://github.com/mochajs/mocha) and [chai](https://github.com/chaijs/chai).
    -   Light, battle-tested, projects with few dependencies.
    -   Can be bundled and used in the browser.

### Included lampter packages

-   **@lampter/components**

    -   [React](https://github.com/facebook/react) components library.
    -   Built as `cjs` (Node consumption) and `esm` (bundler consumption).

-   **@lampter/client**

    -   [React](https://github.com/facebook/react) application.
    -   Uses the `@lampter/components` package (also inside monorepo).
    -   Built as `cjs` (Node consumption) and `umd` (browser consumption).
  
-   **@lampter/github-app**
    -   [Protobot](https://probot.github.io/docs/) application.
    -   Listens on http://localhost:3000
    -   Uses smee.io webProxy 
    -   Installed on the Lampter Org
    -   Built as `cjs` (Node consumption).

-   **@lampter/server**
    -   [Express](https://github.com/expressjs/express) & [Apollo-Server-Express](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express) application.
    -   [Sequelize-Typescript](https://github.com/RobinBuschmann/sequelize-typescript) ORM
    -   [Type-Graphql](https://github.com/MichalLytek/type-graphql) Resolver and Autogen Schema.gql
    -   Listens on http://localhost:5000
    -   Built as `cjs` (Node consumption).

### Basic structure and configurations

```
.github                  // CI flow configuration (GitHub Actions)
packages/
  some-package/
    src/
      index.ts
    test/
      test.spec.ts
    LICENSE              // license file. included in npm artifact
    package.json         // package-specific deps and scripts
    README.md            // shown in npmjs.com. included in npm artifact
    tsconfig.build.json  // config used to build for publishing

.eslintignore            // eslint (linter) ignored directories/files
.eslintrc                // eslint (linter) configuration
.gitignore               // github's default node gitignore with customizations
.mocharc.js              // mocha (test runner) configuration
.prettierrc.js           // prettier (formatter) configuration
lerna.json               // lerna configuration
LICENSE                  // root license file. picked up by github
package.json             // common dev deps and workspace-wide scripts
README.md                // workspace-wide information. shown in github
tsconfig.json            // common typescript configuration
yarn.lock                // the only lock file in the repo. all packages combined
```

### Dependency management

Traditionally, working with projects in separate repositories makes it difficult to keep versions of `devDependencies` aligned, as each project can specify its own `devDependency` versions.

Monorepos simplify this, because `devDependencies` are shared between all packages within the monorepo.

Taking this into account, we use the following dependency structure:

-   `devDependencies` are placed in the root `package.json`
-   `dependencies` and `peerDependencies` are placed in the `package.json` of the relevant package requiring them, as each package is published separately

New `devDependencies` can be added to the root `package.json` using yarn:

```sh
yarn add <package name> --dev -W
```

Some packages depend on sibling packages within the monorepo. For example, in this repo, `@lampter/client` depends on `@lampter/components`. This relationship is just a normal dependency, and can be described in the `package.json` of `app` like so:

```json
  "dependencies": {
    "@lampter/components": "<package version>"
  }
```
