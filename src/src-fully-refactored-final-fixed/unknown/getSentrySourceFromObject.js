/**
 * Retrieves the Sentry source value from the provided object by checking its attributes, data, and metadata properties in order.
 *
 * @param {Object} objectWithSentrySource - The object potentially containing Sentry source information.
 * @returns {any} The value of the Sentry source if found in attributes, data, or metadata; otherwise, undefined.
 */
function getSentrySourceFromObject(objectWithSentrySource) {
  // Attempt to retrieve the Sentry source from the 'attributes' property
  const sentrySourceFromAttributes =
    objectWithSentrySource.attributes &&
    objectWithSentrySource.attributes[sC.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];

  // Attempt to retrieve the Sentry source from the 'data' property
  const sentrySourceFromData =
    objectWithSentrySource.data &&
    objectWithSentrySource.data[sC.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];

  // Attempt to retrieve the Sentry source from the 'metadata' property
  const sentrySourceFromMetadata =
    objectWithSentrySource.metadata &&
    objectWithSentrySource.metadata.source;

  // Return the first non-falsy Sentry source found
  return (
    sentrySourceFromAttributes ||
    sentrySourceFromData ||
    sentrySourceFromMetadata
  );
}

module.exports = getSentrySourceFromObject;