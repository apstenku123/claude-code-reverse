/**
 * Adds Sentry tracing headers to a request if they are not already present.
 *
 * @param {Object} request - The request object to which headers may be added. Must have a 'headers' property (array or string) and an 'addHeader' method.
 * @param {string} sentryTraceValue - The value to set for the 'sentry-trace' header.
 * @param {string} [baggageValue] - Optional value to set for the 'baggage' header.
 * @returns {void}
 */
function addSentryHeadersIfAbsent(request, sentryTraceValue, baggageValue) {
  let hasSentryTraceHeader;

  // Check if the 'sentry-trace' header is already present
  if (Array.isArray(request.headers)) {
    // If headers are an array, check for exact match
    hasSentryTraceHeader = request.headers.some(
      header => header === "sentry-trace"
    );
  } else {
    // If headers are a string, split by CRLF and check for header name
    hasSentryTraceHeader = request.headers
      .split("\r\n")
      .some(headerLine => headerLine.startsWith("sentry-trace:"));
  }

  // If the 'sentry-trace' header is already present, do nothing
  if (hasSentryTraceHeader) {
    return;
  }

  // Add the 'sentry-trace' header
  request.addHeader("sentry-trace", sentryTraceValue);

  // Optionally add the 'baggage' header if a value is provided
  if (baggageValue) {
    request.addHeader("baggage", baggageValue);
  }
}

module.exports = addSentryHeadersIfAbsent;