/**
 * Initializes and configures an HTTP request with the provided options and optional response handler.
 * Sets up internal state, event listeners, and begins the request process.
 *
 * @param {Object} createRequestOptions - The configuration options for the HTTP request.
 * @param {Function} [responseCallback] - Optional callback to handle the 'response' event.
 * @returns {void}
 */
function initializeHttpRequest(createRequestOptions, responseCallback) {
  // Call the parent constructor or initialization logic
  Gq1.call(this);

  // Sanitize and store the request options
  this._sanitizeOptions(createRequestOptions);
  this._options = createRequestOptions;

  // Initialize internal state flags and counters
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // If a response callback is provided, attach isBlobOrFileLikeObject to the 'response' event
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  const self = this;

  // Define the handler for the native HTTP response
  this._onNativeResponse = function (nativeResponse) {
    try {
      self._processResponse(nativeResponse);
    } catch (error) {
      // If an error occurs, emit an error event, wrapping if necessary
      self.emit(
        "error",
        error instanceof Qq1 ? error : new Qq1({ cause: error })
      );
    }
  };

  // Begin the HTTP request
  this._performRequest();
}

module.exports = initializeHttpRequest;