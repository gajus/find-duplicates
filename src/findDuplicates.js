// @flow

export default <T: *>(haystack: $ReadOnlyArray<T>, iteratee: (T) => *): $ReadOnlyArray<$ReadOnlyArray<T>> => {
  const duplicateNeedles = haystack
    .reduce((accumulator, currentValue, index, self) => {
      const needle = iteratee(currentValue);

      const maybeSelfIndex = self.findIndex((maybeNeedle) => {
        return iteratee(maybeNeedle) === needle;
      });

      const maybeDuplicateSelfIndex = accumulator.findIndex((maybeNeedle) => {
        return iteratee(maybeNeedle) === needle;
      });

      if (maybeSelfIndex !== index && maybeDuplicateSelfIndex === -1) {
        accumulator.push(currentValue);
      }

      return accumulator;
    }, []);

  const duplicates = [];

  for (const duplicateNeedle of duplicateNeedles) {
    const group = [];

    for (const subject of haystack) {
      if (iteratee(duplicateNeedle) === iteratee(subject)) {
        group.push(subject);
      }
    }

    duplicates.push(group);
  }

  return duplicates;
};
