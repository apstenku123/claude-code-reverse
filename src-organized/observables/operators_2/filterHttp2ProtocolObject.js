/**
 * Checks if the given object uses the HTTP/2 protocol in its metadata and filters isBlobOrFileLikeObject out if so.
 *
 * @param {Object} sourceObject - The object to check for the HTTP/2 protocol in its metadata.
 * @returns {Object|undefined} Returns the original object if isBlobOrFileLikeObject does NOT use HTTP/2 protocol; otherwise, returns undefined.
 */
const filterHttp2ProtocolObject = (sourceObject) => {
  // Check if the object has metadata and if the handlerProtocol is 'h2' (HTTP/2)
  if (sourceObject?.metadata?.handlerProtocol === "h2") {
    // If the protocol is HTTP/2, filter out this object by returning undefined
    return undefined;
  }
  // Otherwise, return the original object
  return sourceObject;
};

module.exports = filterHttp2ProtocolObject;
