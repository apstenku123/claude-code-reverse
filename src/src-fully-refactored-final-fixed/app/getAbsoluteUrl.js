/**
 * Returns the absolute URL string for a given input, or undefined if the input is not a valid URL.
 *
 * @param {string} urlString - The input string to be converted to an absolute URL.
 * @returns {string|undefined} The absolute URL string if valid, otherwise undefined.
 */
function getAbsoluteUrl(urlString) {
  try {
    // Attempt to create a new URL object from the input string
    // If successful, return its href property (the absolute URL)
    return new URL(urlString).href;
  } catch (error) {
    // If the input is not a valid URL, return undefined
    return undefined;
  }
}

module.exports = getAbsoluteUrl;