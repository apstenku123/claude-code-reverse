/**
 * Checks if the provided input string matches either the primary or secondary regular expression pattern.
 *
 * @param {string} inputString - The string to test against the patterns.
 * @returns {boolean} True if the input matches either pattern; otherwise, false.
 */
function matchesPrimaryOrSecondaryPattern(inputString) {
  // Test input against the primary pattern
  const matchesPrimaryPattern = primaryPatternRegex.test(inputString);
  // Test input against the secondary pattern
  const matchesSecondaryPattern = secondaryPatternRegex.test(inputString);

  // Return true if input matches either pattern
  return matchesPrimaryPattern || matchesSecondaryPattern;
}

module.exports = matchesPrimaryOrSecondaryPattern;