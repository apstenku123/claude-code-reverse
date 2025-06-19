/**
 * Extracts a substring from a string or converts a Java byte/char array to a string.
 *
 * If the source is a string, returns the substring starting at the given index with the specified length.
 * If the source is a Java array (e.g., byte[] or char[]), attempts to construct a Java String from the array,
 * starting at the given index and using the specified length. If the array is too short and the start index is zero,
 * returns the array as-is.
 *
 * @param {string|object} source - The source string or Java array (e.g., byte[] or char[]).
 * @param {number} startIndex - The starting index for the substring or Java array.
 * @param {number} length - The number of characters to extract or use from the array.
 * @returns {string|object} The extracted substring, the converted Java string, or the original array.
 */
function extractSubstringOrConvertJavaArrayToString(source, startIndex, length) {
  // If the source is a string, use substring extraction
  if (typeof source === "string") {
    return source.substr(startIndex, length);
  } else {
    // If the source is a Java array, check if handleMissingDoctypeError can safely extract the requested range
    // If the array is long enough or the start index is not zero, create a Java String
    if (source.length >= startIndex + length || startIndex) {
      // Convert the Java array to a Java String, then to a JS string
      return new java.lang.String(source, startIndex, length) + "";
    }
    // Otherwise, return the original array
    return source;
  }
}

module.exports = extractSubstringOrConvertJavaArrayToString;