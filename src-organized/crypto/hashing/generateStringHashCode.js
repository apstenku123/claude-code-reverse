/**
 * Generates a non-negative 32-bit integer hash code from a given string.
 * This is useful for quickly producing a deterministic hash for string values,
 * such as for caching, lookup, or fingerprinting purposes.
 *
 * @param {string} inputString - The string to hash.
 * @returns {number} a non-negative 32-bit integer hash code derived from the input string.
 */
function generateStringHashCode(inputString) {
  let hash = 0;
  // Iterate over each character in the string
  for (let index = 0; index < inputString.length; index++) {
    // Get the Unicode code point of the current character
    const charCode = inputString.charCodeAt(index);
    // Update the hash using a common hashing algorithm:
    // hash = hash * 31 + charCode, implemented as (hash << 5) - hash + charCode
    hash = (hash << 5) - hash + charCode;
    // Force hash to a 32-bit integer
    hash &= hash;
  }
  // Convert to an unsigned 32-bit integer before returning
  return hash >>> 0;
}

module.exports = generateStringHashCode;