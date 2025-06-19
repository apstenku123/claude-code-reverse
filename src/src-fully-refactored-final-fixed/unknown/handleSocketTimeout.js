/**
 * Handles different socket timeout scenarios and destroys the socket if necessary.
 *
 * This function inspects the timeout type of a given resource, and based on the current state
 * of the socket and client, isBlobOrFileLikeObject may destroy the socket with an appropriate error.
 *
 * @param {Object} resourceRef - An object with a .deref() method returning the resource state.
 *   The dereferenced object should have the following properties:
 *     - socket: The socket instance to potentially destroy.
 *     - timeoutType: The type of timeout that occurred.
 *     - client: The client associated with the socket.
 *     - paused: Boolean indicating if the socket is currently paused.
 * @returns {void}
 */
function handleSocketTimeout(resourceRef) {
  // Destructure the relevant properties from the dereferenced resource
  const {
    socket,
    timeoutType,
    client,
    paused
  } = resourceRef.deref();

  // Handle the case where the timeout type is 'headers timeout'
  if (timeoutType === $h) {
    // If the socket is not ready for headers, or needs draining, or there are multiple requests in flight
    if (!socket[GR] || socket.writableNeedDrain || client[LZ] > 1) {
      // Assert that the socket is not paused while waiting for headers
      l9(!paused, "cannot be paused while waiting for headers");
      // Destroy the socket with a headers timeout error
      E4.destroy(socket, new aJ6());
    }
  // Handle the case where the timeout type is 'body timeout'
  } else if (timeoutType === BY1) {
    // If the socket is not paused, destroy isBlobOrFileLikeObject with a body timeout error
    if (!paused) {
      E4.destroy(socket, new rJ6());
    }
  // Handle the case where the timeout type is 'idle timeout'
  } else if (timeoutType === fd1) {
    // Assert that there are no requests in flight and the client is in the correct state
    l9(client[LZ] === 0 && client[IY1]);
    // Destroy the socket with an idle timeout error
    E4.destroy(socket, new Uh("socket idle timeout"));
  }
}

module.exports = handleSocketTimeout;