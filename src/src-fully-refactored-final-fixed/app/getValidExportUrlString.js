/**
 * Attempts to parse a given export URL string and returns its normalized string representation.
 * If parsing fails, logs a warning and returns undefined.
 *
 * @param {string} exportUrl - The export URL string to be validated and normalized.
 * @returns {string|undefined} The normalized URL string if valid, otherwise undefined.
 */
function getValidExportUrlString(exportUrl) {
  try {
    // Attempt to create a new URL object from the provided string
    // If successful, return its string representation
    return new URL(exportUrl).toString();
  } catch {
    // If parsing fails, log a warning and return undefined
    hb1.diag.warn(
      `Configuration: Could not parse environment-provided export URL: '${exportUrl}', falling back to undefined`
    );
    return;
  }
}

module.exports = getValidExportUrlString;