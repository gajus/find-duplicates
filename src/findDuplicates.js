// @flow

import {
  map,
} from 'inline-loops.macro';

type DuplicatePointerType<T> = {|
  +index: number,
  +value: T,
|};

export default <T: *>(members: $ReadOnlyArray<T>, iteratee: (T) => string): $ReadOnlyArray<$ReadOnlyArray<DuplicatePointerType<T>>> => {
  let memberFingerprintsIndexes = [];

  const memberFingerprints = map(members, (member, index) => {
    memberFingerprintsIndexes.push(index);

    return iteratee(member);
  });

  const duplicateMemberTuples = [];

  const memberSize = memberFingerprints.length;

  let index0 = -1;

  while (index0++ < memberSize) {
    const duplicateMembers = [];

    const nextMemberFingerprintIndexes = [];

    let found = false;

    let nextIndex0 = index0;

    for (const index1 of memberFingerprintsIndexes) {
      if (memberFingerprints[index0] === memberFingerprints[index1]) {
        if (index0 !== index1) {
          if (index1 === nextIndex0 + 1) {
            nextIndex0++;
          }

          if (found) {
            duplicateMembers.push(
              {
                index: index1,
                value: members[index1],
              },
            );
          } else {
            found = true;

            duplicateMembers.push(
              {
                index: index0,
                value: members[index0],
              },
              {
                index: index1,
                value: members[index1],
              },
            );
          }
        }
      } else {
        nextMemberFingerprintIndexes.push(index1);
      }

      index0 = nextIndex0;
    }

    memberFingerprintsIndexes = nextMemberFingerprintIndexes;

    if (duplicateMembers.length > 0) {
      duplicateMemberTuples.push(duplicateMembers);
    }
  }

  return duplicateMemberTuples;
};
