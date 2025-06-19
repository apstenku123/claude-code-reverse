/**
 * Handles a server streaming gRPC request, managing message receipt, metadata, and cancellation.
 *
 * @param {object} call - The gRPC call object representing the client connection and stream.
 * @param {object} methodDefinition - The method definition/configuration, including the path and handler function.
 * @returns {Promise<void>} Resolves when the request has been fully handled.
 */
async function handleServerStreamingRequest(call, methodDefinition) {
  let serverWritableStream = null; // Will hold the server'createInteractionAccessor writable stream implementation
  let receivedMetadata = undefined; // Stores received metadata from the client
  let requestMessage = null; // Stores the single request message from the client

  /**
   * Sends a status to the client based on the error and metadata, or sends a successful response.
   * @param {Error|null} error - The error, if any, that occurred during processing.
   * @param {object} responseMessage - The response message to send to the client.
   * @param {object|null} responseMetadata - Metadata to send with the response.
   * @param {object} [unused] - Unused parameter for compatibility.
   */
  function sendResponseOrError(error, responseMessage, responseMetadata, unused) {
    if (error) {
      // Send an error status to the client
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

  // Start handling the gRPC call
  call.start({
    /**
     * Handles receipt of initial metadata from the client.
     * @param {object} metadata - The metadata sent by the client.
     */
    onReceiveMetadata(metadata) {
      receivedMetadata = metadata;
      call.startRead(); // Begin reading messages from the client
    },

    /**
     * Handles receipt of a message from the client.
     * @param {object} message - The request message sent by the client.
     */
    onReceiveMessage(message) {
      if (requestMessage) {
        // Only one request message is allowed for server streaming methods
        call.sendStatus({
          code: LQ.Status.UNIMPLEMENTED,
          details: `Received a second request message for server streaming method ${methodDefinition.path}`,
          metadata: null
        });
        return;
      }
      requestMessage = message;
      call.startRead(); // Continue reading (in case of more messages, which is an error)
    },

    /**
     * Handles the half-close event, indicating the client has finished sending messages.
     */
    onReceiveHalfClose() {
      if (!requestMessage) {
        // No request message was received; this is an error
        call.sendStatus({
          code: LQ.Status.UNIMPLEMENTED,
          details: `Received no request message for server streaming method ${methodDefinition.path}`,
          metadata: null
        });
        return;
      }
      // Create the server'createInteractionAccessor writable stream implementation
      serverWritableStream = new sg.ServerWritableStreamImpl(
        methodDefinition.path,
        call,
        receivedMetadata,
        requestMessage
      );
      try {
        // Invoke the user-defined handler for the method
        methodDefinition.func(serverWritableStream, sendResponseOrError);
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
     * Handles client cancellation of the request.
     */
    onCancel() {
      if (serverWritableStream) {
        serverWritableStream.cancelled = true;
        serverWritableStream.emit("cancelled", "cancelled");
      }
    }
  });
}

module.exports = handleServerStreamingRequest;