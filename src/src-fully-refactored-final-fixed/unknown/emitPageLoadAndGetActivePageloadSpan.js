/**
 * Emits a 'startPageLoadSpan' event on the provided event emitter and returns the active span
 * if isBlobOrFileLikeObject represents a page load operation.
 *
 * @param {Object} eventEmitter - An object with an 'emit' method, typically an event emitter.
 * @param {any} eventPayload - Payload to be passed with the 'startPageLoadSpan' event.
 * @returns {Object|undefined} The active span object if its operation is 'pageload', otherwise undefined.
 */
function emitPageLoadAndGetActivePageloadSpan(eventEmitter, eventPayload) {
  // Ensure the eventEmitter has an emit method before proceeding
  if (!eventEmitter.emit) return;

  // Emit the 'startPageLoadSpan' event with the provided payload
  eventEmitter.emit("startPageLoadSpan", eventPayload);

  // Retrieve the currently active span from the HQ module
  const activeSpan = HQ.getActiveSpan();

  // Check if the active span exists and its operation is 'pageload'
  // If so, return the span; otherwise, return undefined
  return (activeSpan && HQ.spanToJSON(activeSpan).op) === "pageload" ? activeSpan : undefined;
}

module.exports = emitPageLoadAndGetActivePageloadSpan;
