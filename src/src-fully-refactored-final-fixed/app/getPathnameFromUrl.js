/**
 * Extracts the pathname from a given URL string.
 *
 * @param {string} urlString - The URL string from which to extract the pathname.
 * @returns {string|null} The pathname component of the URL, or null if the input is not a valid URL.
 */
function getPathnameFromUrl(urlString) {
  try {
    // Attempt to create a new URL object from the input string
    // and return its pathname property
    return new URL(urlString).pathname;
  } catch (error) {
    // If the input is not a valid URL, return null
    return null;
  }
}

module.exports = getPathnameFromUrl;