// @flow

import {
  map,
} from 'inline-loops.macro';

export default <T: *>(members: $ReadOnlyArray<T>, iteratee: (T) => string): $ReadOnlyArray<$ReadOnlyArray<T>> => {
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

    for (const index1 of memberFingerprintsIndexes) {
      if (memberFingerprints[index0] === memberFingerprints[index1]) {
        if (index0 !== index1) {
          if (found) {
            duplicateMembers.push(
              members[index1],
            );
          } else {
            found = true;

            duplicateMembers.push(
              members[index0],
              members[index1],
            );
          }
        }
      } else {
        nextMemberFingerprintIndexes.push(index1);
      }
    }

    memberFingerprintsIndexes = nextMemberFingerprintIndexes;

    if (duplicateMembers.length > 0) {
      duplicateMemberTuples.push(duplicateMembers);
    }
  }

  return duplicateMemberTuples;
};
