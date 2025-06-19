/**
 * Checks if the given interaction entry is in the CLOSED state.
 *
 * @param {Object} interactionEntry - The interaction entry object to check.
 * @returns {boolean} True if the interaction is closed, false otherwise.
 */
function isInteractionClosed(interactionEntry) {
  // 'ur' is assumed to be the property key for the interaction state
  // 'pr.CLOSED' is the constant representing the closed state
  return interactionEntry[ur] === pr.CLOSED;
}

module.exports = isInteractionClosed;