/**
 * Determines if the string representation of the given source value matches any pattern in the provided patterns array.
 * If the patterns array is missing or empty, the function returns true by default.
 *
 * @param {any} sourceValue - The value to be converted to a string and checked against the patterns.
 * @param {string[]} patterns - An array of string patterns to match against the source value.
 * @returns {boolean} True if the patterns array is missing/empty or if the string representation of sourceValue matches any pattern; otherwise, false.
 */
function doesStringMatchAnyPattern(sourceValue, patterns) {
  // If patterns is missing or empty, return true by default
  if (!patterns || !patterns.length) {
    return true;
  }

  // Convert the source value to a string using extractStackFramesFromEvent(assumed utility function)
  const stringToCheck = extractStackFramesFromEvent(sourceValue);

  // If the string conversion fails (null/undefined/empty), return true by default
  if (!stringToCheck) {
    return true;
  }

  // Use ZI.stringMatchesSomePattern to check if the string matches any pattern in the array
  return ZI.stringMatchesSomePattern(stringToCheck, patterns);
}

module.exports = doesStringMatchAnyPattern;