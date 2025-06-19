/**
 * Checks if the given interaction entry has a status of "aborted".
 *
 * @param {Object} interactionEntry - The interaction entry object to check.
 * @param {string} interactionEntry.status - The status of the interaction entry.
 * @returns {boolean} Returns true if the interaction entry status is "aborted", otherwise false.
 */
const isInteractionAborted = (interactionEntry) => {
  // Return true if the status property is exactly 'aborted'
  return interactionEntry.status === "aborted";
};

module.exports = isInteractionAborted;