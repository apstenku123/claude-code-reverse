/**
 * Generates a hash code for a given string using a bitwise algorithm.
 * The hash is computed by iterating over each character in the string,
 * applying a left shift and subtraction, and then combining with the character code.
 * The result is returned as an unsigned 32-bit integer in string format.
 *
 * @param {string} inputString - The string to hash.
 * @returns {string} The unsigned 32-bit hash code as a string.
 */
function stringHashCode(inputString) {
  let hash = 0;
  for (let index = 0; index < inputString.length; index++) {
    const charCode = inputString.charCodeAt(index);
    // Equivalent to: hash = hash * 31 + charCode, but using bitwise for speed
    hash = (hash << 5) - hash + charCode;
    // Force hash to 32 bits
    hash = hash & hash;
  }
  // Convert to unsigned 32-bit integer and return as string
  return String(hash >>> 0);
}

module.exports = stringHashCode;
