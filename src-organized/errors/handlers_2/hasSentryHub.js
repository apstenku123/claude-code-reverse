/**
 * Checks if the provided object contains a Sentry hub instance.
 *
 * This function verifies that the input object exists, has a '__SENTRY__' property,
 * and that the '__SENTRY__' property contains a 'hub' property. This is typically
 * used to determine if Sentry (an error tracking tool) has been initialized on the object.
 *
 * @param {object} possibleSentryObject - The object to check for a Sentry hub instance.
 * @returns {boolean} True if the object contains a Sentry hub, false otherwise.
 */
function hasSentryHub(possibleSentryObject) {
  // Check if the object exists, has a '__SENTRY__' property, and that property has a 'hub'
  return Boolean(
    possibleSentryObject &&
    possibleSentryObject.__SENTRY__ &&
    possibleSentryObject.__SENTRY__.hub
  );
}

module.exports = hasSentryHub;
