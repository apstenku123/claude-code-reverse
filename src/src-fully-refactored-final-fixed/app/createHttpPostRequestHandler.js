/**
 * Handles the creation of an HTTP POST request handler function for a given endpoint.
 * The returned function sends POST requests with the provided body and headers, handling gzip compression if needed.
 * It also parses specific response headers for rate limiting and retry information.
 *
 * @param {Object} createRequestOptions - Options for the outgoing request (includes url, headers, caCerts, etc).
 * @param {Object} httpModule - HTTP or HTTPS module to use for making the request (e.g., require('https')).
 * @param {Object} agent - HTTP agent to use for the request (for connection pooling, etc).
 * @returns {Function} - a function that takes a request payload and returns a Promise resolving with status and headers.
 */
function createHttpPostRequestHandler(createRequestOptions, httpModule, agent) {
  // Parse the URL to extract connection details
  const {
    hostname,
    pathname,
    port,
    protocol,
    search
  } = new qGA.URL(createRequestOptions.url);

  /**
   * Sends a POST request with the given payload.
   * @param {Object} payload - The request payload, must have a 'body' property (Buffer or Stream).
   * @returns {Promise<Object>} - Resolves with statusCode and selected response headers.
   */
  return function sendPostRequest(payload) {
    return new Promise((resolve, reject) => {
      // Prepare the request body stream
      let requestBodyStream = n39(payload.body);
      // Clone headers from createRequestOptions
      const requestHeaders = {
        ...createRequestOptions.headers
      };

      // If the body is large, enable gzip compression
      if (payload.body.length > i39) {
        requestHeaders["content-encoding"] = "gzip";
        requestBodyStream = requestBodyStream.pipe(p39.createGzip());
      }

      // Configure the HTTP request
      const request = httpModule.request({
        method: "POST",
        agent: agent,
        headers: requestHeaders,
        hostname: hostname,
        path: `${pathname}${search}`,
        port: port,
        protocol: protocol,
        ca: createRequestOptions.caCerts
      }, response => {
        // Set response encoding to UTF-8
        response.setEncoding("utf8");
        // Attach empty listeners to 'data' and 'end' to ensure the stream is consumed
        response.on("data", () => {});
        response.on("end", () => {});

        // Parse retry and rate limit headers using mN1 utility
        const retryAfter = mN1(response.headers["retry-after"], () => null);
        const sentryRateLimits = mN1(response.headers["x-sentry-rate-limits"], () => null);

        // Resolve with status code and relevant headers
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
      // Pipe the request body into the HTTP request
      requestBodyStream.pipe(request);
    });
  };
}

module.exports = createHttpPostRequestHandler;