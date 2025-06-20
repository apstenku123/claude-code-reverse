/**
 * Handles HTTP/2 frame errors by creating an error object and updating internal state.
 *
 * @param {number} frameType - The type of the HTTP/2 frame that caused the error.
 * @param {number} errorCode - The error code associated with the frame error.
 * @param {number} errorFlag - a flag indicating whether to handle the error (0 = handle, other = ignore).
 * @returns {void}
 */
function handleHttp2FrameError(frameType, errorCode, errorFlag) {
  // Only handle the error if the errorFlag is 0
  if (errorFlag === 0) {
    // Create a new error object with a descriptive message
    const frameError = new gd1(`HTTP/2: "frameError" received - type ${frameType}, code ${errorCode}`);
    // Update the internal error state
    this[$createObjectTracker][lV] = frameError;
    // Notify observers or handlers of the error
    this[qh][md1](frameError);
  }
}

module.exports = handleHttp2FrameError;