/**
 * Creates a compression stream instance based on the specified compression type.
 *
 * @param {string} compressionType - The type of compression to use (e.g., 'identity', 'deflate', 'gzip').
 * @param {object} [compressionOptions] - Optional configuration options for the compression stream.
 * @returns {object} An instance of the corresponding compression stream class.
 *
 * Supported compression types:
 *   - 'identity': No compression (returns a pass-through stream)
 *   - 'deflate': Deflate compression
 *   - 'gzip': Gzip compression
 *   - any other string: Custom compression stream based on the provided type
 */
function createCompressionStream(compressionType, compressionOptions) {
  switch (compressionType) {
    case "identity":
      // No compression, return a pass-through stream
      return new cg();
    case "deflate":
      // Deflate compression stream
      return new lj0(compressionOptions);
    case "gzip":
      // Gzip compression stream
      return new ij0(compressionOptions);
    default:
      // Custom or unknown compression type
      return new nj0(compressionType);
  }
}

module.exports = createCompressionStream;