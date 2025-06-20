/**
 * Calculates the number of interaction entries based on the encoded input string.
 * Assumes each interaction entry is represented by 4 characters in the string.
 *
 * @param {string} encodedInteractionEntries - Encoded string representing interaction entries.
 * @returns {number} The number of interaction entries in the encoded string.
 */
function getInteractionEntryCount(encodedInteractionEntries) {
  // Each interaction entry is represented by 4 characters in the encoded string
  return encodedInteractionEntries.length / 4;
}

module.exports = getInteractionEntryCount;