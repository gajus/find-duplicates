import {
  PerformanceObserver,
  performance,
} from 'perf_hooks';
import findDuplicates from './findDuplicates';

const obs = new PerformanceObserver((items) => {
  // eslint-disable-next-line no-console
  console.log(items.getEntries()[0].duration);

  performance.clearMarks();
});
obs.observe({
  entryTypes: ['measure'],
});

const subjects = [
  {
    foo: 'foo',
  },
  {
    foo: 'foo',
  },
  {
    foo: 'bar',
  },
  {
    foo: 'baz',
  },
  {
    foo: 'baz',
  },
  {
    foo: 'qux',
  },
  {
    foo: 'foo',
  },
  {
    foo: 'foo',
  },
  {
    foo: 'bar',
  },
  {
    foo: 'baz',
  },
  {
    foo: 'baz',
  },
  {
    foo: 'qux',
  },
  {
    foo: 'foo',
  },
  {
    foo: 'foo',
  },
  {
    foo: 'bar',
  },
  {
    foo: 'baz',
  },
  {
    foo: 'baz',
  },
  {
    foo: 'qux',
  },
  {
    foo: 'foo',
  },
  {
    foo: 'foo',
  },
  {
    foo: 'bar',
  },
  {
    foo: 'baz',
  },
  {
    foo: 'baz',
  },
  {
    foo: 'qux',
  },
]
  .map((subject) => {
    return JSON.stringify(subject);
  });

let sample = 1000000;

performance.mark('A');

while (sample--) {
  findDuplicates(subjects, (subject) => {
    return subject;
  });
}

performance.mark('B');

performance.measure('A to B', 'A', 'B');
