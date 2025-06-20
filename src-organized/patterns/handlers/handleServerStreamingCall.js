/**
 * Handles a server streaming gRPC call by setting up stream event handlers and invoking the server method.
 *
 * @param {object} callStream - The gRPC call stream object, responsible for managing the lifecycle of the call.
 * @param {object} handlerConfig - Configuration object containing the path and the server method handler function.
 * @param {string} handlerConfig.path - The gRPC method path.
 * @param {function} handlerConfig.func - The server method handler function to invoke.
 * @returns {void}
 */
function handleServerStreamingCall(callStream, handlerConfig) {
  let serverDuplexStream = null;

  callStream.start({
    /**
     * Called when metadata is received from the client.
     * Sets up the server duplex stream and invokes the handler function.
     */
    onReceiveMetadata(metadata) {
      // Create a new server duplex stream for this call
      serverDuplexStream = new sg.ServerDuplexStreamImpl(
        handlerConfig.path,
        callStream,
        metadata
      );
      try {
        // Invoke the user-defined server handler function
        handlerConfig.func(serverDuplexStream);
      } catch (error) {
        // If the handler throws, send an UNKNOWN status to the client
        callStream.sendStatus({
          code: LQ.Status.UNKNOWN,
          details: `Server method handler threw error ${error.message}`,
          metadata: null
        });
      }
    },

    /**
     * Called when a message is received from the client.
     * Pushes the message into the server duplex stream.
     */
    onReceiveMessage(message) {
      if (serverDuplexStream) {
        serverDuplexStream.push(message);
      }
    },

    /**
     * Called when the client half-closes the stream.
     * Signals the end of messages by pushing null.
     */
    onReceiveHalfClose() {
      if (serverDuplexStream) {
        serverDuplexStream.push(null);
      }
    },

    /**
     * Called when the client cancels the call.
     * Marks the stream as cancelled, emits a cancel event, and destroys the stream.
     */
    onCancel() {
      if (serverDuplexStream) {
        serverDuplexStream.cancelled = true;
        serverDuplexStream.emit("cancelled", "cancelled");
        serverDuplexStream.destroy();
      }
    }
  });
}

module.exports = handleServerStreamingCall;