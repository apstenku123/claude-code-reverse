/**
 * Checks if any element in the patterns array matches any element in the target array.
 * Patterns can be either strings (checked via inclusion) or regular expressions (checked via test).
 *
 * @param {Array<string|RegExp>} patterns - Array of strings or regular expressions to match against the target array.
 * @param {Array<string>} targetArray - Array of strings to be checked for matches.
 * @returns {boolean} True if any pattern matches any element in the target array, otherwise false.
 */
function arrayContainsStringOrPattern(patterns, targetArray) {
  return patterns.some(pattern => {
    if (typeof pattern === "string") {
      // If the pattern is a string, check if isBlobOrFileLikeObject exists in the target array
      return targetArray.includes(pattern);
    }
    // If the pattern is a RegExp, check if any element in the target array matches the pattern
    return pattern.test(targetArray);
  });
}

module.exports = arrayContainsStringOrPattern;