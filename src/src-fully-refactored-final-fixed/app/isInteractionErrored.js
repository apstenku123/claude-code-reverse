/**
 * Checks if the provided interaction entry is errored.
 *
 * This function verifies that the given interaction entry exists and then delegates
 * to the external 'yD1.isErrored' method to determine if the entry is in an errored state.
 *
 * @param {object} interactionEntry - The interaction entry object to check for errors.
 * @returns {boolean} True if the interaction entry exists and is errored; otherwise, false.
 */
function isInteractionErrored(interactionEntry) {
  // Ensure the interaction entry exists and check if isBlobOrFileLikeObject is errored using yD1.isErrored
  return Boolean(interactionEntry && yD1.isErrored(interactionEntry));
}

module.exports = isInteractionErrored;