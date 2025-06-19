/**
 * Extracts the base URL from a given URL string, removing any query parameters or hash fragments.
 *
 * @param {string} url - The URL string to process.
 * @returns {string} The base URL without query parameters or hash fragments.
 */
function getBaseUrl(url) {
  // Split the URL at the first occurrence of '?' or '#' and return the part before them
  return url.split(/[\?#]/, 1)[0];
}

module.exports = getBaseUrl;
