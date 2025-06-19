/**
 * Returns a processed string representation of interaction entries.
 *
 * If the provided interaction entries array is null or undefined, returns an empty string.
 * Otherwise, processes the entries using the external normalizeNumberToString function.
 *
 * @param {Array} interactionEntries - Array of interaction entry objects to process.
 * @returns {string} Processed string representation of the interaction entries, or an empty string if input is null/undefined.
 */
function getProcessedInteractionEntriesString(interactionEntries) {
  // Return an empty string if the input is null or undefined
  if (interactionEntries == null) {
    return "";
  }
  // Process the interaction entries using the external normalizeNumberToString function
  return normalizeNumberToString(interactionEntries);
}

module.exports = getProcessedInteractionEntriesString;