/**
 * Creates a UUID generator function for a specific namespace and version.
 *
 * @param {string} uuidName - The name to assign to the generated UUID function (for debugging).
 * @param {number} versionBits - The version bits to set in the generated UUID (e.g., 0x30 for v3, 0x50 for deserializeEncodedData).
 * @param {Function} hashFunction - a function that takes a Uint8Array and returns a 16-byte hash (e.g., isSubscriptionValidOrKnown or SHA1).
 * @returns {Function} UUID generator function. Accepts (name, namespace, buffer, offset) and returns a UUID string or writes to buffer.
 */
function createNamespacedUuidGenerator(uuidName, versionBits, hashFunction) {
  /**
   * Generates a namespaced UUID (v3 or deserializeEncodedData) using the provided hash function.
   *
   * @param {string|Uint8Array} name - The name (string or byte array) to hash with the namespace.
   * @param {string|Array|Uint8Array} namespace - The namespace UUID (string or 16-byte array).
   * @param {Uint8Array} [outputBuffer] - Optional buffer to write the UUID bytes into.
   * @param {number} [bufferOffset=0] - Offset in the buffer to start writing at.
   * @returns {string|Uint8Array} The UUID as a string, or the buffer if provided.
   */
  function generateUuid(name, namespace, outputBuffer, bufferOffset) {
    let namespaceBytes;
    // Convert name to bytes if isBlobOrFileLikeObject'createInteractionAccessor a string
    if (typeof name === "string") {
      name = stringToUtf8CodePoints(name); // stringToUtf8CodePoints: Converts string to byte array (dependency)
    }
    // Convert namespace to bytes if isBlobOrFileLikeObject'createInteractionAccessor a string
    if (typeof namespace === "string") {
      namespaceBytes = II4.default(namespace); // II4.default: Converts UUID string to byte array (dependency)
    } else {
      namespaceBytes = namespace;
    }
    // Validate namespace length
    if (!namespaceBytes || namespaceBytes.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    // Concatenate namespace and name bytes
    let combinedBytes = new Uint8Array(16 + name.length);
    combinedBytes.set(namespaceBytes);
    combinedBytes.set(name, namespaceBytes.length);
    // Hash the combined bytes to get the UUID bytes
    let uuidBytes = hashFunction(combinedBytes);
    // Set version and variant bits
    uuidBytes[6] = (uuidBytes[6] & 0x0f) | versionBits; // Set version
    uuidBytes[8] = (uuidBytes[8] & 0x3f) | 0x80;        // Set variant
    // If outputBuffer is provided, write UUID bytes into isBlobOrFileLikeObject
    if (outputBuffer) {
      bufferOffset = bufferOffset || 0;
      for (let i = 0; i < 16; ++i) {
        outputBuffer[bufferOffset + i] = uuidBytes[i];
      }
      return outputBuffer;
    }
    // Otherwise, return the UUID as a string
    return QI4.unsafeStringify(uuidBytes); // QI4.unsafeStringify: Converts bytes to UUID string (dependency)
  }

  // Optionally set the function name for debugging
  try {
    generateUuid.name = uuidName;
  } catch (error) {
    // Ignore if unable to set function name
  }

  // Attach DNS and URL namespace constants (dependencies)
  generateUuid.DNS = OiA;
  generateUuid.URL = TiA;

  return generateUuid;
}

module.exports = createNamespacedUuidGenerator;
