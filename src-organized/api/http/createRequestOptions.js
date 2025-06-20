/**
 * Constructs and validates HTTP(s) request options from the given request configuration.
 * Ensures required headers are set, validates the URL and protocol, and handles agent and body logic.
 *
 * @param {Object} requestConfig - The request configuration object, expected to have parsedURL, headers, method, body, signal, agent, and compress properties.
 * @returns {Object} The finalized request options object, ready to be used for an HTTP(s) request.
 * @throws {TypeError} If the URL is not absolute or protocol is not HTTP(s).
 * @throws {Error} If cancellation of streamed requests is attempted in unsupported Node.js versions.
 */
function createRequestOptions(requestConfig) {
  // Extract the parsed URL and headers from the request configuration
  const parsedURL = requestConfig[oN].parsedURL;
  const headers = new rX(requestConfig[oN].headers);

  // Ensure the Accept header is set
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }

  // Validate that the URL is absolute and uses HTTP(s)
  if (!parsedURL.protocol || !parsedURL.hostname) {
    throw new TypeError("Only absolute URLs are supported");
  }
  if (!/^https?:$/.test(parsedURL.protocol)) {
    throw new TypeError("Only HTTP(s) protocols are supported");
  }

  // Disallow cancellation of streamed requests with AbortSignal in unsupported Node.js versions
  if (
    requestConfig.signal &&
    requestConfig.body instanceof JK.Readable &&
    !wt6
  ) {
    throw new Error(
      "Cancellation of streamed requests with AbortSignal is not supported in node < 8"
    );
  }

  // Determine Content-Length header value if needed
  let contentLength = null;
  if (
    requestConfig.body == null &&
    /^(POST|PUT)$/i.test(requestConfig.method)
  ) {
    contentLength = "0";
  }
  if (requestConfig.body != null) {
    const computedLength = getBodyLength(requestConfig);
    if (typeof computedLength === "number") {
      contentLength = String(computedLength);
    }
  }
  if (contentLength) {
    headers.set("Content-Length", contentLength);
  }

  // Set default User-Agent if not present
  if (!headers.has("User-Agent")) {
    headers.set(
      "User-Agent",
      "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"
    );
  }

  // Set Accept-Encoding if compression is enabled and not already set
  if (requestConfig.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate");
  }

  // Handle agent: if isBlobOrFileLikeObject'createInteractionAccessor a function, call isBlobOrFileLikeObject with the parsed URL
  let agent = requestConfig.agent;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }

  // Return the merged request options object
  return Object.assign({}, parsedURL, {
    method: requestConfig.method,
    headers: Xt6(headers),
    agent: agent
  });
}

module.exports = createRequestOptions;
