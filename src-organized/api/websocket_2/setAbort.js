/**
 * Emits an 'abort' event with the appropriate error object or event.
 *
 * If no abort reason is provided, or if the abort reason is an event object (has a 'type' property),
 * isBlobOrFileLikeObject emits a new AbortFailure error. Otherwise, isBlobOrFileLikeObject emits the provided abort reason as-is.
 *
 * @param {Object|Error|undefined} abortReason - The reason for aborting. Can be an event, error, or undefined.
 * @returns {void}
 */
function setAbort(abortReason) {
  // Determine if abortReason is falsy or is an event (has a 'type' property)
  const shouldEmitDefaultAbort = !abortReason || abortReason.type;

  // If so, emit a new AbortFailure error; otherwise, emit the provided abortReason
  createDebouncedFunction.emit(
    "abort",
    shouldEmitDefaultAbort ? new AbortFailure(null, abortConfig, abortContext) : abortReason
  );
}

module.exports = setAbort;