/**
 * Handles detection of premature stream closure on HTTP responses with chunked transfer encoding and no content-length.
 * If such a premature close is detected, invokes the provided error callback.
 *
 * @param {EventEmitter} requestEmitter - The HTTP request object emitting 'socket' and 'response' events.
 * @param {Function} onPrematureClose - Callback to invoke with an error if a premature close is detected.
 */
function handlePrematureStreamClose(requestEmitter, onPrematureClose) {
  let activeSocket;

  // Store the socket when isBlobOrFileLikeObject becomes available
  requestEmitter.on("socket", function (socket) {
    activeSocket = socket;
  });

  // Listen for the response event
  requestEmitter.on("response", function (response) {
    const headers = response.headers;
    // Only attach the close listener if transfer-encoding is chunked and content-length is missing
    if (headers["transfer-encoding"] === "chunked" && !headers["content-length"]) {
      response.once("close", function (hadError) {
        // If the socket exists, has 'data' listeners, and the close was not due to an error
        if (activeSocket && activeSocket.listenerCount("data") > 0 && !hadError) {
          const error = new Error("Premature close");
          error.code = "ERR_STREAM_PREMATURE_CLOSE";
          onPrematureClose(error);
        }
      });
    }
  });
}

module.exports = handlePrematureStreamClose;