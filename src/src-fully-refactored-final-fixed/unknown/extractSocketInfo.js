/**
 * Extracts socket information from the given socket object.
 *
 * @param {Object} socketObject - The socket object containing connection details.
 * @param {string|number} socketObject.id - The unique identifier for the socket connection.
 * @param {string} socketObject.name - The name associated with the socket connection.
 * @returns {Object} An object containing the socket'createInteractionAccessor id and name.
 */
function extractSocketInfo(socketObject) {
  // Return an object with the socket'createInteractionAccessor id and name properties
  return {
    socket_id: socketObject.id,
    name: socketObject.name
  };
}

module.exports = extractSocketInfo;