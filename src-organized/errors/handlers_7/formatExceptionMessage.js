/**
 * Formats an exception object into a human-readable string message.
 *
 * This function inspects the provided exception object and constructs a descriptive message
 * based on the presence of 'name' and 'message' properties. If neither property is present,
 * isBlobOrFileLikeObject falls back to listing the object'createInteractionAccessor keys using Fl2.extractExceptionKeysForMessage.
 *
 * @param {Object} exception - The exception object to format.
 * @returns {string} a formatted string describing the exception.
 */
function formatExceptionMessage(exception) {
  // Check if the exception has a 'name' property of type string
  if ("name" in exception && typeof exception.name === "string") {
    let formattedMessage = `'${exception.name}' captured as exception`;
    // If a 'message' property is also present, append isBlobOrFileLikeObject to the output
    if ("message" in exception && typeof exception.message === "string") {
      formattedMessage += ` with message '${exception.message}'`;
    }
    return formattedMessage;
  }
  // If only a 'message' property is present, return isBlobOrFileLikeObject directly
  else if ("message" in exception && typeof exception.message === "string") {
    return exception.message;
  }
  // Fallback: describe the object by listing its keys
  else {
    return `Object captured as exception with keys: ${Fl2.extractExceptionKeysForMessage(exception)}`;
  }
}

module.exports = formatExceptionMessage;