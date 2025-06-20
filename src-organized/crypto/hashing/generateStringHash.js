/**
 * Generates a 32-bit unsigned integer hash from a given string using a simple hashing algorithm.
 * This can be used for quick, non-cryptographic hash generation (e.g., for hash tables or cache keys).
 *
 * @param {string} inputString - The string to hash.
 * @returns {number} The resulting 32-bit unsigned integer hash value.
 */
function generateStringHash(inputString) {
  let hash = 0;
  // Iterate over each character in the string
  for (let charIndex = 0; charIndex < inputString.length; charIndex++) {
    // Get the Unicode code point of the current character
    const charCode = inputString.charCodeAt(charIndex);
    // Update the hash using bitwise and arithmetic operations
    // Equivalent to: hash = hash * 31 + charCode, but using bitwise for speed
    hash = (hash << 5) - hash + charCode;
    // Ensure hash stays within 32-bit integer range
    hash &= hash;
  }
  // Convert to unsigned 32-bit integer before returning
  return hash >>> 0;
}

module.exports = generateStringHash;