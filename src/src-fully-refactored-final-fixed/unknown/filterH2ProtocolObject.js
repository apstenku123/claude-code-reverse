/**
 * Checks if the given object uses the 'h2' handler protocol in its metadata.
 * If so, returns undefined; otherwise, returns the original object.
 *
 * @param {Object} sourceObject - The object to check for the handler protocol.
 * @returns {Object|undefined} Returns undefined if the object'createInteractionAccessor metadata.handlerProtocol is 'h2', otherwise returns the object itself.
 */
const filterH2ProtocolObject = (sourceObject) => {
  // Check if the object and its metadata exist, and if the handlerProtocol is 'h2'
  if (sourceObject?.metadata?.handlerProtocol === "h2") {
    return undefined;
  }
  // Return the original object if the handlerProtocol is not 'h2'
  return sourceObject;
};

module.exports = filterH2ProtocolObject;
