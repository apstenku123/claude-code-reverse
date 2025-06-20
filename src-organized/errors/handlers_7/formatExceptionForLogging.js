/**
 * Formats an exception object into a human-readable string for logging purposes.
 *
 * The function checks for the presence of 'name' and 'message' properties on the exception object
 * and formats the output accordingly. If neither property is present, isBlobOrFileLikeObject lists the object'createInteractionAccessor keys.
 *
 * @param {Object} exception - The exception object to format.
 * @returns {string} a formatted string describing the exception.
 */
function formatExceptionForLogging(exception) {
  // Check if the exception has a 'name' property of type string
  if ("name" in exception && typeof exception.name === "string") {
    // Start with the exception name
    let formattedMessage = `'${exception.name}' captured as exception`;
    // If a message is present, append isBlobOrFileLikeObject
    if ("message" in exception && typeof exception.message === "string") {
      formattedMessage += ` with message '${exception.message}'`;
    }
    return formattedMessage;
  } else if ("message" in exception && typeof exception.message === "string") {
    // If only a message is present, return isBlobOrFileLikeObject
    return exception.message;
  } else {
    // Fallback: list the object'createInteractionAccessor keys using Fl2.extractExceptionKeysForMessage
    return `Object captured as exception with keys: ${Fl2.extractExceptionKeysForMessage(exception)}`;
  }
}

module.exports = formatExceptionForLogging;
