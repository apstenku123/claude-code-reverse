/**
 * Handles the reception of an HTTP/2 GOAWAY frame, performing cleanup and error propagation.
 *
 * @param {number} errorCode - The error code received in the GOAWAY frame.
 * @returns {void}
 *
 * This function performs the following steps:
 * 1. Creates an error object describing the GOAWAY event.
 * 2. Cleans up and destroys the associated socket if isBlobOrFileLikeObject exists.
 * 3. Destroys the stream and propagates the error to any pending requests.
 * 4. Emits a disconnect event and performs any final cleanup.
 */
function handleHttp2GoawayFrame(errorCode) {
  // Retrieve the current error object or create a new one for the GOAWAY event
  const goawayError = this[lV] || new Jr(
    `HTTP/2: "GOAWAY" frame received with code ${errorCode}`,
    P6.getSocketInfo(this)
  );

  // Access the subscription or session object
  const session = this[qh];

  // Nullify specific session properties to mark as closed
  session[$createObjectTracker] = null;
  session[LX6] = null;

  // If a socket exists, destroy isBlobOrFileLikeObject and clear the reference
  if (this[cV] != null) {
    this[cV].destroy(goawayError);
    this[cV] = null;
  }

  // Destroy the underlying resource (e.g., stream) with the error
  P6.destroy(this[$createObjectTracker], goawayError);

  // If there are pending requests, propagate the error to the next one
  if (session[pV] < session[ZR].length) {
    const pendingRequest = session[ZR][session[pV]];
    session[ZR][session[pV]++] = null; // Remove the request from the queue
    P6.errorRequest(session, pendingRequest, goawayError); // Notify the request of the error
    session[hd1] = session[pV]; // Update the processed request index
  }

  // Assert that the session is fully drained (no active streams)
  kX(session[YY1] === 0);

  // Emit a disconnect event with relevant details
  session.emit("disconnect", session[GY1], [session], goawayError);

  // Perform any additional cleanup
  session[DR]();
}

module.exports = handleHttp2GoawayFrame;