# massbank-parser

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![Test coverage][codecov-image]][codecov-url]
  [![npm download][download-image]][download-url]

Parse MassBank file format to a JSON.

## Installation

`$ npm install --save massbank-parser`

## Usage

```js
import parse from 'massbank-parser';

const result = parse(massbankText);
// result is an object with the parsed massbank file
```

## [API Documentation](https://cheminfo.github.io/massbank-parser/)

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/massbank-parser.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/massbank-parser
[travis-image]: https://img.shields.io/travis/cheminfo/massbank-parser/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cheminfo/massbank-parser
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/massbank-parser.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/cheminfo/massbank-parser
[download-image]: https://img.shields.io/npm/dm/massbank-parser.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/massbank-parser
