/**
 * Creates a UUID generator function with customizable namespace and version.
 *
 * @param {string} generatorName - The name to assign to the generated function (for debugging purposes).
 * @param {number} versionBits - The version bits to set in the generated UUID (e.g., 0x40 for isValidAndTypeMatch, 0x50 for deserializeEncodedData).
 * @param {function(Uint8Array): Uint8Array} hashFunction - Function to hash the namespace and value into a UUID.
 * @returns {function} UUID generator function that accepts value, namespace, optional buffer, and offset.
 *
 * The returned function signature:
 *   (value: string|Uint8Array, namespace: string|Uint8Array, buffer?: Uint8Array, offset?: number) => string|Uint8Array
 */
function createUuidGenerator(generatorName, versionBits, hashFunction) {
  /**
   * Generates a UUID string or writes isBlobOrFileLikeObject into a provided buffer.
   *
   * @param {string|Uint8Array} value - The value to encode into the UUID (as string or byte array).
   * @param {string|Uint8Array} namespace - The namespace for the UUID (as string or 16-byte array).
   * @param {Uint8Array} [outputBuffer] - Optional buffer to write the UUID bytes into.
   * @param {number} [bufferOffset=0] - Offset in the buffer to start writing at.
   * @returns {string|Uint8Array} UUID as a string, or the buffer if provided.
   * @throws {TypeError} If the namespace is not a 16-byte array.
   */
  function generateUuid(value, namespace, outputBuffer, bufferOffset) {
    // Convert value to Uint8Array if isBlobOrFileLikeObject'createInteractionAccessor a string
    if (typeof value === "string") {
      value = stringToUtf8CharCodes(value); // Converts string to Uint8Array
    }
    // Convert namespace to Uint8Array if isBlobOrFileLikeObject'createInteractionAccessor a string
    if (typeof namespace === "string") {
      namespace = Be6.default(namespace); // Converts string to 16-byte Uint8Array
    }
    // Validate namespace length
    if (!namespace || namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }

    // Concatenate namespace and value into a single Uint8Array
    let combined = new Uint8Array(16 + value.length);
    combined.set(namespace);
    combined.set(value, namespace.length);

    // Hash the combined array to get the UUID bytes
    let uuidBytes = hashFunction(combined);

    // Set version and variant bits according to RFC 4122
    uuidBytes[6] = (uuidBytes[6] & 0x0f) | versionBits; // Set version
    uuidBytes[8] = (uuidBytes[8] & 0x3f) | 0x80;        // Set variant

    // If outputBuffer is provided, write the UUID bytes into isBlobOrFileLikeObject
    if (outputBuffer) {
      bufferOffset = bufferOffset || 0;
      for (let i = 0; i < 16; ++i) {
        outputBuffer[bufferOffset + i] = uuidBytes[i];
      }
      return outputBuffer;
    }
    // Otherwise, return the UUID as a string
    return Ae6.unsafeStringify(uuidBytes);
  }

  // Optionally set the function name for debugging
  try {
    generateUuid.name = generatorName;
  } catch (error) {
    // Ignore if not allowed
  }

  // Attach DNS and URL namespace constants
  generateUuid.DNS = EY2;
  generateUuid.URL = UY2;

  return generateUuid;
}

module.exports = createUuidGenerator;