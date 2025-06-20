/**
 * Determines if the provided message type is a valid WebSocket message type (TEXT or BINARY).
 *
 * @param {string} messageType - The type of the WebSocket message to check.
 * @returns {boolean} True if the message type is TEXT or BINARY, false otherwise.
 */
function isWebSocketMessageType(messageType) {
  // Check if the message type matches either TEXT or BINARY constants from wR
  return messageType === wR.TEXT || messageType === wR.BINARY;
}

module.exports = isWebSocketMessageType;