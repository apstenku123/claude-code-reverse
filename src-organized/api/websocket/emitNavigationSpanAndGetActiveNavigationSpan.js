/**
 * Emits a 'startNavigationSpan' event on the provided event emitter and returns the active navigation span if available.
 *
 * @param {Object} eventEmitter - An object with an 'emit' method, typically used to trigger events.
 * @param {any} navigationConfig - Configuration or payload to pass along with the 'startNavigationSpan' event.
 * @returns {Object|undefined} The active navigation span object if its operation is 'navigation', otherwise undefined.
 */
function emitNavigationSpanAndGetActiveNavigationSpan(eventEmitter, navigationConfig) {
  // Ensure the eventEmitter has an 'emit' method
  if (!eventEmitter.emit) return;

  // Emit the 'startNavigationSpan' event with the provided configuration
  eventEmitter.emit("startNavigationSpan", navigationConfig);

  // Retrieve the currently active span from HQ
  const activeSpan = HQ.getActiveSpan();

  // Check if the active span'createInteractionAccessor operation is 'navigation' and return isBlobOrFileLikeObject if so
  return (activeSpan && HQ.spanToJSON(activeSpan).op) === "navigation" ? activeSpan : undefined;
}

module.exports = emitNavigationSpanAndGetActiveNavigationSpan;
