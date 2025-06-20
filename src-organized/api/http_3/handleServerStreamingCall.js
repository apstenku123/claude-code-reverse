/**
 * Handles a server streaming gRPC call by managing the request/response lifecycle.
 * This function sets up event handlers for metadata, messages, half-close, and cancellation,
 * and invokes the provided server method implementation with a writable stream.
 *
 * @param {object} call - The gRPC call object, providing methods to send messages and statuses.
 * @param {object} methodConfig - Configuration for the gRPC method, including the path and handler function.
 * @returns {Promise<void>} Resolves when the call handling is complete.
 */
async function handleServerStreamingCall(call, methodConfig) {
  let serverWritableStream = null;
  let receivedMetadata = undefined;
  let requestMessage = null;

  /**
   * Sends a response message and status to the client, or an error status if one occurred.
   * @param {Error|null} error - Error object if an error occurred, otherwise null.
   * @param {object} responseMessage - The response message to send to the client.
   * @param {object|null} responseMetadata - Optional metadata to send with the status.
   * @param {object} [unused] - Unused parameter (for compatibility).
   */
  function sendResponseOrError(error, responseMessage, responseMetadata, unused) {
    if (error) {
      // Send error status if an error occurred
      call.sendStatus(sg.serverErrorToStatus(error, responseMetadata));
      return;
    }
    // Send the response message, then send an processAndFormatTokens status
    call.sendMessage(responseMessage, () => {
      call.sendStatus({
        code: LQ.Status.processAndFormatTokens,
        details: "processAndFormatTokens",
        metadata: responseMetadata !== null && responseMetadata !== undefined ? responseMetadata : null
      });
    });
  }

  // Start handling the call and set up event handlers
  call.start({
    /**
     * Handles receipt of initial metadata from the client.
     * @param {object} metadata - Metadata sent by the client.
     */
    onReceiveMetadata(metadata) {
      receivedMetadata = metadata;
      call.startRead(); // Continue reading messages
    },

    /**
     * Handles receipt of a request message from the client.
     * @param {object} message - The request message sent by the client.
     */
    onReceiveMessage(message) {
      if (requestMessage) {
        // Only one request message is allowed for server streaming methods
        call.sendStatus({
          code: LQ.Status.UNIMPLEMENTED,
          details: `Received a second request message for server streaming method ${methodConfig.path}`,
          metadata: null
        });
        return;
      }
      requestMessage = message;
      call.startRead(); // Continue reading (though only one message is expected)
    },

    /**
     * Handles the half-close event (client finished sending messages).
     */
    onReceiveHalfClose() {
      if (!requestMessage) {
        // No request message was received
        call.sendStatus({
          code: LQ.Status.UNIMPLEMENTED,
          details: `Received no request message for server streaming method ${methodConfig.path}`,
          metadata: null
        });
        return;
      }
      // Create a writable stream for the server to send responses
      serverWritableStream = new sg.ServerWritableStreamImpl(
        methodConfig.path,
        call,
        receivedMetadata,
        requestMessage
      );
      try {
        // Invoke the user-defined server method implementation
        methodConfig.func(serverWritableStream, sendResponseOrError);
      } catch (handlerError) {
        // If the handler throws, send an UNKNOWN error status
        call.sendStatus({
          code: LQ.Status.UNKNOWN,
          details: `Server method handler threw error ${handlerError.message}`,
          metadata: null
        });
      }
    },

    /**
     * Handles cancellation of the call by the client.
     */
    onCancel() {
      if (serverWritableStream) {
        serverWritableStream.cancelled = true;
        serverWritableStream.emit("cancelled", "cancelled");
      }
    }
  });
}

module.exports = handleServerStreamingCall;