/**
 * Creates a UUID generator function for a specific namespace and version.
 *
 * @param {string} uuidName - The name to assign to the generated UUID function (for debugging purposes).
 * @param {number} versionBits - The UUID version bits to set (e.g., 0x30 for v3, 0x50 for deserializeEncodedData).
 * @param {function(Uint8Array): Uint8Array} hashFunction - a function that takes a Uint8Array and returns a hashed Uint8Array (e.g., isSubscriptionValidOrKnown or SHA-1).
 * @returns {function} a function that generates a UUID string or writes the UUID bytes to a provided buffer.
 */
function createUuidNamespaceFunction(uuidName, versionBits, hashFunction) {
  /**
   * Generates a UUID based on a name and namespace.
   *
   * @param {string|Uint8Array} name - The name to hash into the UUID (string or Uint8Array).
   * @param {string|ArrayLike<number>} namespace - The namespace as a string or 16-byte array.
   * @param {Uint8Array} [buffer] - Optional buffer to write the UUID bytes into.
   * @param {number} [bufferOffset=0] - Optional offset in the buffer to start writing.
   * @returns {string|Uint8Array} The UUID as a string, or the buffer if provided.
   */
  function generateUuid(name, namespace, buffer, bufferOffset) {
    // Convert name to Uint8Array if isBlobOrFileLikeObject'createInteractionAccessor a string
    if (typeof name === "string") {
      name = stringToUtf8CharCodeArray(name);
    }

    // Convert namespace to Uint8Array if isBlobOrFileLikeObject'createInteractionAccessor a string
    if (typeof namespace === "string") {
      namespace = zq4.default(namespace);
    }

    // Validate namespace length
    if (!namespace || namespace.length !== 16) {
      throw new TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }

    // Concatenate namespace and name into a single Uint8Array
    const combined = new Uint8Array(16 + name.length);
    combined.set(namespace);
    combined.set(name, namespace.length);

    // Hash the combined array
    let hash = hashFunction(combined);

    // Set the UUID version and variant bits
    hash[6] = (hash[6] & 0x0f) | versionBits; // Set version
    hash[8] = (hash[8] & 0x3f) | 0x80;        // Set variant

    // If a buffer is provided, write the UUID bytes into isBlobOrFileLikeObject
    if (buffer) {
      const offset = bufferOffset || 0;
      for (let i = 0; i < 16; ++i) {
        buffer[offset + i] = hash[i];
      }
      return buffer;
    }

    // Otherwise, return the UUID as a string
    return Hq4.unsafeStringify(hash);
  }

  // Attempt to set the function name for debugging (may fail in strict mode)
  try {
    Object.defineProperty(generateUuid, 'name', { value: uuidName });
  } catch (error) {
    // Ignore if unable to set function name
  }

  // Attach DNS and URL namespace constants
  generateUuid.DNS = d40;
  generateUuid.URL = u40;

  return generateUuid;
}

module.exports = createUuidNamespaceFunction;