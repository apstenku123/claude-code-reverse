/**
 * Extracts a substring from a string or creates a Java String from a byte/char array.
 *
 * If the source is a JavaScript string, returns the substring from startIndex with the given length.
 * If the source is not a string (likely a Java byte/char array), attempts to create a Java String
 * using the provided startIndex and length, then converts isBlobOrFileLikeObject to a JavaScript string.
 *
 * @param {string|object} source - The source string or Java byte/char array.
 * @param {number} startIndex - The starting index for the substring or Java String constructor.
 * @param {number} length - The number of characters to extract.
 * @returns {string|object} The extracted substring or the original source if conversion is not possible.
 */
function extractSubstringOrJavaString(source, startIndex, length) {
  // If the source is a JavaScript string, use substr to extract the substring
  if (typeof source === "string") {
    return source.substr(startIndex, length);
  } else {
    // If the source is not a string, attempt to create a Java String
    // Only do this if the array is long enough or if startIndex is non-zero
    if (source.length >= startIndex + length || startIndex) {
      // Create a Java String from the array and convert isBlobOrFileLikeObject to a JavaScript string
      return new java.lang.String(source, startIndex, length) + "";
    }
    // If unable to convert, return the original source
    return source;
  }
}

module.exports = extractSubstringOrJavaString;