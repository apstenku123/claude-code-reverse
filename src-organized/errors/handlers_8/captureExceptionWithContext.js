/**
 * Captures an exception using the current error tracking hub, optionally providing additional context or event hints.
 *
 * @param {Error} exception - The exception object to be captured.
 * @param {object} [eventHintOrContext] - Optional event hint or capture context to provide additional information about the exception.
 * @returns {any} The result of the captureException call from the error tracking hub.
 */
function captureExceptionWithContext(exception, eventHintOrContext) {
  // Retrieve the current error tracking hub instance
  const currentHub = KQ.getCurrentHub();

  // Parse the event hint or capture context using the provided utility
  const parsedContext = Qr2.parseEventHintOrCaptureContext(eventHintOrContext);

  // Capture the exception with the parsed context
  return currentHub.captureException(exception, parsedContext);
}

module.exports = captureExceptionWithContext;