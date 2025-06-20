/**
 * Handles a server streaming gRPC request by managing the request lifecycle,
 * including receiving metadata, handling messages, and managing stream cancellation.
 *
 * @param {object} streamInterface - The transport interface for the gRPC stream, providing methods to send status, start reads, etc.
 * @param {object} methodConfig - Configuration for the gRPC method, including the path and handler function.
 * @returns {void}
 */
function handleServerStreamingRequest(streamInterface, methodConfig) {
  let serverStreamInstance = null;
  let requestMetadata = null;
  let requestMessage = null;

  streamInterface.start({
    /**
     * Called when metadata is received from the client.
     * Stores metadata and initiates reading the request message.
     */
    onReceiveMetadata(metadata) {
      requestMetadata = metadata;
      streamInterface.startRead();
    },

    /**
     * Called when a request message is received from the client.
     * Ensures only one request message is processed for server streaming methods.
     */
    onReceiveMessage(message) {
      if (requestMessage) {
        // Only one request message is allowed for server streaming methods
        streamInterface.sendStatus({
          code: LQ.Status.UNIMPLEMENTED,
          details: `Received a second request message for server streaming method ${methodConfig.path}`,
          metadata: null
        });
        return;
      }
      requestMessage = message;
      streamInterface.startRead();
    },

    /**
     * Called when the client half-closes the stream (finished sending messages).
     * If a request message was received, invokes the server handler.
     */
    onReceiveHalfClose() {
      if (!requestMessage) {
        // No request message was received
        streamInterface.sendStatus({
          code: LQ.Status.UNIMPLEMENTED,
          details: `Received no request message for server streaming method ${methodConfig.path}`,
          metadata: null
        });
        return;
      }
      // Create the server stream implementation
      serverStreamInstance = new sg.ServerWritableStreamImpl(
        methodConfig.path,
        streamInterface,
        requestMetadata,
        requestMessage
      );
      try {
        // Invoke the user-defined handler for the server streaming method
        methodConfig.func(serverStreamInstance);
      } catch (error) {
        // If the handler throws, send an UNKNOWN error status
        streamInterface.sendStatus({
          code: LQ.Status.UNKNOWN,
          details: `Server method handler threw error ${error.message}`,
          metadata: null
        });
      }
    },

    /**
     * Called when the client cancels the stream.
     * Marks the stream as cancelled and cleans up resources.
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

module.exports = handleServerStreamingRequest;