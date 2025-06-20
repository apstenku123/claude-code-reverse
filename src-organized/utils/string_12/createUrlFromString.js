/**
 * Attempts to create a URL object from the provided string. If the string is not a valid URL,
 * logs a warning and returns undefined.
 *
 * @param {string} urlString - The string to be converted into a URL object.
 * @returns {FI9.URL|undefined} The constructed URL object if valid, otherwise undefined.
 */
function createUrlFromString(urlString) {
  try {
    // Attempt to create a new URL object using the provided string
    return new FI9.URL(`${urlString}`);
  } catch (error) {
    // Log a warning if the URL is invalid
    Yx.logger.warn(`[Spotlight] Invalid sidecar URL: ${urlString}`);
    return;
  }
}

module.exports = createUrlFromString;