/**
 * Handles server-side streaming RPC cancellation and message flow for a gRPC-like server implementation.
 * Manages the lifecycle of a streaming call, including receiving metadata, messages, half-close, and cancellation events.
 *
 * @param {object} callStream - The server call stream object, responsible for sending/receiving messages and status.
 * @param {object} methodDefinition - The method definition/configuration, including the handler function and path.
 * @returns {Promise<void>} Resolves when the streaming call handling is complete.
 */
async function handleServerStreamingCancellation(callStream, methodDefinition) {
  let serverWritableStream = null; // Will hold the streaming implementation instance
  let receivedMetadata = undefined; // Stores received metadata
  let requestMessage = null; // Stores the single request message (for unary request)

  /**
   * Sends a status to the client based on the presence of an error.
   * If error is present, sends an error status. Otherwise, sends the response message and processAndFormatTokens status.
   *
   * @param {Error|null} error - The error object, if any.
   * @param {object} responseMessage - The response message to send to the client.
   * @param {object|null} responseMetadata - Optional metadata to send with the status.
   * @param {object} [callContext] - Additional call context (unused here).
   */
  function sendResponseOrError(error, responseMessage, responseMetadata, callContext) {
    if (error) {
      // Send error status to client
      callStream.sendStatus(sg.serverErrorToStatus(error, responseMetadata));
      return;
    }
    // Send the response message, then send processAndFormatTokens status
    callStream.sendMessage(responseMessage, () => {
      callStream.sendStatus({
        code: LQ.Status.processAndFormatTokens,
        details: "processAndFormatTokens",
        metadata: responseMetadata !== null && responseMetadata !== undefined ? responseMetadata : null
      });
    });
  }

  // Start handling the streaming call
  callStream.start({
    /**
     * Handles receipt of initial metadata from the client.
     * @param {object} metadata - The received metadata.
     */
    onReceiveMetadata(metadata) {
      receivedMetadata = metadata;
      callStream.startRead(); // Continue reading messages
    },

    /**
     * Handles receipt of a request message from the client.
     * Only a single request message is allowed for server streaming methods.
     * @param {object} message - The received request message.
     */
    onReceiveMessage(message) {
      if (requestMessage) {
        // If a second message is received, send UNIMPLEMENTED error
        callStream.sendStatus({
          code: LQ.Status.UNIMPLEMENTED,
          details: `Received a second request message for server streaming method ${methodDefinition.path}`,
          metadata: null
        });
        return;
      }
      requestMessage = message;
      callStream.startRead(); // Continue reading (though only one message is expected)
    },

    /**
     * Handles the half-close event from the client, indicating no more messages will be sent.
     * Invokes the server streaming handler function.
     */
    onReceiveHalfClose() {
      if (!requestMessage) {
        // If no request message was received, send UNIMPLEMENTED error
        callStream.sendStatus({
          code: LQ.Status.UNIMPLEMENTED,
          details: `Received no request message for server streaming method ${methodDefinition.path}`,
          metadata: null
        });
        return;
      }
      // Create the server writable stream implementation
      serverWritableStream = new sg.ServerWritableStreamImpl(
        methodDefinition.path,
        callStream,
        receivedMetadata,
        requestMessage
      );
      try {
        // Invoke the user-defined handler for the streaming method
        methodDefinition.func(serverWritableStream, sendResponseOrError);
      } catch (handlerError) {
        // If the handler throws, send UNKNOWN error status
        callStream.sendStatus({
          code: LQ.Status.UNKNOWN,
          details: `Server method handler threw error ${handlerError.message}`,
          metadata: null
        });
      }
    },

    /**
     * Handles cancellation from the client.
     * Marks the server stream as cancelled and emits a cancellation event.
     */
    onCancel() {
      if (serverWritableStream) {
        serverWritableStream.cancelled = true;
        serverWritableStream.emit("cancelled", "cancelled");
      }
    }
  });
}

module.exports = handleServerStreamingCancellation;