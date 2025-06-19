/**
 * Checks if an interaction entry exists in the global $D2 mapping.
 *
 * @param {string} interactionEntryKey - The key representing the interaction entry to check.
 * @returns {boolean} True if the interaction entry exists in $D2, false otherwise.
 */
function isInteractionEntryDefined(interactionEntryKey) {
  // Check if the interaction entry key exists in the $D2 mapping
  return $D2[interactionEntryKey] !== undefined;
}

module.exports = isInteractionEntryDefined;