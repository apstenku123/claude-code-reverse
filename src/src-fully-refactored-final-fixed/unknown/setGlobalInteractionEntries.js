/**
 * Sets the global interaction entries array used for processing user interactions.
 *
 * @param {Array} interactionEntries - An array of interaction entry objects to be globally stored.
 * @returns {void}
 *
 * This function assigns the provided array of interaction entries to the global variable
 * used by the processInteractionEntries function. This allows other parts of the application
 * to access and process the current set of interaction entries.
 */
function setGlobalInteractionEntries(interactionEntries) {
  // Assign the provided interaction entries to the global variable
  gj = interactionEntries;
}

module.exports = setGlobalInteractionEntries;