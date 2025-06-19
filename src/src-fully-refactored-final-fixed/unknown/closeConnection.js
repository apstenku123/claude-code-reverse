/**
 * Closes the current connection by setting its ready state to CLOSING,
 * ending its receiver, and finalizing the connection.
 *
 * @returns {void} Does not return anything.
 */
function closeConnection() {
  // Retrieve the connection object from the current context using the zI property
  const connection = this[zI];

  // Set the connection'createInteractionAccessor ready state to CLOSING (using the O4 constant)
  connection._readyState = O4.CLOSING;

  // End the receiver associated with this connection
  connection._receiver.end();

  // Finalize and clean up the current connection
  this.end();
}

module.exports = closeConnection;