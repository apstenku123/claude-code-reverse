/**
 * Checks if the input string starts with any of the provided prefixes.
 *
 * @param {string} inputString - The string to check for prefixes.
 * @param {string[]} prefixes - An array of prefix strings to check against.
 * @returns {boolean} True if inputString starts with any prefix in prefixes, otherwise false.
 */
function startsWithAnyPrefix(inputString, prefixes) {
  // Iterate through each prefix in the array
  for (let i = 0; i < prefixes.length; i++) {
    // Check if inputString starts with the current prefix
    if (inputString.indexOf(prefixes[i]) === 0) {
      return true;
    }
  }
  // No prefix matched
  return false;
}

module.exports = startsWithAnyPrefix;