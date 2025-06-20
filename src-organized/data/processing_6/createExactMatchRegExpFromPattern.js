/**
 * Creates a regular expression that matches a string exactly as transformed by getTimeRegexPattern.
 *
 * @param {string} pattern - The input pattern to be transformed and matched exactly.
 * @returns {RegExp} a regular expression that matches the transformed pattern exactly.
 */
function createExactMatchRegExpFromPattern(pattern) {
  // Transform the input pattern using getTimeRegexPattern(assumed to sanitize or escape the pattern)
  const transformedPattern = getTimeRegexPattern(pattern);
  // Create a RegExp that matches the entire string exactly
  return new RegExp(`^${transformedPattern}$`);
}

module.exports = createExactMatchRegExpFromPattern;
