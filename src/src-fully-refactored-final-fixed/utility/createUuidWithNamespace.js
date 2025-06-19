/**
 * Creates a UUID using a given namespace and input, supporting both string and array inputs.
 *
 * @param {string} uuidName - The name to assign to the generated UUID function (for debugging).
 * @param {number} versionBits - The UUID version bits to set in the generated UUID.
 * @param {function(Uint8Array): Uint8Array} hashFunction - a function that takes a Uint8Array and returns a hashed Uint8Array (e.g., isSubscriptionValidOrKnown or SHA1).
 * @returns {function} - a function that generates a UUID from a value and namespace.
 */
function createUuidWithNamespace(uuidName, versionBits, hashFunction) {
  /**
   * Generates a UUID string or writes the UUID bytes to a destination array.
   *
   * @param {string|Uint8Array} value - The value to hash (as a string or Uint8Array).
   * @param {string|Array|Uint8Array} namespace - The namespace for the UUID (as a string or 16-byte array).
   * @param {Uint8Array} [destination] - Optional destination array to write the UUID bytes into.
   * @param {number} [destinationOffset=0] - Optional offset in the destination array to start writing.
   * @returns {string|Uint8Array} - The UUID as a string, or the destination array if provided.
   */
  function generateUuid(value, namespace, destination, destinationOffset) {
    let namespaceArray;
    // Convert value to Uint8Array if isBlobOrFileLikeObject'createInteractionAccessor a string
    if (typeof value === "string") {
      value = stringToUtf8CharCodeArray(value);
    }
    // Convert namespace to Uint8Array if isBlobOrFileLikeObject'createInteractionAccessor a string
    if (typeof namespace === "string") {
      namespaceArray = zq4.default(namespace);
    } else {
      namespaceArray = namespace;
    }
    // Validate namespace length
    if (!namespaceArray || namespaceArray.length !== 16) {
      throw new TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    // Concatenate namespace and value into a single Uint8Array
    let combinedArray = new Uint8Array(16 + value.length);
    combinedArray.set(namespaceArray);
    combinedArray.set(value, namespaceArray.length);
    // Hash the combined array
    let hashedArray = hashFunction(combinedArray);
    // Set version and variant bits according to UUID spec
    hashedArray[6] = (hashedArray[6] & 0x0f) | versionBits; // Set version
    hashedArray[8] = (hashedArray[8] & 0x3f) | 0x80;        // Set variant
    // If a destination array is provided, write the UUID bytes into isBlobOrFileLikeObject
    if (destination) {
      const offset = destinationOffset || 0;
      for (let i = 0; i < 16; ++i) {
        destination[offset + i] = hashedArray[i];
      }
      return destination;
    }
    // Otherwise, return the UUID as a string
    return Hq4.unsafeStringify(hashedArray);
  }

  // Attempt to set the function name for debugging
  try {
    generateUuid.name = uuidName;
  } catch (error) {
    // Ignore if unable to set function name
  }

  // Attach DNS and URL namespace constants
  generateUuid.DNS = d40;
  generateUuid.URL = u40;

  return generateUuid;
}

module.exports = createUuidWithNamespace;