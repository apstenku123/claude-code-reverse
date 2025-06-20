/**
 * Removes the 'abort' event listener from the given event context and cleans up references.
 *
 * @param {Object} eventContext - The object containing event listener references.
 * @property {Object} eventContext.Hw - The event target or emitter to remove the listener from.
 * @property {Function} eventContext.Sh - The event handler function to remove.
 *
 * @returns {void}
 */
function removeAbortEventListener(eventContext) {
  // If there is no event target/emitter, exit early
  if (!eventContext.Hw) return;

  // Remove the 'abort' event listener using the appropriate method
  if ("removeEventListener" in eventContext.Hw) {
    // For DOM EventTarget
    eventContext.Hw.removeEventListener("abort", eventContext.Sh);
  } else {
    // For Node.js EventEmitter
    eventContext.Hw.removeListener("abort", eventContext.Sh);
  }

  // Clean up references to prevent memory leaks
  eventContext.Hw = null;
  eventContext.Sh = null;
}

module.exports = removeAbortEventListener;