/**
 * Handles detection of premature stream closure for HTTP responses with chunked transfer encoding and no content-length.
 * If such a premature close is detected, invokes the provided callback with an error.
 *
 * @param {EventEmitter} requestEmitter - The HTTP request object emitting 'socket' and 'response' events.
 * @param {Function} onErrorCallback - Callback to invoke with an error if a premature close is detected.
 */
function handlePrematureChunkedResponseClose(requestEmitter, onErrorCallback) {
  let activeSocket;

  // Capture the socket associated with the request
  requestEmitter.on("socket", function (socket) {
    activeSocket = socket;
  });

  // Listen for the HTTP response event
  requestEmitter.on("response", function (response) {
    const headers = response.headers;
    // Only handle responses with chunked transfer encoding and no content-length
    if (headers["transfer-encoding"] === "chunked" && !headers["content-length"]) {
      // Listen for the 'close' event on the response
      response.once("close", function (hadError) {
        // If the socket exists, has data listeners, and the close was not due to an error
        if (activeSocket && activeSocket.listenerCount("data") > 0 && !hadError) {
          const prematureCloseError = new Error("Premature close");
          prematureCloseError.code = "ERR_STREAM_PREMATURE_CLOSE";
          onErrorCallback(prematureCloseError);
        }
      });
    }
  });
}

module.exports = handlePrematureChunkedResponseClose;