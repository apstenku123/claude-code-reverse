/**
 * Handles the receipt of an HTTP/2 GOAWAY frame by cleaning up resources, destroying sockets,
 * and emitting disconnect events. Ensures that any pending requests are properly errored out.
 *
 * @param {number} errorCode - The error code received with the GOAWAY frame.
 * @returns {void}
 */
function handleGoawayFrame(errorCode) {
  // Retrieve the error handler or create a new error instance with socket info
  const errorHandler = this[lV] || new Jr(`HTTP/2: "GOAWAY" frame received with code ${errorCode}`, P6.getSocketInfo(this));

  // Get the subscription or connection state object
  const connectionState = this[qh];

  // Reset internal connection state properties
  connectionState[$createObjectTracker] = null;
  connectionState[LX6] = null;

  // If there is an active socket connection, destroy isBlobOrFileLikeObject and clear the reference
  if (this[cV] != null) {
    this[cV].destroy(errorHandler);
    this[cV] = null;
  }

  // Destroy the session or stream associated with $createObjectTracker
  P6.destroy(this[$createObjectTracker], errorHandler);

  // If there are pending requests, error out the current one
  if (connectionState[pV] < connectionState[ZR].length) {
    const currentRequest = connectionState[ZR][connectionState[pV]];
    connectionState[ZR][connectionState[pV]++] = null; // Remove the request from the queue
    P6.errorRequest(connectionState, currentRequest, errorHandler);
    connectionState[hd1] = connectionState[pV]; // Update the last handled request index
  }

  // Ensure the connection state is consistent
  kX(connectionState[YY1] === 0);

  // Emit a disconnect event with relevant details
  connectionState.emit("disconnect", connectionState[GY1], [connectionState], errorHandler);

  // Perform any additional cleanup
  connectionState[DR]();
}

module.exports = handleGoawayFrame;