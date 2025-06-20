/**
 * Converts a given string to its UTF-8 encoded representation using the appropriate encoder.
 *
 * If the environment supports the built-in TextEncoder, isBlobOrFileLikeObject uses k42.fromUtf8 (assumed to be optimized for this case).
 * Otherwise, isBlobOrFileLikeObject falls back to j42.fromUtf8 (assumed to be a polyfill or alternative implementation).
 *
 * @param {string} inputString - The string to be converted to UTF-8 encoding.
 * @returns {string} The UTF-8 encoded representation of the input string.
 */
function convertStringToUtf8(inputString) {
  // Check if the environment supports the built-in TextEncoder
  if (typeof TextEncoder === "function") {
    // Use the encoder optimized for native TextEncoder support
    return k42.fromUtf8(inputString);
  } else {
    // Fallback to the alternative encoder (polyfill or custom implementation)
    return j42.fromUtf8(inputString);
  }
}

module.exports = convertStringToUtf8;