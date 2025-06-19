/**
 * Adds Sentry tracing headers ("sentry-trace" and optional "baggage") to the request if they are not already present.
 *
 * @param {object} request - The request object that supports headers and addHeader method.
 * @param {string} sentryTraceHeaderValue - The value to set for the "sentry-trace" header.
 * @param {string} [baggageHeaderValue] - Optional value to set for the "baggage" header.
 * @returns {void}
 */
function addSentryHeadersIfMissing(request, sentryTraceHeaderValue, baggageHeaderValue) {
  let hasSentryTraceHeader;

  // Check if headers are stored as an array
  if (Array.isArray(request.headers)) {
    // Look for an exact match for 'sentry-trace' in the headers array
    hasSentryTraceHeader = request.headers.some(
      header => header === "sentry-trace"
    );
  } else {
    // Otherwise, assume headers is a string and split by CRLF
    hasSentryTraceHeader = request.headers
      .split("\r\n")
      .some(headerLine => headerLine.startsWith("sentry-trace:"));
  }

  // If the 'sentry-trace' header is already present, do nothing
  if (hasSentryTraceHeader) {
    return;
  }

  // Add the 'sentry-trace' header
  request.addHeader("sentry-trace", sentryTraceHeaderValue);

  // If a baggage header value is provided, add the 'baggage' header
  if (baggageHeaderValue) {
    request.addHeader("baggage", baggageHeaderValue);
  }
}

module.exports = addSentryHeadersIfMissing;