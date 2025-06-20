/**
 * Sets the global interaction entries to the provided array.
 *
 * @param {Array} interactionEntries - An array of interaction entry objects to be set globally.
 * @returns {void}
 *
 * This function updates the global variable 'dyA' with the provided interaction entries array.
 * It does not return a value.
 */
function setCurrentInteractionEntries(interactionEntries) {
  // Update the global interaction entries reference
  dyA = interactionEntries;
}

module.exports = setCurrentInteractionEntries;