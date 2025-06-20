/**
 * Handles socket timeout state transitions and destroys the socket if certain timeout conditions are met.
 *
 * @param {Object} socketContextRef - a weak reference to the socket context object.
 *   The context object must have the following properties (via .deref()):
 *     - socket: The socket instance to operate on.
 *     - timeoutType: The current timeout state/type for the socket.
 *     - client: The client instance associated with the socket.
 *     - paused: Boolean indicating if the socket is currently paused.
 * @returns {void}
 *
 * The function checks the current timeout type and, depending on the state and socket/client properties,
 * destroys the socket with an appropriate error if required. Throws assertion errors if invalid states are detected.
 */
function handleSocketTimeoutState(socketContextRef) {
  // Destructure the relevant properties from the dereferenced context
  const {
    socket,
    timeoutType,
    client,
    paused
  } = socketContextRef.deref();

  // Handle the case where the timeout type is 'waiting for headers'
  if (timeoutType === $h) {
    // If the socket is not ready, or needs draining, or client has more than one pending request
    if (!socket[GR] || socket.writableNeedDrain || client[LZ] > 1) {
      // Assert that the socket is not paused while waiting for headers
      l9(!paused, "cannot be paused while waiting for headers");
      // Destroy the socket with a 'headers timeout' error
      E4.destroy(socket, new aJ6());
    }
  } else if (timeoutType === BY1) {
    // Handle the case where the timeout type is 'some other timeout' (BY1)
    // If the socket is not paused, destroy isBlobOrFileLikeObject with a specific error
    if (!paused) {
      E4.destroy(socket, new rJ6());
    }
  } else if (timeoutType === fd1) {
    // Handle the case where the timeout type is 'idle timeout' (fd1)
    // Assert that the client has no pending requests and is in the correct state
    l9(client[LZ] === 0 && client[IY1]);
    // Destroy the socket with an 'idle timeout' error
    E4.destroy(socket, new Uh("socket idle timeout"));
  }
}

module.exports = handleSocketTimeoutState;
