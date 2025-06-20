/**
 * Retrieves the current URL (href) from the external 'xy' object'createInteractionAccessor document location.
 * If accessing the href property fails (e.g., due to security restrictions or missing properties),
 * the function safely returns an empty string.
 *
 * @returns {string} The current URL from xy.document.location.href, or an empty string if inaccessible.
 */
function getExternalDocumentHref() {
  try {
    // Attempt to access the href property of the document location from the external 'xy' object
    return xy.document.location.href;
  } catch (error) {
    // If an error occurs (e.g., security error, undefined property), return an empty string
    return "";
  }
}

module.exports = getExternalDocumentHref;