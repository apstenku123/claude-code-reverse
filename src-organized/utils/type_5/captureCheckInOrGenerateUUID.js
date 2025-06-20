/**
 * Attempts to capture a check-in event using the current client. If the client is not defined or does not support check-ins, logs a warning (in debug mode) and returns a new UUID.
 *
 * @param {any} checkInData - The data related to the check-in event to be captured.
 * @param {any} checkInConfig - Configuration options for the check-in event.
 * @returns {string|any} Returns the result of the client'createInteractionAccessor captureCheckIn method if available, otherwise a new UUID string.
 */
function captureCheckInOrGenerateUuid(checkInData, checkInConfig) {
  // Retrieve the current subscription/context for the check-in
  const subscription = Wc();
  // Get the current client instance
  const client = oT();

  if (!client) {
    // If no client is defined, log a warning in debug mode
    if (h21.DEBUG_BUILD) {
      QU.logger.warn("Cannot capture check-in. No client defined.");
    }
  } else if (!client.captureCheckIn) {
    // If the client does not support check-ins, log a warning in debug mode
    if (h21.DEBUG_BUILD) {
      QU.logger.warn("Cannot capture check-in. Client does not support sending check-ins.");
    }
  } else {
    // If the client supports check-ins, capture the check-in event
    return client.captureCheckIn(checkInData, checkInConfig, subscription);
  }
  // Fallback: return a new UUID if check-in could not be captured
  return QU.uuid4();
}

module.exports = captureCheckInOrGenerateUuid;