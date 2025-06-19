/**
 * Handles linking of event data to a target output stream or provides a fallback if the target is unavailable.
 *
 * @param {any} eventData - The primary event data to be linked or returned as fallback.
 * @param {any} linkContext - Context or metadata associated with the event data for linking.
 * @param {Object} [options={}] - Additional options for linking behavior.
 * @param {string} [options.target="stdout"] - The name of the output stream to link to (e.g., "stdout").
 * @param {Function|boolean} [options.fallback] - Fallback function or flag if the target is unavailable.
 * @returns {any} The result of the linking operation, or a fallback value if linking is not possible.
 */
function handleEventLinking(eventData, linkContext, {
  target: outputTarget = "stdout",
  ...additionalOptions
} = {}) {
  // Check if the specified output target exists in JW1.default
  if (!JW1.default[outputTarget]) {
    // If fallback is explicitly set to false, return the original event data
    if (additionalOptions.fallback === false) return eventData;
    // If fallback is a function, call isBlobOrFileLikeObject with eventData and linkContext
    if (typeof additionalOptions.fallback === "function") {
      return additionalOptions.fallback(eventData, linkContext);
    }
    // Otherwise, return a default fallback string representation
    return `${eventData} (​${linkContext}​)`;
  }
  // If the output target exists, link the event data using wi0.link
  return wi0.link(eventData, linkContext);
}

module.exports = handleEventLinking;
