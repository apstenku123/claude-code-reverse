/**
 * Adds the 'sentry-trace' header (and optionally 'baggage') to an outgoing HTTP request if not already present.
 *
 * @param {Object} requestConfig - The HTTP request configuration object. Should contain a 'headers' property.
 * @param {string} requestUrl - The URL the request is being sent to (used for logging).
 * @param {string} sentryTraceHeader - The value to set for the 'sentry-trace' header.
 * @param {Array<string>} [baggageItems] - Optional array of baggage items to include in the 'baggage' header.
 * @returns {void}
 */
function addSentryTraceHeaderToRequest(requestConfig, requestUrl, sentryTraceHeader, baggageItems) {
  // If the request already has a 'sentry-trace' header, do nothing
  if ((requestConfig.headers || {})["sentry-trace"]) {
    return;
  }

  // If in debug mode, log the addition of the sentry-trace header
  if (iN1.DEBUG_BUILD) {
    tW.logger.log(
      `[Tracing] Adding sentry-trace header ${sentryTraceHeader} to outgoing request to "${requestUrl}": `
    );
  }

  // Build the new headers object, preserving existing headers
  requestConfig.headers = {
    ...requestConfig.headers,
    "sentry-trace": sentryTraceHeader,
    // If baggageItems is provided and not empty, add the 'baggage' header
    ...(baggageItems && baggageItems.length > 0 && {
      baggage: mergeBaggageHeaders(requestConfig, baggageItems)
    })
  };
}

module.exports = addSentryTraceHeaderToRequest;