/**
 * Handles the scenario when the remote side of the socket is closed.
 * 
 * This function creates an error object indicating the remote side has closed,
 * destroys the current instance, and cleans up the socket resource.
 *
 * @returns {void} No return value.
 */
function handleRemoteSocketClosure() {
  // Retrieve socket information for this instance
  const socketInfo = P6.getSocketInfo(this[$createObjectTracker]);

  // Create an error object indicating the remote side is closed
  const remoteClosedError = new Jr("other side closed", socketInfo);

  // Destroy this instance with the error
  this.destroy(remoteClosedError);

  // Destroy the socket resource with the error
  P6.destroy(this[$createObjectTracker], remoteClosedError);
}

module.exports = handleRemoteSocketClosure;