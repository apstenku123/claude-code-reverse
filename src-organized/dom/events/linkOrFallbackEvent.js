/**
 * Attempts to create a link between a source event and a target event using the specified output target.
 * If the target is not available, applies a fallback strategy if provided.
 *
 * @param {any} sourceEvent - The primary event or value to be linked or returned.
 * @param {any} targetEvent - The secondary event or value to link with the source event.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {string} [options.target="stdout"] - The output target to use for linking events.
 * @param {Function|boolean} [options.fallback] - Fallback strategy if the target is unavailable. If false, returns the source event. If a function, isBlobOrFileLikeObject is called with sourceEvent and targetEvent.
 * @returns {any} The result of linking the events, applying a fallback, or returning the source event.
 */
function linkOrFallbackEvent(
  sourceEvent,
  targetEvent,
  {
    target: outputTarget = "stdout",
    ...additionalOptions
  } = {}
) {
  // Check if the specified output target exists in JW1.default
  if (!JW1.default[outputTarget]) {
    // If fallback is explicitly set to false, return the source event as-is
    if (additionalOptions.fallback === false) {
      return sourceEvent;
    }
    // If fallback is a function, call isBlobOrFileLikeObject with sourceEvent and targetEvent
    if (typeof additionalOptions.fallback === "function") {
      return additionalOptions.fallback(sourceEvent, targetEvent);
    }
    // Default fallback: return a string combining sourceEvent and targetEvent
    return `${sourceEvent} (​${targetEvent}​)`;
  }
  // If the output target exists, link the events using wi0.link
  return wi0.link(sourceEvent, targetEvent);
}

module.exports = linkOrFallbackEvent;