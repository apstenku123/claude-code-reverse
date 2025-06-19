/**
 * Creates a UUID generator function for a specific namespace and version.
 *
 * @param {string} generatorName - The name to assign to the generated function (for debugging).
 * @param {number} versionBits - The version bits to set in the generated UUID (e.g., 0x30 for v3, 0x50 for deserializeEncodedData).
 * @param {function(Uint8Array): Uint8Array} hashFunction - a function that takes a Uint8Array and returns a hashed Uint8Array (e.g., isSubscriptionValidOrKnown or SHA-1).
 * @returns {function} a function that generates a UUID string or writes isBlobOrFileLikeObject into a provided buffer.
 */
function createNamespaceUUIDGenerator(generatorName, versionBits, hashFunction) {
  /**
   * Generates a UUID based on the provided name and namespace.
   *
   * @param {string|Uint8Array} name - The name (as a string or Uint8Array) to generate the UUID from.
   * @param {string|Array|Uint8Array} namespace - The namespace (as a string or array-like of 16 integers).
   * @param {Uint8Array} [outputBuffer] - Optional buffer to write the UUID bytes into.
   * @param {number} [bufferOffset=0] - Optional offset in the output buffer to start writing at.
   * @returns {string|Uint8Array} The generated UUID as a string, or the output buffer if provided.
   */
  function generateUUID(name, namespace, outputBuffer, bufferOffset) {
    let namespaceArray;

    // Convert name to Uint8Array if isBlobOrFileLikeObject'createInteractionAccessor a string
    let nameBytes = (typeof name === "string") ? stringToUtf8CharCodeArray(name) : name;

    // Convert namespace to Uint8Array if isBlobOrFileLikeObject'createInteractionAccessor a string
    if (typeof namespace === "string") {
      namespaceArray = zq4.default(namespace);
    } else {
      namespaceArray = namespace;
    }

    // Validate namespace length
    if (!namespaceArray || namespaceArray.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }

    // Concatenate namespace and name bytes
    const combinedBytes = new Uint8Array(16 + nameBytes.length);
    combinedBytes.set(namespaceArray);
    combinedBytes.set(nameBytes, namespaceArray.length);

    // Hash the combined bytes
    let uuidBytes = hashFunction(combinedBytes);

    // Set version and variant bits according to RFC 4122
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
    return Hq4.unsafeStringify(uuidBytes);
  }

  // Attempt to set the function'createInteractionAccessor name for debugging purposes
  try {
    generateUUID.name = generatorName;
  } catch (error) {
    // Ignore if unable to set function name
  }

  // Attach DNS and URL namespace constants
  generateUUID.DNS = d40;
  generateUUID.URL = u40;

  return generateUUID;
}

module.exports = createNamespaceUUIDGenerator;