/**
 * Checks if the provided status is equal to the CONTINUATION status constant.
 *
 * @param {any} status - The status value to check against CONTINUATION.
 * @returns {boolean} True if the status is CONTINUATION, false otherwise.
 */
function isContinuationStatus(status) {
  // Compare the input status to the CONTINUATION constant from wR
  return status === wR.CONTINUATION;
}

module.exports = isContinuationStatus;