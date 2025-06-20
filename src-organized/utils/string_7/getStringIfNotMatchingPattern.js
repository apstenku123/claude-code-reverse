/**
 * Checks if the provided input string matches a specific pattern (uT6).
 * If the pattern matches, returns an empty string; otherwise, returns the input string unchanged.
 *
 * @param {any} sourceObservable - (Unused) Source observable or context, not used in this function.
 * @param {string} inputString - The string to be tested against the pattern.
 * @returns {string} Returns an empty string if inputString matches the pattern; otherwise, returns inputString.
 */
function getStringIfNotMatchingPattern(sourceObservable, inputString) {
  // If inputString matches the uT6 pattern, return an empty string
  if (uT6.test(inputString)) {
    return "";
  }
  // Otherwise, return the original inputString
  return inputString;
}

module.exports = getStringIfNotMatchingPattern;