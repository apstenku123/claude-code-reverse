/**
 * Initializes and normalizes the request body for an HTTP-like request object.
 * Handles various input types (Buffer, ArrayBuffer, URLSearchParams, Streams, etc.),
 * sets up internal state for body, size, and timeout, and attaches error handling
 * for stream bodies.
 *
 * @param {*} bodyInput - The input to be used as the request body. Can be Buffer, ArrayBuffer, string, stream, etc.
 * @param {Object} [options={}] - Optional configuration for the request.
 * @param {number} [options.size=0] - Maximum allowed size of the request body in bytes.
 * @param {number} [options.timeout=0] - Timeout for the request in milliseconds.
 * @returns {void}
 */
function initializeRequestBody(bodyInput, options = {}) {
  const self = this;
  const {
    size: maxBodySize = 0,
    timeout: requestTimeout = 0
  } = options;

  let normalizedBody = bodyInput;

  // Normalize the body input to a Buffer or appropriate type
  if (normalizedBody == null) {
    normalizedBody = null;
  } else if (isURLSearchParamsLike(normalizedBody)) {
    // Convert URLSearchParams-like objects to Buffer
    normalizedBody = Buffer.from(normalizedBody.toString());
  } else if (isStream(normalizedBody)) {
    // Leave streams as-is
  } else if (Buffer.isBuffer(normalizedBody)) {
    // Leave Buffers as-is
  } else if (Object.prototype.toString.call(normalizedBody) === "[object ArrayBuffer]") {
    // Convert ArrayBuffer to Buffer
    normalizedBody = Buffer.from(normalizedBody);
  } else if (ArrayBuffer.isView(normalizedBody)) {
    // Convert ArrayBuffer views (e.g., Uint8Array) to Buffer
    normalizedBody = Buffer.from(normalizedBody.buffer, normalizedBody.byteOffset, normalizedBody.byteLength);
  } else if (normalizedBody instanceof StreamWrapper) {
    // Leave custom stream wrapper as-is
  } else {
    // Fallback: convert anything else to string, then to Buffer
    normalizedBody = Buffer.from(String(normalizedBody));
  }

  // Set up internal state for the request body
  this[internalBodyStateSymbol] = {
    body: normalizedBody,
    disturbed: false,
    error: null
  };
  this.size = maxBodySize;
  this.timeout = requestTimeout;

  // Attach error handler if the body is a custom stream wrapper
  if (normalizedBody instanceof StreamWrapper) {
    normalizedBody.on("error", function (error) {
      // If error is an AbortError, use as-is; otherwise, wrap in a custom error
      const errorToStore = error.name === "AbortError"
        ? error
        : new FetchError(
            `Invalid response body while trying to fetch ${self.url}: ${error.message}`,
            "system",
            error
          );
      self[internalBodyStateSymbol].error = errorToStore;
    });
  }
}

module.exports = initializeRequestBody;