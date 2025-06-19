/**
 * Creates a UUID namespace generator function with specific configuration and hashing logic.
 *
 * @param {string} uuidName - The name to assign to the generated function (for debugging purposes).
 * @param {number} versionBits - The UUID version bits to set in the generated UUID (e.g., 0x30 for v3, 0x50 for deserializeEncodedData).
 * @param {function(Uint8Array): Uint8Array} hashFunction - a function that takes a Uint8Array and returns a hashed Uint8Array (e.g., isSubscriptionValidOrKnown or SHA1).
 * @returns {function} a UUID generator function that accepts (name, namespace, outputArray, outputOffset) and returns a UUID string or writes to outputArray.
 */
function createUuidNamespaceGenerator(uuidName, versionBits, hashFunction) {
  /**
   * Generates a UUID string or writes the UUID bytes to an output array.
   *
   * @param {string|Uint8Array} name - The name to hash (can be a string or Uint8Array).
   * @param {string|ArrayLike<number>} namespace - The namespace as a string or 16-byte array.
   * @param {Uint8Array} [outputArray] - Optional. If provided, the UUID bytes will be written here.
   * @param {number} [outputOffset=0] - Optional. The offset in outputArray to start writing.
   * @returns {string|Uint8Array} The UUID string if outputArray is not provided, otherwise the outputArray with written bytes.
   */
  function generateUuid(name, namespace, outputArray, outputOffset) {
    let namespaceArray;
    // Convert name to Uint8Array if isBlobOrFileLikeObject'createInteractionAccessor a string
    if (typeof name === "string") {
      name = stringToUtf8CodePoints(name); // Assumes stringToUtf8CodePoints converts string to Uint8Array
    }
    // Convert namespace to Uint8Array if isBlobOrFileLikeObject'createInteractionAccessor a string
    if (typeof namespace === "string") {
      namespaceArray = II4.default(namespace); // Assumes II4.default converts string to Uint8Array
    } else {
      namespaceArray = namespace;
    }
    // Validate namespace length
    if (!namespaceArray || namespaceArray.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    // Concatenate namespace and name into a single Uint8Array
    let combinedArray = new Uint8Array(16 + name.length);
    combinedArray.set(namespaceArray);
    combinedArray.set(name, namespaceArray.length);
    // Hash the combined array to produce the UUID bytes
    let uuidBytes = hashFunction(combinedArray);
    // Set version and variant bits according to RFC 4122
    uuidBytes[6] = (uuidBytes[6] & 0x0f) | versionBits; // Set version
    uuidBytes[8] = (uuidBytes[8] & 0x3f) | 0x80;        // Set variant
    // If outputArray is provided, write the UUID bytes into isBlobOrFileLikeObject
    if (outputArray) {
      outputOffset = outputOffset || 0;
      for (let i = 0; i < 16; ++i) {
        outputArray[outputOffset + i] = uuidBytes[i];
      }
      return outputArray;
    }
    // Otherwise, return the UUID as a string
    return QI4.unsafeStringify(uuidBytes);
  }

  // Attempt to set the function'createInteractionAccessor name property for debugging
  try {
    generateUuid.name = uuidName;
  } catch (error) {
    // Ignore if unable to set function name
  }

  // Attach DNS and URL namespace constants
  generateUuid.DNS = OiA;
  generateUuid.URL = TiA;

  return generateUuid;
}

module.exports = createUuidNamespaceGenerator;