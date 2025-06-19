/**
 * Checks if the provided event object is a valid Sentry event by verifying its type and target properties.
 *
 * @param {Object} event - The event object to validate.
 * @returns {boolean} True if the event is a Sentry event with the expected type and target updateSnapshotAndNotify, otherwise false.
 */
function isValidSentryEvent(event) {
  // Check if the event type matches the expected Sentry event type
  if (event.type !== kE1) {
    return false;
  }
  try {
    // Ensure the event has a target and its _sentryId matches the expected value
    if (!event.target || event.target._sentryId !== yE1) {
      return false;
    }
  } catch (error) {
    // Ignore errors accessing event.target
  }
  return true;
}

module.exports = isValidSentryEvent;