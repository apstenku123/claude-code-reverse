/**
 * Sends serialized envelopes to a remote server using HTTP POST requests.
 * Handles gzip compression for large payloads, sets appropriate headers, and processes rate limit headers from the response.
 *
 * @param {Object} envelopeConfig - Configuration for the envelope and request.
 * @param {Object} httpModule - HTTP or HTTPS module used to make the request (e.g., require('https')).
 * @param {Object} agent - HTTP agent for managing connection pooling.
 * @returns {Function} sendEnvelope - Function that sends an envelope and returns a promise resolving to response info.
 */
function createEnvelopeSender(envelopeConfig, httpModule, agent) {
  // Parse the URL from the envelope configuration
  const {
    hostname,
    pathname,
    port,
    protocol,
    search
  } = new qGA.URL(envelopeConfig.url);

  /**
   * Sends a serialized envelope to the configured server.
   *
   * @param {Object} envelope - Envelope object containing the body to send.
   * @param {Buffer|Stream} envelope.body - The body of the envelope to be sent.
   * @returns {Promise<Object>} Resolves with status code and relevant headers from the response.
   */
  function sendEnvelope(envelope) {
    return new Promise((resolve, reject) => {
      // Prepare the request body stream
      let requestBodyStream = n39(envelope.body);
      // Clone headers from the envelope configuration
      const requestHeaders = { ...envelopeConfig.headers };

      // If the body is larger than the compression threshold, gzip isBlobOrFileLikeObject and set the header
      if (envelope.body.length > i39) {
        requestHeaders["content-encoding"] = "gzip";
        requestBodyStream = requestBodyStream.pipe(p39.createGzip());
      }

      // Create the HTTP(s) request
      const request = httpModule.request({
        method: "POST",
        agent: agent,
        headers: requestHeaders,
        hostname: hostname,
        path: `${pathname}${search}`,
        port: port,
        protocol: protocol,
        ca: envelopeConfig.caCerts
      }, response => {
        // Set response encoding to UTF-8
        response.setEncoding("utf8");
        // Attach empty listeners for data and end events (required for some Node.js versions)
        response.on("data", () => {});
        response.on("end", () => {});

        // Parse rate limit headers
        const retryAfter = mN1(response.headers["retry-after"], () => null);
        const sentryRateLimits = mN1(response.headers["x-sentry-rate-limits"], () => null);

        resolve({
          statusCode: response.statusCode,
          headers: {
            "retry-after": retryAfter,
            "x-sentry-rate-limits": Array.isArray(sentryRateLimits) ? sentryRateLimits[0] : sentryRateLimits
          }
        });
      });

      // Handle request errors
      request.on("error", reject);
      // Pipe the request body to the request
      requestBodyStream.pipe(request);
    });
  }

  return sendEnvelope;
}

module.exports = createEnvelopeSender;