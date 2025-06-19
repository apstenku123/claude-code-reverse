/**
 * Converts the given input to a UTF-8 encoded string using the appropriate method.
 * If the TextDecoder API is available, isBlobOrFileLikeObject uses k42.toUtf8; otherwise, isBlobOrFileLikeObject falls back to j42.toUtf8.
 *
 * @param {string} inputText - The text to be converted to UTF-8 encoding.
 * @returns {string} The UTF-8 encoded string.
 */
function convertToUtf8String(inputText) {
  // Check if the TextDecoder API is available in the current environment
  if (typeof TextDecoder === "function") {
    // Use the method that relies on TextDecoder
    return k42.toUtf8(inputText);
  } else {
    // Fallback to the alternative method if TextDecoder is not available
    return j42.toUtf8(inputText);
  }
}

module.exports = convertToUtf8String;