/**
 * Attempts to parse a given string as a URL using the FI9.URL constructor.
 * Logs a warning if the provided value is not a valid URL.
 *
 * @param {string} sidecarUrlString - The string to be parsed as a URL.
 * @returns {FI9.URL|undefined} Returns a FI9.URL instance if parsing succeeds, otherwise undefined.
 */
function parseSidecarUrl(sidecarUrlString) {
  try {
    // Attempt to create a new URL instance from the provided string
    return new FI9.URL(`${sidecarUrlString}`);
  } catch (error) {
    // Log a warning if the string is not a valid URL
    Yx.logger.warn(`[Spotlight] Invalid sidecar URL: ${sidecarUrlString}`);
    return;
  }
}

module.exports = parseSidecarUrl;