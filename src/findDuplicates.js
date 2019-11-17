// @flow

type DuplicatePointerType<T> = {|
  +index: number,
  +value: T,
|};

export default <T: *>(
  members: $ReadOnlyArray<T>,
  iteratee: (T) => string,
): $ReadOnlyArray<$ReadOnlyArray<DuplicatePointerType<T>>> => {
  const memberFingerprints = [];

  const memberSize = members.length;

  let index0 = -1;

  while (++index0 < memberSize) {
    memberFingerprints.push(iteratee(members[index0]));
  }

  const valueToIndex = new Map();

  let index1 = -1;

  while (++index1 < memberSize) {
    const value = memberFingerprints[index1];

    let entry = valueToIndex.get(value);

    if (entry) {
      entry.push(index1);
    } else {
      entry = [
        index1,
      ];

      valueToIndex.set(value, entry);
    }
  }

  const duplicateMemberTuples = [];

  for (const indexes of valueToIndex.values()) {
    if (indexes.length > 1) {
      duplicateMemberTuples.push(
        indexes.map((index) => {
          return {
            index,
            value: members[index],
          };
        }),
      );
    }
  }

  return duplicateMemberTuples;
};
