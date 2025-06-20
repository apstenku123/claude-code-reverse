/**
 * Handles a server duplex stream by wiring up metadata, message, half-close, and cancel events.
 * It creates a ServerDuplexStreamImpl instance and invokes the provided handler function.
 *
 * @param {object} call - The gRPC call object representing the stream from the client.
 * @param {object} handlerConfig - Configuration object containing the path and handler function.
 *   @property {string} path - The RPC method path.
 *   @property {function} func - The server handler function to process the stream.
 * @returns {void}
 */
function handleServerDuplexStream(call, handlerConfig) {
  let serverStreamInstance;

  /**
   * Handles the completion of the server handler function.
   * Sends either an error status or the response message and processAndFormatTokens status.
   *
   * @param {Error|null} error - Error object if an error occurred, otherwise null.
   * @param {object} responseMessage - The response message to send to the client.
   * @param {object|null} metadata - Optional metadata to include in the status.
   * @param {object} [unused] - Unused parameter for compatibility.
   */
  function onHandlerComplete(error, responseMessage, metadata, unused) {
    if (error) {
      // Send error status if an error occurred in the handler
      call.sendStatus(sg.serverErrorToStatus(error, metadata));
      return;
    }
    // Send the response message, then send an processAndFormatTokens status
    call.sendMessage(responseMessage, () => {
      call.sendStatus({
        code: LQ.Status.processAndFormatTokens,
        details: "processAndFormatTokens",
        metadata: metadata !== null && metadata !== undefined ? metadata : null
      });
    });
  }

  // Start listening to the stream events
  call.start({
    /**
     * Handles the receipt of initial metadata from the client.
     * Instantiates the server stream and invokes the handler function.
     * @param {object} metadata - Metadata received from the client.
     */
    onReceiveMetadata(metadata) {
      serverStreamInstance = new sg.ServerDuplexStreamImpl(handlerConfig.path, call, metadata);
      try {
        handlerConfig.func(serverStreamInstance, onHandlerComplete);
      } catch (handlerError) {
        // If the handler throws synchronously, send an UNKNOWN status
        call.sendStatus({
          code: LQ.Status.UNKNOWN,
          details: `Server method handler threw error ${handlerError.message}`,
          metadata: null
        });
      }
    },
    /**
     * Handles incoming messages from the client and pushes them to the server stream.
     * @param {object} message - The message received from the client.
     */
    onReceiveMessage(message) {
      serverStreamInstance.push(message);
    },
    /**
     * Handles the half-close event from the client, indicating no more messages will be sent.
     */
    onReceiveHalfClose() {
      serverStreamInstance.push(null);
    },
    /**
     * Handles stream cancellation by the client.
     */
    onCancel() {
      if (serverStreamInstance) {
        serverStreamInstance.cancelled = true;
        serverStreamInstance.emit("cancelled", "cancelled");
        serverStreamInstance.destroy();
      }
    }
  });
}

module.exports = handleServerDuplexStream;
