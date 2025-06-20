/**
 * Closes the underlying connection and ends the current stream.
 *
 * This method sets the connection'createInteractionAccessor ready state to CLOSING, signals the receiver to end,
 * and then ends the current stream. It is typically used to gracefully shut down a connection.
 *
 * @returns {void} Does not return a value.
 */
function closeConnectionAndEndStream() {
  // Retrieve the underlying connection object using the external key zI
  const connection = this[zI];

  // Set the connection'createInteractionAccessor ready state to CLOSING using the external O4 constant
  connection._readyState = O4.CLOSING;

  // Signal the receiver to end any ongoing operations
  connection._receiver.end();

  // End the current stream or context
  this.end();
}

module.exports = closeConnectionAndEndStream;