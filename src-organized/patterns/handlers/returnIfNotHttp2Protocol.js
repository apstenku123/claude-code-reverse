/**
 * Checks if the provided object uses the HTTP/2 ("h2") handler protocol in its metadata.
 * If so, returns undefined; otherwise, returns the original object.
 *
 * @param {Object} sourceObject - The object to check for the handler protocol.
 * @returns {Object|undefined} Returns the original object if its handler protocol is not "h2"; otherwise, undefined.
 */
const returnIfNotHttp2Protocol = (sourceObject) => {
  // Check if the object and its metadata exist, and if the handlerProtocol is "h2"
  if (sourceObject?.metadata?.handlerProtocol === "h2") {
    // If the handler protocol is HTTP/2, return undefined
    return undefined;
  }
  // Otherwise, return the original object
  return sourceObject;
};

module.exports = returnIfNotHttp2Protocol;
