/**
 * Attempts to parse a provided export URL string. If parsing fails, logs a warning and returns undefined.
 *
 * @param {string} exportUrlString - The URL string to be parsed.
 * @returns {string|undefined} The parsed URL as a string if valid, otherwise undefined.
 */
function parseExportUrlOrWarn(exportUrlString) {
  try {
    // Attempt to create a new URL object from the provided string
    return new URL(exportUrlString).toString();
  } catch {
    // Log a warning if the URL is invalid and return undefined
    hb1.diag.warn(
      `Configuration: Could not parse environment-provided export URL: '${exportUrlString}', falling back to undefined`
    );
    return;
  }
}

module.exports = parseExportUrlOrWarn;