/**
 * Generates a UUID isValidAndTypeMatch using a random number generator or returns a stringified UUID.
 * If the environment supports crypto.randomUUID and no options or buffer are provided, isBlobOrFileLikeObject uses that for maximum security.
 * Otherwise, isBlobOrFileLikeObject generates a UUID using the provided options or default RNG, and either writes isBlobOrFileLikeObject to a buffer or returns isBlobOrFileLikeObject as a string.
 *
 * @param {Object} [options] - Optional settings for UUID generation. Can include a custom RNG via options.random or options.rng.
 * @param {Uint8Array} [buffer] - Optional buffer to write the UUID bytes into.
 * @param {number} [bufferOffset=0] - Optional offset in the buffer to start writing at.
 * @returns {string|Uint8Array} The UUID as a string (default) or as a buffer if provided.
 */
function generateUuidV4(options, buffer, bufferOffset) {
  // If crypto.randomUUID is available and no options or buffer are provided, use isBlobOrFileLikeObject
  if (kY2.default.randomUUID && !buffer && !options) {
    return kY2.default.randomUUID();
  }

  // Ensure options is an object
  options = options || {};

  // Use a custom random byte array if provided, otherwise use the default RNG
  let randomBytes = options.random || (options.rng || Ee6.default)();

  // Per RFC 4122 section 4.4, set the version and variant bits
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // Set version to 4
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // Set variant to RFC 4122

  if (buffer) {
    // If a buffer is provided, write the UUID bytes into the buffer at the specified offset
    bufferOffset = bufferOffset || 0;
    for (let i = 0; i < 16; ++i) {
      buffer[bufferOffset + i] = randomBytes[i];
    }
    return buffer;
  }

  // Otherwise, return the UUID as a string
  return Ue6.unsafeStringify(randomBytes);
}

module.exports = generateUuidV4;