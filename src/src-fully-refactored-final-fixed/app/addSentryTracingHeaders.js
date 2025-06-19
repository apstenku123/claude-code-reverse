/**
 * Adds Sentry tracing headers (sentry-trace and optionally baggage) to the outgoing request headers if not already present.
 *
 * @param {Object} requestConfig - The configuration object for the outgoing request. Should contain a 'headers' property.
 * @param {string} requestUrl - The URL to which the request is being sent.
 * @param {string} sentryTraceHeader - The value to set for the 'sentry-trace' header.
 * @param {Array<string>} [baggageItems] - Optional array of baggage items to include in the 'baggage' header.
 * @returns {void}
 */
function addSentryTracingHeaders(requestConfig, requestUrl, sentryTraceHeader, baggageItems) {
  // If the sentry-trace header is already present, do nothing
  if ((requestConfig.headers || {})["sentry-trace"]) {
    return;
  }

  // If in debug mode, log the addition of the sentry-trace header
  if (iN1.DEBUG_BUILD) {
    tW.logger.log(
      `[Tracing] Adding sentry-trace header ${sentryTraceHeader} to outgoing request to "${requestUrl}": `
    );
  }

  // Add sentry-trace and optionally baggage headers to the request
  requestConfig.headers = {
    ...requestConfig.headers,
    "sentry-trace": sentryTraceHeader,
    // Only add baggage if baggageItems is provided and not empty
    ...(
      Array.isArray(baggageItems) && baggageItems.length > 0
        ? { baggage: mergeBaggageHeaders(requestConfig, baggageItems) }
        : {}
    )
  };
}

module.exports = addSentryTracingHeaders;