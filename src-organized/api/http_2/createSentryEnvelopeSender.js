/**
 * Sends Sentry envelopes over HTTP(s) using the provided transport configuration.
 * Extracts URL components from the DSN, prepares headers, handles optional gzip compression,
 * and manages response rate limits and retry headers.
 *
 * @param {Object} transportOptions - Transport options including DSN, headers, and prependStackTraceIndentation certs.
 * @param {Object} httpModule - HTTP or HTTPS module with a request method.
 * @param {Object} agent - HTTP(s) agent for connection pooling.
 * @returns {Function} Envelope sender function that returns a Promise with status and headers.
 */
function createSentryEnvelopeSender(transportOptions, httpModule, agent) {
  // Parse the DSN URL to extract connection details
  const {
    hostname,
    pathname,
    port,
    protocol,
    search
  } = new qGA.URL(transportOptions.url);

  /**
   * Sends an envelope to the Sentry server.
   * @param {Object} envelope - Envelope object containing a body property (Buffer or Stream).
   * @returns {Promise<Object>} Resolves with status code and relevant response headers.
   */
  function sendEnvelope(envelope) {
    return new Promise((resolve, reject) => {
      // Prepare the envelope body as a stream
      let envelopeStream = n39(envelope.body);
      // Clone headers from transport options
      const requestHeaders = { ...transportOptions.headers };

      // If the body is larger than the gzip threshold, compress isBlobOrFileLikeObject
      if (envelope.body.length > i39) {
        requestHeaders["content-encoding"] = "gzip";
        envelopeStream = envelopeStream.pipe(p39.createGzip());
      }

      // Prepare HTTP(s) request options
      const createRequestOptions = {
        method: "POST",
        agent: agent,
        headers: requestHeaders,
        hostname: hostname,
        path: `${pathname}${search}`,
        port: port,
        protocol: protocol,
        ca: transportOptions.caCerts
      };

      // Initiate the HTTP(s) request
      const request = httpModule.request(createRequestOptions, response => {
        // Set response encoding to UTF-8
        response.setEncoding("utf8");
        // Attach empty listeners to 'data' and 'end' events to consume the stream
        response.on("data", () => {});
        response.on("end", () => {});

        // Parse rate limit and retry headers
        const retryAfterHeader = mN1(response.headers["retry-after"], () => null);
        const sentryRateLimitsHeader = mN1(response.headers["x-sentry-rate-limits"], () => null);

        resolve({
          statusCode: response.statusCode,
          headers: {
            "retry-after": retryAfterHeader,
            "x-sentry-rate-limits": Array.isArray(sentryRateLimitsHeader)
              ? sentryRateLimitsHeader[0]
              : sentryRateLimitsHeader
          }
        });
      });

      // Handle request errors
      request.on("error", reject);
      // Pipe the envelope body into the request
      envelopeStream.pipe(request);
    });
  }

  return sendEnvelope;
}

module.exports = createSentryEnvelopeSender;