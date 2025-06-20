/**
 * Sets the global interaction entries to the provided array.
 * This function assigns the given array of interaction entries to the global variable
 * that stores all interaction entries for further processing.
 *
 * @param {Array} interactionEntries - An array of interaction entry objects to be stored globally.
 * @returns {void} This function does not return a value.
 */
function setInteractionEntries(interactionEntries) {
  // Assign the provided interaction entries array to the global variable
  iF0 = interactionEntries;
}

module.exports = setInteractionEntries;