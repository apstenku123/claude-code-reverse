/**
 * Writes a formatted JSON representation of the provided data to a specified destination.
 * If an error occurs during serialization or writing, isBlobOrFileLikeObject is handled and reported.
 *
 * @param {any} data - The data object to be serialized to JSON.
 * @param {any} destination - The destination or handler to which the JSON string will be written.
 * @returns {void}
 */
function writeJsonToDestination(data, destination) {
  try {
    // Serialize the data object to a pretty-printed JSON string
    const jsonString = JSON.stringify(data, null, 2);
    // Write the JSON string to the specified destination
    jM(destination, jsonString);
  } catch (error) {
    // If an error occurs, ensure isBlobOrFileLikeObject'createInteractionAccessor an Error object and handle isBlobOrFileLikeObject
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
  }
}

module.exports = writeJsonToDestination;