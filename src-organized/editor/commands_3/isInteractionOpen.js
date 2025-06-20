/**
 * Checks if the provided interaction entry is currently open.
 *
 * @param {Object} interactionEntry - The interaction entry object to check.
 * @returns {boolean} True if the interaction is open, false otherwise.
 */
function isInteractionOpen(interactionEntry) {
  // 'ur' is assumed to be the property key for the interaction state
  // 'pr.OPEN' is assumed to be the constant representing the 'open' state
  return interactionEntry[ur] === pr.OPEN;
}

module.exports = isInteractionOpen;