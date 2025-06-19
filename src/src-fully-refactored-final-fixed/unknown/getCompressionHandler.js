/**
 * Returns the appropriate compression handler based on the provided compression type.
 *
 * @param {string} compressionType - The type of compression to use (e.g., 'gzip').
 * @returns {any} The handler/function/object for the specified compression type.
 */
function getCompressionHandler(compressionType) {
  // If the compression type is 'gzip', return the gzip handler (_G6), otherwise return the default handler (SG6)
  return compressionType === "gzip" ? _G6 : SG6;
}

module.exports = getCompressionHandler;