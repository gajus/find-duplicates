// @flow

import test from 'ava';
import findDuplicates from '../src/findDuplicates';

test('returns empty array if there are no duplicates', (t) => {
  const duplicates = findDuplicates(['a', 'b', 'c'], (subject) => {
    return subject;
  });

  t.true(duplicates.length === 0);
});

test('returns duplicate values (simple)', (t) => {
  const duplicates = findDuplicates(['a', 'a', 'b', 'c'], (subject) => {
    return subject;
  });

  t.deepEqual(
    duplicates,
    [
      [
        'a',
        'a',
      ],
    ],
  );
});

test('returns duplicate values (object)', (t) => {
  const haystack = [
    {
      id: 1,
      name: 'a',
    },
    {
      id: 2,
      name: 'a',
    },
    {
      id: 3,
      name: 'b',
    },
    {
      id: 4,
      name: 'c',
    },
  ];

  const duplicates = findDuplicates(haystack, (subject) => {
    return subject.name;
  });

  t.deepEqual(
    duplicates,
    [
      [
        {
          id: 1,
          name: 'a',
        },
        {
          id: 2,
          name: 'a',
        },
      ],
    ],
  );
});

test('returns duplicate values (multiple)', (t) => {
  const duplicates = findDuplicates(['a', 'a', 'b', 'b', 'c'], (subject) => {
    return subject;
  });

  t.deepEqual(
    duplicates,
    [
      [
        'a',
        'a',
      ],
      [
        'b',
        'b',
      ],
    ],
  );
});
