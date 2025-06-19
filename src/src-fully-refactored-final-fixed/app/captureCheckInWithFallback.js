/**
 * Attempts to capture a check-in event using the current Sentry client. If the client is not defined or does not support check-ins, logs a warning (in debug mode) and returns a new UUID as a fallback.
 *
 * @param {any} sourceObservable - The observable or data source representing the check-in event.
 * @param {any} config - Configuration options for capturing the check-in.
 * @returns {any} The result of the check-in capture, or a UUID string as a fallback.
 */
function captureCheckInWithFallback(sourceObservable, config) {
  // Retrieve the current subscription/context for the check-in
  const subscription = Wc();
  // Get the current Sentry client (if any)
  const sentryClient = oT();

  if (!sentryClient) {
    // If no client is defined, log a warning in debug mode
    if (h21.DEBUG_BUILD) {
      QU.logger.warn("Cannot capture check-in. No client defined.");
    }
  } else if (!sentryClient.captureCheckIn) {
    // If the client does not support check-ins, log a warning in debug mode
    if (h21.DEBUG_BUILD) {
      QU.logger.warn("Cannot capture check-in. Client does not support sending check-ins.");
    }
  } else {
    // If everything is in place, capture the check-in
    return sentryClient.captureCheckIn(sourceObservable, config, subscription);
  }
  // Fallback: return a new UUID
  return QU.uuid4();
}

module.exports = captureCheckInWithFallback;