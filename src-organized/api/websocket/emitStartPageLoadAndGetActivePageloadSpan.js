/**
 * Emits a 'startPageLoadSpan' event from the provided event emitter (if available),
 * then retrieves the current active span and returns isBlobOrFileLikeObject if its operation is 'pageload'.
 *
 * @param {Object} eventEmitter - An object expected to have an 'emit' method for event emission.
 * @param {any} eventPayload - The payload to pass along with the 'startPageLoadSpan' event.
 * @returns {Object|undefined} The active span object if its operation is 'pageload', otherwise undefined.
 */
function emitStartPageLoadAndGetActivePageloadSpan(eventEmitter, eventPayload) {
  // Ensure the eventEmitter has an 'emit' method before proceeding
  if (!eventEmitter.emit) return;

  // Emit the 'startPageLoadSpan' event with the provided payload
  eventEmitter.emit("startPageLoadSpan", eventPayload);

  // Retrieve the currently active span from the HQ module
  const activeSpan = HQ.getActiveSpan();

  // Check if the active span exists and its operation is 'pageload'
  // If so, return the active span; otherwise, return undefined
  return (activeSpan && HQ.spanToJSON(activeSpan).op) === "pageload" ? activeSpan : undefined;
}

module.exports = emitStartPageLoadAndGetActivePageloadSpan;
