/**
 * Retrieves the current scope'createInteractionAccessor span and returns an object containing the sentry-trace header if available.
 *
 * @returns {Object} An object with the 'sentry-trace' header if a span exists, otherwise an empty object.
 */
function getSentryTraceHeader() {
  // Retrieve the current scope'createInteractionAccessor span
  const currentSpan = this.getScope().getSpan();

  // If a span exists, return an object with the sentry-trace header
  if (currentSpan) {
    return {
      "sentry-trace": Ve2.spanToTraceHeader(currentSpan)
    };
  }

  // If no span exists, return an empty object
  return {};
}

module.exports = getSentryTraceHeader;