// @flow

type DuplicatePointerType<T> = {|
  +index: number,
  +value: T,
|};

export default <T: *>(members: $ReadOnlyArray<T>, iteratee: (T) => string): $ReadOnlyArray<$ReadOnlyArray<DuplicatePointerType<T>>> => {
  let memberFingerprintsIndexes = [];

  const memberFingerprints = [];

  const memberSize = members.length;

  let index0 = -1;

  while (++index0 < memberSize) {
    memberFingerprintsIndexes.push(index0);
    memberFingerprints.push(iteratee(members[index0]));
  }

  const duplicateMemberTuples = [];

  let index1 = -1;

  while (++index1 < memberSize) {
    const duplicateMembers = [];

    const nextMemberFingerprintIndexes = [];

    let found = false;

    let nextIndex1 = index1;

    for (const index2 of memberFingerprintsIndexes) {
      if (memberFingerprints[index1] === memberFingerprints[index2]) {
        if (index1 !== index2) {
          if (index2 === nextIndex1 + 1) {
            nextIndex1++;
          }

          if (found) {
            duplicateMembers.push(
              {
                index: index2,
                value: members[index2],
              },
            );
          } else {
            found = true;

            duplicateMembers.push(
              {
                index: index1,
                value: members[index1],
              },
              {
                index: index2,
                value: members[index2],
              },
            );
          }
        }
      } else {
        nextMemberFingerprintIndexes.push(index2);
      }

      index1 = nextIndex1;
    }

    memberFingerprintsIndexes = nextMemberFingerprintIndexes;

    if (duplicateMembers.length > 0) {
      duplicateMemberTuples.push(duplicateMembers);
    }
  }

  return duplicateMemberTuples;
};
