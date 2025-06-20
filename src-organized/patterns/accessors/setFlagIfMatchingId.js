/**
 * Checks if the globalObject is not null and its id matches the provided id.
 * If so, sets the globalFlag to true.
 *
 * @param {string|number} targetId - The id to compare against globalObject.id
 * @returns {void}
 */
function setFlagIfMatchingId(targetId) {
  // Check if globalObject exists and its id matches the provided targetId
  if (globalObject !== null && globalObject.id === targetId) {
    globalFlag = true;
  }
}

module.exports = setFlagIfMatchingId;