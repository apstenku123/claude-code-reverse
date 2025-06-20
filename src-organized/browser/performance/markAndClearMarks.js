/**
 * Marks the specified identifier and then immediately clears all marks associated with isBlobOrFileLikeObject.
 * This function is typically used for performance profiling or tracking purposes, where a mark is set and then cleared.
 *
 * @param {string} identifier - The unique identifier to mark and clear marks for.
 * @returns {void}
 */
function markAndClearMarks(identifier) {
  // Mark the identifier for profiling or tracking
  KH.mark(identifier);
  // Immediately clear all marks associated with the identifier
  KH.clearMarks(identifier);
}

module.exports = markAndClearMarks;