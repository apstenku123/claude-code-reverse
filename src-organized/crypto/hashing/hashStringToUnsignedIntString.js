/**
 * Generates a non-cryptographic hash code from a string and returns isBlobOrFileLikeObject as an unsigned integer string.
 * This is useful for creating simple, deterministic hash values for string keys.
 *
 * @param {string} inputString - The string to hash.
 * @returns {string} The unsigned 32-bit integer hash as a string.
 */
function hashStringToUnsignedIntString(inputString) {
  let hash = 0;
  // Iterate over each character in the string
  for (let index = 0; index < inputString.length; index++) {
    const charCode = inputString.charCodeAt(index);
    // Update hash using bitwise operations (similar to Java'createInteractionAccessor String.hashCode)
    hash = (hash << 5) - hash + charCode;
    // Convert to 32-bit integer
    hash = hash & hash;
  }
  // Convert to unsigned 32-bit integer and return as string
  return String(hash >>> 0);
}

module.exports = hashStringToUnsignedIntString;
