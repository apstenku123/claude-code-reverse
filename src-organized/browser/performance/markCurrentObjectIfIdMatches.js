/**
 * Checks if the global currentObject exists and its id matches the provided id.
 * If so, sets the global isCurrentObjectMatched flag to true.
 *
 * @param {string|number} objectId - The id to compare with currentObject.id
 * @returns {void}
 */
function markCurrentObjectIfIdMatches(objectId) {
  // Check if the global currentObject exists and its id matches the provided id
  if (currentObject !== null && currentObject.id === objectId) {
    // Set the global flag to indicate a match was found
    isCurrentObjectMatched = true;
  }
}

module.exports = markCurrentObjectIfIdMatches;