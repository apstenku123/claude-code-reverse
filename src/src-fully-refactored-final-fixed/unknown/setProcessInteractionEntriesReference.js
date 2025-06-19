/**
 * Sets the global reference to the processInteractionEntries function.
 * This allows other modules to use or override the processInteractionEntries implementation.
 *
 * @param {Function} processInteractionEntriesFn - The function that processes interaction entries.
 * @returns {void}
 */
function setProcessInteractionEntriesReference(processInteractionEntriesFn) {
  // Assign the provided function to the global Fs variable
  Fs = processInteractionEntriesFn;
}

module.exports = setProcessInteractionEntriesReference;