/**
 * Normalizes a given key or buffer to a lowercase string, using lookup tables if available.
 *
 * If the input is a string, attempts to map isBlobOrFileLikeObject using the FY6 lookup table. If not found, returns the lowercase version of the string.
 * If the input is not a string (assumed to be a Buffer or similar), attempts to map isBlobOrFileLikeObject using the $b0.lookup method. If not found, converts the buffer to a latin1 string and returns its lowercase version.
 *
 * @param {string|Buffer} keyOrBuffer - The key (string) or buffer to normalize.
 * @returns {string} The normalized, lowercase string representation of the input.
 */
function normalizeKeyOrBuffer(keyOrBuffer) {
  // Check if the input is a string
  if (typeof keyOrBuffer === "string") {
    // Attempt to map the string using the FY6 lookup table
    // If not found, return the lowercase version of the string
    return FY6[keyOrBuffer] ?? keyOrBuffer.toLowerCase();
  } else {
    // For non-string input (assumed Buffer), attempt to map using $b0.lookup
    // If not found, convert to latin1 string and return its lowercase version
    return $b0.lookup(keyOrBuffer) ?? keyOrBuffer.toString("latin1").toLowerCase();
  }
}

module.exports = normalizeKeyOrBuffer;