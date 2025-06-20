/**
 * Updates the global nextTimeoutTimestamp by adding 500ms to the result of handleCharacterCode().
 *
 * This function is typically called after processing a character code, to schedule the next timeout event.
 *
 * @returns {void} This function does not return a value.
 */
function updateTimeoutAfterCharacterProcessing() {
  // Call handleCharacterCode to process the current character and get the current timestamp
  // Add 500ms to schedule the next timeout
  nextTimeoutTimestamp = handleCharacterCode() + 500;
}

module.exports = updateTimeoutAfterCharacterProcessing;