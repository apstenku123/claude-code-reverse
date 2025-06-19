/**
 * Deletes a cookie from the specified document with given attributes.
 *
 * @param {Document} document - The document object from which to delete the cookie.
 * @param {string} cookieName - The name of the cookie to delete.
 * @param {Object} [deleteAttributes] - Optional attributes for cookie deletion (e.g., path, domain).
 * @returns {void}
 */
function deleteCookieFromDocument(document, cookieName, deleteAttributes) {
  // Ensure the document is a valid object of the expected type
  S6.brandCheck(document, eY1, { strict: false });

  const functionName = "deleteCookie";

  // Check that at least 2 arguments are provided
  S6.argumentLengthCheck(arguments, 2, functionName);

  // Convert the cookie name to a DOMString for consistency
  const normalizedCookieName = S6.converters.DOMString(cookieName, functionName, "name");

  // Convert the deleteAttributes to the expected format
  const normalizedDeleteAttributes = S6.converters.DeleteCookieAttributes(deleteAttributes);

  // Call the internal cookie deletion function with the appropriate parameters
  bc0(document, {
    name: normalizedCookieName,
    value: "", // Setting value to empty string to delete
    expires: new Date(0), // Set expiry to epoch to force deletion
    ...normalizedDeleteAttributes
  });
}

module.exports = deleteCookieFromDocument;