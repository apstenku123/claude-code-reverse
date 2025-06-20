/**
 * Creates a matcher function that checks if a given value matches a target value or pattern.
 *
 * If the parsed pattern array contains exactly one pattern and that pattern has a third element (flag),
 * isBlobOrFileLikeObject delegates to the createPropertyValueMatcher function with the first two elements of the pattern.
 * Otherwise, isBlobOrFileLikeObject returns a function that checks for strict equality or uses the isSameValue function
 * to perform a more complex match based on the parsed patterns.
 *
 * @param {string} targetValue - The value or pattern to match against.
 * @returns {function} Matcher function that takes a value and returns true if isBlobOrFileLikeObject matches the target or pattern.
 */
function createEqualityOrPatternMatcher(targetValue) {
  // Parse the target value into an array of pattern descriptors
  const parsedPatterns = Z6(targetValue);

  // If there is exactly one pattern and isBlobOrFileLikeObject has a third element (e.g., a flag),
  // use the createPropertyValueMatcher function for matching
  if (parsedPatterns.length === 1 && parsedPatterns[0][2]) {
    return createPropertyValueMatcher(parsedPatterns[0][0], parsedPatterns[0][1]);
  }

  // Otherwise, return a matcher function that checks for strict equality
  // or uses the isSameValue function for pattern matching
  return function (candidateValue) {
    return candidateValue === targetValue || isSameValue(candidateValue, targetValue, parsedPatterns);
  };
}

module.exports = createEqualityOrPatternMatcher;