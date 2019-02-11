# Contributing Guidelines

I welcome any and all questions/suggestions/PRs/etc.! If you're interested in helping out, here's a (brief) guide to get you started:

- The project is written in Typescript, all source files are in the [`src/`](./src/) directory.

- The files in [`connectors/`](./connectors/), [`hooks/`](./hooks/), and [`utilities/`](./utilities/) exist solely so that their contents can be imported with `import { ... } from 'web3-react/{connectors,hooks,utilities}'`

- All files are linted with [TSlint](https://palantir.github.io/tslint/), and formatted with [Prettier](https://prettier.io/). You can run `yarn ensureLinted` and `yarn ensureFormatted` to check this.

- To build/watch changes in, run `yarn {build,watch}`.

- Testing is done with Jest, run with `yarn test`.