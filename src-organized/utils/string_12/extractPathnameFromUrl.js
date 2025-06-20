/**
 * Extracts the pathname from a given URL string.
 *
 * @param {string} urlString - The URL string from which to extract the pathname.
 * @returns {string|null} The pathname component of the URL, or null if the input is not a valid URL.
 */
function extractPathnameFromUrl(urlString) {
  try {
    // Attempt to create a new URL object and return its pathname
    const url = new URL(urlString);
    return url.pathname;
  } catch (error) {
    // If urlString is not a valid URL, return null
    return null;
  }
}

module.exports = extractPathnameFromUrl;