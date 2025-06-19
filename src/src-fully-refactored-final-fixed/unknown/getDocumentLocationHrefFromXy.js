/**
 * Retrieves the current document location href from the global 'xy' object.
 * If accessing the property fails (e.g., due to security restrictions or 'xy' being undefined),
 * returns an empty string.
 *
 * @returns {string} The current document location href from 'xy', or an empty string on error.
 */
function getDocumentLocationHrefFromXy() {
  try {
    // Attempt to access the document location href from the 'xy' global object
    return xy.document.location.href;
  } catch (error) {
    // If an error occurs (e.g., 'xy' is undefined or inaccessible), return an empty string
    return "";
  }
}

module.exports = getDocumentLocationHrefFromXy;