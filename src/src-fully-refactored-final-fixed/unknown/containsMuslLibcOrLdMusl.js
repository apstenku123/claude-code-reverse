/**
 * Checks if the provided string contains references to musl libc or musl dynamic linker.
 *
 * @param {string} inputString - The string to check for musl-related substrings.
 * @returns {boolean} True if the string contains 'libc.musl-' or 'ld-musl-', otherwise false.
 */
const containsMuslLibcOrLdMusl = (inputString) => {
  // Check if the string contains 'libc.musl-' or 'ld-musl-'
  return inputString.includes("libc.musl-") || inputString.includes("ld-musl-");
};

module.exports = containsMuslLibcOrLdMusl;
