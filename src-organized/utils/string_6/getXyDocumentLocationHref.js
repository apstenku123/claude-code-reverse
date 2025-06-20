/**
 * Retrieves the current URL from the 'xy' object'createInteractionAccessor document location.
 * If accessing the URL fails (e.g., due to security restrictions), returns an empty string.
 *
 * @returns {string} The current URL from xy.document.location.href, or an empty string if inaccessible.
 */
function getXyDocumentLocationHref() {
  try {
    // Attempt to access the URL from the xy object'createInteractionAccessor document location
    return xy.document.location.href;
  } catch (error) {
    // If access fails (e.g., security error), return an empty string
    return "";
  }
}

module.exports = getXyDocumentLocationHref;