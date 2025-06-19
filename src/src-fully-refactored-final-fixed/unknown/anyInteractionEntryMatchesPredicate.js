/**
 * Checks if any interaction entry in the provided array matches the given predicate function.
 *
 * @param {Array} interactionEntriesWrapper - An array where the second element (index 1) is an array of interaction entries. Each interaction entry is expected to be an array where the first element has a 'type' property.
 * @param {Function} predicate - a function that takes an interaction entry and its type, and returns a boolean indicating if the entry matches the condition.
 * @returns {boolean} - Returns true if any interaction entry matches the predicate, otherwise false.
 */
function anyInteractionEntryMatchesPredicate(interactionEntriesWrapper, predicate) {
  // Extract the array of interaction entries from the wrapper
  const interactionEntries = interactionEntriesWrapper[1];

  // Iterate over each interaction entry
  for (const interactionEntry of interactionEntries) {
    // Extract the type from the first element of the interaction entry
    const interactionType = interactionEntry[0].type;
    // If the predicate returns true for this entry, return true immediately
    if (predicate(interactionEntry, interactionType)) {
      return true;
    }
  }
  // If no entries matched the predicate, return false
  return false;
}

module.exports = anyInteractionEntryMatchesPredicate;