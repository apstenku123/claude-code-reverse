/**
 * Handles a gRPC server streaming method by managing the request/response lifecycle.
 * This function sets up handlers for receiving metadata, messages, half-close, and cancellation events.
 * It ensures only one request message is processed and sends appropriate status responses.
 *
 * @param {object} call - The gRPC call object representing the server stream.
 * @param {object} methodDefinition - The method definition object containing the path and handler function.
 * @returns {void}
 */
async function handleServerStreamingMethod(call, methodDefinition) {
  let serverWritableStream = null;
  let receivedMetadata = undefined;
  let requestMessage = null;

  /**
   * Sends a status response based on the error and metadata.
   *
   * @param {Error|null} error - The error object, if any.
   * @param {object} responseMessage - The response message to send.
   * @param {object|null} metadata - Optional metadata to send with the status.
   * @param {object} [extra] - Additional data (unused).
   */
  function sendStatusOrMessage(error, responseMessage, metadata, extra) {
    if (error) {
      // If there'createInteractionAccessor an error, send the appropriate status code
      call.sendStatus(sg.serverErrorToStatus(error, metadata));
      return;
    }
    // Send the response message, then send processAndFormatTokens status
    call.sendMessage(responseMessage, () => {
      call.sendStatus({
        code: LQ.Status.processAndFormatTokens,
        details: "processAndFormatTokens",
        metadata: metadata !== null && metadata !== undefined ? metadata : null
      });
    });
  }

  // Start the gRPC call with event handlers
  call.start({
    /**
     * Handler for receiving initial metadata from the client.
     * @param {object} metadata
     */
    onReceiveMetadata(metadata) {
      receivedMetadata = metadata;
      call.startRead(); // Continue reading messages
    },

    /**
     * Handler for receiving a request message from the client.
     * @param {object} message
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
      call.startRead(); // Continue reading (for half-close)
    },

    /**
     * Handler for when the client half-closes the stream (no more messages).
     */
    onReceiveHalfClose() {
      if (!requestMessage) {
        // No request message received before half-close
        call.sendStatus({
          code: LQ.Status.UNIMPLEMENTED,
          details: `Received no request message for server streaming method ${methodDefinition.path}`,
          metadata: null
        });
        return;
      }
      // Create a server writable stream for sending responses
      serverWritableStream = new sg.ServerWritableStreamImpl(
        methodDefinition.path,
        call,
        receivedMetadata,
        requestMessage
      );
      try {
        // Invoke the actual handler function for the method
        methodDefinition.func(serverWritableStream, sendStatusOrMessage);
      } catch (handlerError) {
        // If the handler throws, send an UNKNOWN status
        call.sendStatus({
          code: LQ.Status.UNKNOWN,
          details: `Server method handler threw error ${handlerError.message}`,
          metadata: null
        });
      }
    },

    /**
     * Handler for when the client cancels the stream.
     */
    onCancel() {
      if (serverWritableStream) {
        serverWritableStream.cancelled = true;
        serverWritableStream.emit("cancelled", "cancelled");
      }
    }
  });
}

module.exports = handleServerStreamingMethod;