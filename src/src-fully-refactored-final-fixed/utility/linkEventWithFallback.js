/**
 * Attempts to link an event to a target output stream. If the target is unavailable, applies a fallback strategy.
 *
 * @param {any} eventData - The primary event data to be linked or returned.
 * @param {any} eventMetadata - Additional metadata associated with the event.
 * @param {Object} [options={}] - Optional configuration for linking and fallback behavior.
 * @param {string} [options.target="stdout"] - The output stream or target to link the event to (e.g., "stdout").
 * @param {Function|boolean} [options.fallback] - Fallback strategy if the target is unavailable. If false, returns eventData. If a function, calls isBlobOrFileLikeObject with (eventData, eventMetadata). Otherwise, returns a formatted string.
 * @returns {any} The result of linking the event, or the fallback result if the target is unavailable.
 */
function linkEventWithFallback(eventData, eventMetadata, {
  target: outputTarget = "stdout",
  ...additionalOptions
} = {}) {
  // Check if the desired output target exists in the JW1 registry
  if (!JW1.default[outputTarget]) {
    // If fallback is explicitly set to false, return the original event data
    if (additionalOptions.fallback === false) {
      return eventData;
    }
    // If fallback is a function, invoke isBlobOrFileLikeObject with eventData and eventMetadata
    if (typeof additionalOptions.fallback === "function") {
      return additionalOptions.fallback(eventData, eventMetadata);
    }
    // Default fallback: return a formatted string with eventData and eventMetadata
    return `${eventData} (​${eventMetadata}​)`;
  }
  // If the output target exists, link the event using wi0.link
  return wi0.link(eventData, eventMetadata);
}

module.exports = linkEventWithFallback;