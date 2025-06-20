/**
 * Calculates the number of groups of interaction entries based on the input array length.
 * Assumes each group consists of 4 entries.
 *
 * @param {Array} interactionEntries - Array of interaction entry objects to be grouped.
 * @returns {number} The number of groups (each containing 4 entries).
 */
function getInteractionEntryGroupCount(interactionEntries) {
  // Divide the total number of entries by 4 to get the number of groups
  return interactionEntries.length / 4;
}

module.exports = getInteractionEntryGroupCount;