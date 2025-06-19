/**
 * Retrieves the Sentry source attribute from the provided object.
 *
 * The function checks for the Sentry source in the following order:
 *   1. In the 'attributes' property (using the HQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE key)
 *   2. In the 'data' property (using the HQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE key)
 *   3. In the 'metadata' property (using the 'source' key)
 * Returns the first non-falsy value found, or undefined if none are present.
 *
 * @param {Object} eventObject - The object to extract the Sentry source attribute from. Expected to have 'attributes', 'data', and/or 'metadata' properties.
 * @returns {any} The value of the Sentry source attribute if found, otherwise undefined.
 */
function getSentrySourceAttribute(eventObject) {
  // Attempt to retrieve the Sentry source from the 'attributes' property
  const sentrySourceFromAttributes = eventObject.attributes && eventObject.attributes[HQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];

  // Attempt to retrieve the Sentry source from the 'data' property
  const sentrySourceFromData = eventObject.data && eventObject.data[HQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];

  // Attempt to retrieve the Sentry source from the 'metadata' property
  const sentrySourceFromMetadata = eventObject.metadata && eventObject.metadata.source;

  // Return the first non-falsy value found
  return sentrySourceFromAttributes || sentrySourceFromData || sentrySourceFromMetadata;
}

module.exports = getSentrySourceAttribute;
