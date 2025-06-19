/**
 * Constructs and validates HTTP(s) request options for node-fetch, ensuring required headers and agent are set.
 * Throws errors for unsupported protocols, missing absolute URLs, or unsupported cancellation features.
 *
 * @param {Object} createRequestOptions - The options object containing request configuration.
 * @param {Object} createRequestOptions[oN].parsedURL - Parsed URL object with protocol and hostname.
 * @param {Object} createRequestOptions[oN].headers - Headers object for the request.
 * @param {string} createRequestOptions.method - HTTP method (e.g., 'GET', 'POST').
 * @param {Object} [createRequestOptions.signal] - Optional AbortSignal for cancellation.
 * @param {Object} [createRequestOptions.body] - Optional request body.
 * @param {boolean} [createRequestOptions.compress] - Whether to add Accept-Encoding for compression.
 * @param {Function|Object} [createRequestOptions.agent] - Optional HTTP agent or agent factory function.
 * @returns {Object} - An object containing the full request options for node-fetch.
 * @throws {TypeError} If the URL is not absolute or protocol is not HTTP(s).
 * @throws {Error} If cancellation of streamed requests is not supported in current Node version.
 */
function createNodeFetchRequestOptions(createRequestOptions) {
  // Extract parsed URL and headers from the request options
  const parsedURL = createRequestOptions[oN].parsedURL;
  const headers = new rX(createRequestOptions[oN].headers);

  // Ensure 'Accept' header is present
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

  // Prevent unsupported cancellation of streamed requests in old Node.js versions
  if (
    createRequestOptions.signal &&
    createRequestOptions.body instanceof JK.Readable &&
    !wt6
  ) {
    throw new Error(
      "Cancellation of streamed requests with AbortSignal is not supported in node < 8"
    );
  }

  // Determine Content-Length header value if needed
  let contentLength = null;
  if (
    createRequestOptions.body == null &&
    /^(POST|PUT)$/i.test(createRequestOptions.method)
  ) {
    // No body for POST/PUT: set Content-Length to '0'
    contentLength = "0";
  }
  if (createRequestOptions.body != null) {
    // If body is present, try to determine its length
    const computedLength = getBodyLength(createRequestOptions);
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
  if (createRequestOptions.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate");
  }

  // Resolve agent: can be a function or an object
  let agent = createRequestOptions.agent;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }

  // Return the full request options object
  return Object.assign({}, parsedURL, {
    method: createRequestOptions.method,
    headers: Xt6(headers),
    agent: agent
  });
}

module.exports = createNodeFetchRequestOptions;
