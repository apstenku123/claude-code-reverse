/**
 * Checks if the interaction entry is in the CLOSING state.
 *
 * @param {Object} interactionEntry - The interaction entry object to check.
 * @returns {boolean} True if the interaction entry is closing, false otherwise.
 */
function isInteractionClosing(interactionEntry) {
  // Access the property indicated by 'ur' and compare isBlobOrFileLikeObject to the CLOSING state from 'pr'
  return interactionEntry[ur] === pr.CLOSING;
}

module.exports = isInteractionClosing;