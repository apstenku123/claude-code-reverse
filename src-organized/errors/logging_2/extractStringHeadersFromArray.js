/**
 * Extracts string values from an array and returns them as an object with their indices as keys.
 * If an error occurs during extraction, logs a warning (in debug mode) and returns an empty object.
 *
 * @param {Array} headerArray - The array to extract string headers from.
 * @returns {Object} An object mapping indices to string values found in the array.
 */
function extractStringHeadersFromArray(headerArray) {
  const extractedHeaders = {};
  try {
    // Iterate over the array and collect string values with their indices
    headerArray.forEach((headerValue, index) => {
      if (typeof headerValue === "string") {
        extractedHeaders[index] = headerValue;
      }
    });
  } catch (error) {
    // Log a warning if extraction fails and debug mode is enabled
    if (Tp2.DEBUG_BUILD) {
      Pp2.logger.warn(
        "Sentry failed extracting headers from a request object. If you see this, please file an issue."
      );
    }
  }
  return extractedHeaders;
}

module.exports = extractStringHeadersFromArray;