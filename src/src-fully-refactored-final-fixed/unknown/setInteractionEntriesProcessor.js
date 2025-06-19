/**
 * Sets the global interaction entries processor function.
 *
 * This function assigns the provided processor function to the global variable
 * responsible for handling interaction entries throughout the application.
 *
 * @param {Function} processInteractionEntries - Function to process interaction entries.
 * @returns {void}
 */
function setInteractionEntriesProcessor(processInteractionEntries) {
  // Assign the processor function to the global variable
  iF0 = processInteractionEntries;
}

module.exports = setInteractionEntriesProcessor;