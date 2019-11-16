// @flow

import {
  map,
} from 'inline-loops.macro';

export default <T: *>(members: $ReadOnlyArray<T>, iteratee: (T) => string): $ReadOnlyArray<$ReadOnlyArray<T>> => {
  const memberFingerprints = map(members, (member) => {
    return iteratee(member);
  });

  let memberFingerprintsIndexes = map(memberFingerprints, (member, index) => {
    return index;
  });

  const duplicateMemberTuples = [];

  let index0 = -1;

  for (const memberFingerprint0 of memberFingerprints) {
    index0++;

    const duplicateMembers = [];

    const nextMemberFingerprintIndexes = [];

    let found = false;

    for (const index1 of memberFingerprintsIndexes) {
      if (memberFingerprint0 === memberFingerprints[index1]) {
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
