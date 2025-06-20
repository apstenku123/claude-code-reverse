/**
 * Searches for the index of the last interaction entry whose first element matches the given criteria.
 *
 * @param {Array<Array<any>>} interactionEntries - An array of interaction entries, each entry is an array where the first element is checked for a match.
 * @param {any} matchCriteria - The value or object to match against the first element of each interaction entry using the OH function.
 * @returns {number} The index of the matching interaction entry if found; otherwise, -1.
 */
function findMatchingInteractionEntryIndex(interactionEntries, matchCriteria) {
  let index = interactionEntries.length;
  // Iterate backwards through the interactionEntries array
  while (index--) {
    // Use the external OH function to check for a match
    if (OH(interactionEntries[index][0], matchCriteria)) {
      return index;
    }
  }
  // Return -1 if no matching entry is found
  return -1;
}

module.exports = findMatchingInteractionEntryIndex;