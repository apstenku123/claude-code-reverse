/**
 * Attempts to construct and validate an export URL by combining a base URL and a path segment.
 * If the base URL or the combined URL is invalid, logs a warning and returns undefined.
 *
 * @param {string} baseUrl - The base URL provided by the environment.
 * @param {string} pathSegment - The path segment to append to the base URL.
 * @returns {string|undefined} The validated, combined URL string, or undefined if invalid.
 */
function getValidatedExportUrl(baseUrl, pathSegment) {
  // Validate the base URL
  try {
    new URL(baseUrl);
  } catch {
    hb1.diag.warn(
      `Configuration: Could not parse environment-provided export URL: '${baseUrl}', falling back to undefined`
    );
    return;
  }

  // Ensure the base URL ends with a slash before appending the path segment
  let combinedUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
  combinedUrl += pathSegment;

  // Validate the combined URL
  try {
    new URL(combinedUrl);
  } catch {
    hb1.diag.warn(
      `Configuration: Provided URL appended with '${pathSegment}' is not a valid URL, using 'undefined' instead of '${combinedUrl}'`
    );
    return;
  }

  return combinedUrl;
}

module.exports = getValidatedExportUrl;