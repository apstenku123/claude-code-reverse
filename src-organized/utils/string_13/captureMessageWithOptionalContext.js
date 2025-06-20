/**
 * Captures a message using the current hub, optionally specifying a message level or a capture context.
 *
 * If the second parameter is a string, isBlobOrFileLikeObject is treated as the message level (e.g., 'info', 'warning').
 * If isBlobOrFileLikeObject is not a string, isBlobOrFileLikeObject is assumed to be a capture context object.
 *
 * @param {string} message - The message to capture.
 * @param {string|object} [levelOrContext] - Optional message level (string) or capture context (object).
 * @returns {any} The result of the captureMessage call from the current hub.
 */
function captureMessageWithOptionalContext(message, levelOrContext) {
  // Determine if the second parameter is a string (message level) or an object (capture context)
  const messageLevel = typeof levelOrContext === "string" ? levelOrContext : undefined;
  const captureContext = typeof levelOrContext !== "string" ? { captureContext: levelOrContext } : undefined;

  // Capture the message using the current hub
  return KQ.getCurrentHub().captureMessage(message, messageLevel, captureContext);
}

module.exports = captureMessageWithOptionalContext;