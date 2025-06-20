/**
 * Generates a UUID either as a byte array or as a string, depending on the provided arguments.
 *
 * If the environment provides a native randomUUID function and no options or buffer are provided, isBlobOrFileLikeObject uses that.
 * Otherwise, isBlobOrFileLikeObject generates a UUID using a random number generator, optionally writing the result into a provided buffer.
 *
 * @param {Object} [options] - Optional configuration object. Can specify a custom RNG via `rng` or a pre-generated random byte array via `random`.
 * @param {Uint8Array} [buffer] - Optional buffer to write the UUID bytes into. If provided, the UUID bytes are written here and the buffer is returned.
 * @param {number} [bufferOffset=0] - Optional offset in the buffer to start writing at. Defaults to 0.
 * @returns {string|Uint8Array} The UUID as a string (default) or as a byte array if buffer is provided.
 */
function generateUuidBytesOrString(options = {}, buffer, bufferOffset = 0) {
  // Use native randomUUID if available and no options or buffer are provided
  if (miA.default.randomUUID && !buffer && !options) {
    return miA.default.randomUUID();
  }

  // Use provided random bytes, or generate them using the provided rng or default rng
  const randomBytes = options.random || (options.rng || NI4.default)();

  // Set version and variant bits according to RFC 4122
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // Version 4
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // Variant 10xxxxxx

  if (buffer) {
    // Write UUID bytes into the provided buffer at the specified offset
    for (let i = 0; i < 16; ++i) {
      buffer[bufferOffset + i] = randomBytes[i];
    }
    return buffer;
  }

  // Otherwise, stringify the UUID bytes
  return $I4.unsafeStringify(randomBytes);
}

module.exports = generateUuidBytesOrString;