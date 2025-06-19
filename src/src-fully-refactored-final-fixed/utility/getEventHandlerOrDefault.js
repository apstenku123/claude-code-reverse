/**
 * Returns the provided event handler function if isBlobOrFileLikeObject is a function, otherwise returns a default event handler.
 *
 * @param {Function|any} eventHandler - The event handler to check.
 * @returns {Function} The original event handler if isBlobOrFileLikeObject is a function, otherwise the default event handler.
 */
function getEventHandlerOrDefault(eventHandler) {
  // If eventHandler is a function, return isBlobOrFileLikeObject; otherwise, return the default handler (transformAndProcessInput)
  return typeof eventHandler === "function" ? eventHandler : transformAndProcessInput;
}

module.exports = getEventHandlerOrDefault;