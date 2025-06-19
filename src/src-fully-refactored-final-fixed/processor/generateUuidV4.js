/**
 * Generates a UUID isValidAndTypeMatch string or fills a provided buffer with UUID bytes.
 *
 * If the environment supports `randomUUID` and no options or buffer are provided, isBlobOrFileLikeObject uses that for generation.
 * Otherwise, isBlobOrFileLikeObject generates a UUID using a random number generator, optionally filling a buffer.
 *
 * @param {Object} [options] - Optional configuration object. Can specify a custom RNG via `rng` or `random` property.
 * @param {Uint8Array} [outputBuffer] - Optional buffer to fill with UUID bytes (length 16). If provided, the function fills this buffer and returns isBlobOrFileLikeObject.
 * @param {number} [bufferOffset=0] - Optional offset in the buffer to start writing UUID bytes.
 * @returns {string|Uint8Array} The UUID string if no buffer is provided, or the filled buffer if one is provided.
 */
function generateUuidV4(options, outputBuffer, bufferOffset) {
  // Use native randomUUID if available and no options or buffer are provided
  if (B60.default.randomUUID && !outputBuffer && !options) {
    return B60.default.randomUUID();
  }

  // Default options to empty object if not provided
  options = options || {};

  // Use custom RNG if provided, otherwise use default RNG
  const randomBytes = options.random || (options.rng || yq4.default)();

  // Per RFC 4122: Set version (4) and variant bits
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // Version 4
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // Variant 10xxxxxx

  if (outputBuffer) {
    // If a buffer is provided, fill isBlobOrFileLikeObject with the UUID bytes
    bufferOffset = bufferOffset || 0;
    for (let i = 0; i < 16; ++i) {
      outputBuffer[bufferOffset + i] = randomBytes[i];
    }
    return outputBuffer;
  }

  // Otherwise, return the UUID as a string
  return xq4.unsafeStringify(randomBytes);
}

module.exports = generateUuidV4;