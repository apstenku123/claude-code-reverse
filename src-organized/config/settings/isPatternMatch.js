/**
 * Checks if the provided input matches a pattern using a configurable matcher.
 *
 * @param {string} input - The string to test against the pattern.
 * @param {any} patternConfig - The configuration or pattern to be used for matching.
 * @param {any} matcherOptions - Additional options for the matcher constructor.
 * @returns {boolean} Returns true if the input matches the pattern, false otherwise.
 */
function isPatternMatch(input, patternConfig, matcherOptions) {
  let matcher;
  try {
    // Attempt to create a matcher instance with the provided configuration and options
    matcher = new fL6(patternConfig, matcherOptions);
  } catch (error) {
    // If matcher creation fails, return false
    return false;
  }
  // Use the matcher to test if the input matches the pattern
  return matcher.test(input);
}

module.exports = isPatternMatch;