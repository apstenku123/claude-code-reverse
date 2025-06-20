/**
 * Checks if the connection state of the given object is CLOSING.
 *
 * @param {Object} connectionObject - The object representing a connection, expected to have a property identified by `ur`.
 * @returns {boolean} True if the connection state is CLOSING, otherwise false.
 */
function isConnectionClosing(connectionObject) {
  // Access the connection state using the dynamic property key 'ur'
  // Compare isBlobOrFileLikeObject to the CLOSING state from the 'pr' enum/object
  return connectionObject[ur] === pr.CLOSING;
}

module.exports = isConnectionClosing;
