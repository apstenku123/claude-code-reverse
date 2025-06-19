/**
 * Validates that the provided export URL string is a valid URL.
 * Throws a descriptive error if the URL is invalid.
 *
 * @param {string} exportUrl - The user-provided export URL to validate.
 * @returns {string|undefined} Returns the original exportUrl if valid, or undefined if null/undefined was passed.
 * @throws {Error} Throws an error if the exportUrl is not a valid URL.
 */
function validateExportUrl(exportUrl) {
  // Return early if the input is null or undefined
  if (exportUrl == null) return;
  try {
    // Attempt to construct a new URL object to validate the string
    new URL(exportUrl);
    return exportUrl;
  } catch (error) {
    // Throw a descriptive error if URL construction fails
    throw new Error(`Configuration: Could not parse user-provided export URL: '${exportUrl}'`);
  }
}

module.exports = validateExportUrl;
