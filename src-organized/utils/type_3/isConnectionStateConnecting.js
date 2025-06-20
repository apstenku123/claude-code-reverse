/**
 * Checks if the connection state of the given connection object is CONNECTING.
 *
 * @param {Object} connectionObject - The object representing the connection, expected to have a property keyed by `connectionStateKey`.
 * @returns {boolean} True if the connection state is CONNECTING, false otherwise.
 */
function isConnectionStateConnecting(connectionObject) {
  // Check if the connection state property equals the CONNECTING constant
  return connectionObject[connectionStateKey] === connectionStates.CONNECTING;
}

module.exports = isConnectionStateConnecting;