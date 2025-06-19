/**
 * Returns a processed string representation of interaction entries, or an empty string if input is null or undefined.
 *
 * @param {Array} interactionEntries - An array of interaction entry objects to be processed.
 * @returns {string} The processed string from interaction entries, or an empty string if input is null/undefined.
 */
function getProcessedInteractionEntriesOrEmptyString(interactionEntries) {
  // If the input is null or undefined, return an empty string
  if (interactionEntries == null) {
    return "";
  }
  // Otherwise, process the interaction entries using toStringPreservingNegativeZero(external dependency)
  return toStringPreservingNegativeZero(interactionEntries);
}

module.exports = getProcessedInteractionEntriesOrEmptyString;