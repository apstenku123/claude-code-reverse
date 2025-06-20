/**
 * Checks if any interaction in the provided list satisfies the given predicate function.
 *
 * @param {Array} interactionGroup - An array where the second element (index 1) is an array of interaction entries.
 *        Each interaction entry is expected to be an array where the first element has a 'type' property.
 * @param {Function} predicate - a function that takes an interaction entry and its type, and returns a boolean.
 * @returns {boolean} Returns true if any interaction entry satisfies the predicate, otherwise false.
 */
function doesAnyInteractionMatchCondition(interactionGroup, predicate) {
  const interactionEntries = interactionGroup[1]; // Extract the array of interaction entries
  for (const interactionEntry of interactionEntries) {
    const interactionType = interactionEntry[0].type; // Extract the type from the first element
    // If the predicate returns true for this entry, return true immediately
    if (predicate(interactionEntry, interactionType)) {
      return true;
    }
  }
  // If none of the entries matched, return false
  return false;
}

module.exports = doesAnyInteractionMatchCondition;