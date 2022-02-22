# Image processing api

Simple image processing api project.

# Scripts

Please install dependencies first with:

```
yarn run install:all
```

Runs dev server and hosts the app locally:

```
yarn run start
```

Runs defined tests:

```
yarn run test
```

Runs build script:

```
yarn run build
```

Runs linter:

```
yarn run lint
```

Runs prettier:

```
yarn run prettier
```

# API

_TODO: replace with swagger docs_

### [GET] api/images/process

Parameters:

- **filename\*** - name of the file to process the image
- **width\*** - desired width dimension
- **height\*** - desired height dimension

Example: http://localhost:3000/api/images/process?filename=test&width=300&height=300

# Dependencies

- [Typescript](https://www.typescriptlang.org/docs/)
- [Node.js](https://nodejs.dev/)
  - with [nvm](https://github.com/nvm-sh/nvm)
    - use a [deeper shell integration](https://github.com/nvm-sh/nvm#zsh) for convenience
- [Express.js](https://expressjs.com/)
- [Jasmine](https://jasmine.github.io/pages/docs_home.html)

## TODO:

- Client for showing, editing and uploading images
