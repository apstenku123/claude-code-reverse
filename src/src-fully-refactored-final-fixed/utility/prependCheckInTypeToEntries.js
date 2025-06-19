/**
 * Prepends a 'check_in' type object to the provided interaction entries array.
 *
 * This utility function is used to ensure that the 'check_in' interaction type
 * is always the first entry in the array of interaction entries before further processing.
 *
 * @param {Array<Object>} interactionEntries - An array of interaction entry objects to be processed.
 * @returns {Array<Object>} a new array with a 'check_in' type object prepended to the original entries.
 */
function prependCheckInTypeToEntries(interactionEntries) {
  // Create a new array with the 'check_in' type object as the first element,
  // followed by all elements from the provided interactionEntries array.
  return [
    { type: "check_in" },
    ...interactionEntries
  ];
}

module.exports = prependCheckInTypeToEntries;