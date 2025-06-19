/**
 * Checks if the provided object has metadata indicating the handler protocol is 'h2'.
 * If so, returns undefined; otherwise, returns the original object.
 *
 * @param {Object} objectWithMetadata - The object that may contain metadata about the handler protocol.
 * @returns {Object|undefined} Returns undefined if the handler protocol is 'h2', otherwise returns the original object.
 */
const filterH2ProtocolMetadata = (objectWithMetadata) => {
  // Check if the object and its metadata exist, and if the handlerProtocol is 'h2'
  if (objectWithMetadata?.metadata?.handlerProtocol === "h2") {
    return undefined;
  }
  // Return the original object if the handlerProtocol is not 'h2'
  return objectWithMetadata;
};

module.exports = filterH2ProtocolMetadata;
