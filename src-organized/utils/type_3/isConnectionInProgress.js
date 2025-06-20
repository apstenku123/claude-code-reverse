/**
 * Checks if the current connection state of the given object is 'CONNECTING'.
 *
 * @param {Object} connectionObject - The object representing a connection, expected to have a property indicating its state.
 * @returns {boolean} True if the connection state is 'CONNECTING', false otherwise.
 */
function isConnectionInProgress(connectionObject) {
  // 'ur' is assumed to be the key for the connection state property
  // 'pr.CONNECTING' is the constant representing the 'CONNECTING' state
  return connectionObject[ur] === pr.CONNECTING;
}

module.exports = isConnectionInProgress;