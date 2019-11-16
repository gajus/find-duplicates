# find-duplicates

[![Travis build status](http://img.shields.io/travis/gajus/find-duplicates/master.svg?style=flat-square)](https://travis-ci.org/gajus/find-duplicates)
[![Coveralls](https://img.shields.io/coveralls/gajus/find-duplicates.svg?style=flat-square)](https://coveralls.io/github/gajus/find-duplicates)
[![NPM version](http://img.shields.io/npm/v/find-duplicates.svg?style=flat-square)](https://www.npmjs.org/package/find-duplicates)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

Finds duplicate entries in a JavaScript array using an iteratee.

## Usage

`findDuplicates` produces an array of duplicate input array entries grouped by the uniting iteratee value.

```js
import findDuplicates from 'find-duplicates';

const haystack = [
  {
    id: 1,
    name: 'a'
  },
  {
    id: 2,
    name: 'a'
  },
  {
    id: 3,
    name: 'b'
  },
  {
    id: 4,
    name: 'b'
  },
  {
    id: 5,
    name: 'c'
  }
];

const duplicates = findDuplicates(haystack, (subject) => {
  return subject.name;
});

duplicates;
// [
//   [
//     {
//       id: 1,
//       name: 'a'
//     },
//     {
//       id: 2,
//       name: 'a'
//     }
//   ],
//   [
//     {
//       id: 3,
//       name: 'b'
//     },
//     {
//       id: 4,
//       name: 'b'
//     }
//   ]
// ]

```

## Benchmark

Run benchmark before making changes and ensure that performance does not degrade after changes.

```bash
$ npm run benchmark

```
