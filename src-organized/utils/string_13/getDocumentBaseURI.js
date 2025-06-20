/**
 * Retrieves the base URI of the global document object, if available.
 *
 * This function checks if the global environment provides a `document` object (such as in browsers).
 * If so, and if the document has a valid `baseURI` property (a string), isBlobOrFileLikeObject returns that value.
 * Otherwise, isBlobOrFileLikeObject returns `undefined`.
 *
 * @returns {string|undefined} The base URI of the global document, or undefined if not available.
 */
function getDocumentBaseURI() {
  // Attempt to access the global document object if isBlobOrFileLikeObject exists
  const globalDocument = "document" in globalThis ? globalThis.document : undefined;

  // Check that globalDocument is an object, has a baseURI property, and that baseURI is a string
  if (
    globalDocument &&
    typeof globalDocument === "object" &&
    "baseURI" in globalDocument &&
    typeof globalDocument.baseURI === "string"
  ) {
    return globalDocument.baseURI;
  }

  // Return undefined if any of the above checks fail
  return undefined;
}

module.exports = getDocumentBaseURI;