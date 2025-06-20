/**
 * Prepends a 'check_in' type entry to the provided interaction entries array.
 *
 * This utility function is used to ensure that the first entry in the interaction entries array
 * is always an object with type 'check_in'. This can be useful for marking the beginning of a
 * sequence of interactions or for analytics purposes.
 *
 * @param {Array<Object>} interactionEntries - The array of interaction entry objects to process.
 * @returns {Array<Object>} a new array with a 'check_in' type entry prepended to the original entries.
 */
function prependCheckInTypeEntry(interactionEntries) {
  // Create a new array with the 'check_in' entry as the first element,
  // followed by the original interaction entries.
  return [
    { type: "check_in" },
    interactionEntries
  ];
}

module.exports = prependCheckInTypeEntry;