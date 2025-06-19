/**
 * Emits an 'abort' event with the appropriate payload based on the abort reason.
 *
 * If no abort reason is provided, or if the abort reason has a 'type' property,
 * a new AbortFailure instance is emitted. Otherwise, the provided abort reason is emitted as-is.
 *
 * @param {Object|null|undefined} abortReason - The reason for aborting, or null/undefined if not specified.
 * @returns {void}
 */
function setAbortEvent(abortReason) {
  // If abortReason is falsy or has a 'type' property, emit a new AbortFailure instance
  // Otherwise, emit the provided abortReason as-is
  const shouldEmitNewAbortFailure = !abortReason || abortReason.type;
  const payload = shouldEmitNewAbortFailure
    ? new AbortFailure(null, abortConfig, abortContext)
    : abortReason;
  eventEmitter.emit("abort", payload);
}

module.exports = setAbortEvent;