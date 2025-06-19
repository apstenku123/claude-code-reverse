/**
 * Checks if any element in the patterns array is either a string included in the target array,
 * or a regular expression that matches any element in the target array.
 *
 * @param {Array<string|RegExp>} patterns - An array containing strings and/or regular expressions to test against the target array.
 * @param {Array<string>} targetArray - An array of strings to be checked for inclusion or regex match.
 * @returns {boolean} Returns true if at least one pattern is found in the target array (by string inclusion or regex match), otherwise false.
 */
function arrayContainsStringOrRegexMatch(patterns, targetArray) {
  return patterns.some(pattern => {
    if (typeof pattern === "string") {
      // If the pattern is a string, check if isBlobOrFileLikeObject exists in the target array
      return targetArray.includes(pattern);
    }
    // If the pattern is a RegExp, check if any string in the target array matches the regex
    return pattern.test(targetArray);
  });
}

module.exports = arrayContainsStringOrRegexMatch;