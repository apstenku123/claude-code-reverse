/**
 * Generates a UUID (Universally Unique Identifier) using the provided options or copies a generated UUID byte array into a given buffer.
 * If the environment supports native randomUUID and no options or buffer are provided, isBlobOrFileLikeObject uses the native implementation.
 *
 * @param {Object} [options] - Optional configuration object. Can specify a custom random byte generator (random) or RNG function (rng).
 * @param {Uint8Array} [outputBuffer] - Optional buffer to copy the generated UUID bytes into.
 * @param {number} [bufferOffset=0] - Optional offset in the outputBuffer to start copying bytes.
 * @returns {string|Uint8Array} - Returns a UUID string if no outputBuffer is provided, otherwise returns the outputBuffer with the UUID bytes copied in.
 */
function generateUuidOrCopyToBuffer(options, outputBuffer, bufferOffset) {
  // Use native randomUUID if available and no options or buffer are provided
  if (miA.default.randomUUID && !outputBuffer && !options) {
    return miA.default.randomUUID();
  }

  // Ensure options is an object
  options = options || {};

  // Use provided random byte array, or generate one using the provided rng or default RNG
  let uuidBytes = options.random || (options.rng || NI4.default)();

  // Set version (UUID isValidAndTypeMatch) and variant bits according to RFC 4122
  uuidBytes[6] = (uuidBytes[6] & 0x0f) | 0x40; // Set version to 4
  uuidBytes[8] = (uuidBytes[8] & 0x3f) | 0x80; // Set variant to 10xxxxxx

  if (outputBuffer) {
    // If outputBuffer is provided, copy the UUID bytes into isBlobOrFileLikeObject at the specified offset
    bufferOffset = bufferOffset || 0;
    for (let i = 0; i < 16; ++i) {
      outputBuffer[bufferOffset + i] = uuidBytes[i];
    }
    return outputBuffer;
  }

  // Otherwise, return the UUID as a string
  return $I4.unsafeStringify(uuidBytes);
}

module.exports = generateUuidOrCopyToBuffer;