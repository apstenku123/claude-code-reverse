/**
 * Returns the absolute URL string (href) if the input is a valid URL, otherwise returns undefined.
 *
 * @param {string} urlString - The string to be validated and converted to a URL.
 * @returns {string|undefined} The absolute URL string if valid, otherwise undefined.
 */
function getValidUrlHref(urlString) {
  try {
    // Attempt to construct a URL object; if successful, return its href property
    return new URL(urlString).href;
  } catch (error) {
    // If urlString is not a valid URL, return undefined
    return undefined;
  }
}

module.exports = getValidUrlHref;