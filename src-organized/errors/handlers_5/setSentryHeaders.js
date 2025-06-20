/**
 * Sets Sentry tracing and baggage headers on an XMLHttpRequest object.
 *
 * @param {XMLHttpRequest} xhr - The XMLHttpRequest object to set headers on.
 * @param {string} sentryTraceHeader - The value for the 'sentry-trace' header.
 * @param {string} [baggageHeader] - Optional value for the Sentry baggage header.
 * @returns {void}
 *
 * This function attempts to set the 'sentry-trace' header and, if provided, the Sentry baggage header
 * on the given XMLHttpRequest object. Any errors encountered during header setting are silently ignored.
 */
function setSentryHeaders(xhr, sentryTraceHeader, baggageHeader) {
  try {
    // Set the 'sentry-trace' header for distributed tracing
    xhr.setRequestHeader("sentry-trace", sentryTraceHeader);

    // If a baggage header value is provided, set the Sentry baggage header
    if (baggageHeader) {
      // 'aC.BAGGAGE_HEADER_NAME' is assumed to be a constant for the header name
      xhr.setRequestHeader(aC.BAGGAGE_HEADER_NAME, baggageHeader);
    }
  } catch (error) {
    // Silently ignore any errors (e.g., if headers cannot be set)
  }
}

module.exports = setSentryHeaders;