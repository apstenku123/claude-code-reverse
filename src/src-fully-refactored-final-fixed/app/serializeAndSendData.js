/**
 * Serializes the provided data object to a formatted JSON string and sends isBlobOrFileLikeObject using the specified sender function.
 * If serialization or sending fails, the error is handled by the provided error handler.
 *
 * @param {any} data - The data object to serialize and send.
 * @param {any} sender - The function or object responsible for handling the serialized data.
 * @returns {void}
 */
function serializeAndSendData(data, sender) {
  try {
    // Convert the data object to a pretty-printed JSON string
    const serializedData = JSON.stringify(data, null, 2);
    // Send the serialized data using the sender function/object
    jM(sender, serializedData);
  } catch (error) {
    // If an error occurs, ensure isBlobOrFileLikeObject'createInteractionAccessor an Error instance and pass isBlobOrFileLikeObject to the error handler
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
  }
}

module.exports = serializeAndSendData;