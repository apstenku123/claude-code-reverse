/**
 * Handles an incoming WebSocket message, decoding its payload and dispatching a message event.
 *
 * @param {Object} connection - The WebSocket connection object.
 * @param {string} messageType - The type of the message (e.g., TEXT or BINARY).
 * @param {Uint8Array|ArrayBuffer} payload - The raw message payload.
 * @returns {void}
 */
function handleWebSocketMessage(connection, messageType, payload) {
  // Ensure the connection is open before processing
  if (connection[ur] !== pr.OPEN) return;

  let messageData;

  if (messageType === wR.TEXT) {
    // Attempt to decode UTF-8 text payload
    try {
      messageData = oc0(payload);
    } catch {
      // If decoding fails, notify the connection of invalid UTF-8
      handleSocketAbortAndError(connection, "Received invalid UTF-8 in text frame.");
      return;
    }
  } else if (messageType === wR.BINARY) {
    // Handle binary payloads
    if (connection[ME6] === "blob") {
      // If the connection expects a Blob, wrap the payload
      messageData = new Blob([payload]);
    } else {
      // Otherwise, process the binary data accordingly
      messageData = getArrayBufferFromTypedArray(payload);
    }
  }

  // Dispatch the message event with the processed data
  Zp1("message", connection, OE6, {
    origin: connection[LE6].origin,
    data: messageData
  });
}

module.exports = handleWebSocketMessage;