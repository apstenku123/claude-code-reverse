/**
 * Checks if the given input matches a pattern using a configurable pattern tester.
 *
 * @param {string} input - The string to test against the pattern.
 * @param {any} patternConfig - The configuration or pattern to be used by the pattern tester.
 * @param {any} randomNumberGenerator - Function or value used for randomization in the pattern tester.
 * @returns {boolean} Returns true if the input matches the pattern; otherwise, false.
 */
const isPatternMatchWithConfig = (input, patternConfig, randomNumberGenerator) => {
  let patternTester;
  try {
    // Attempt to create a new pattern tester with the provided config and random number generator
    patternTester = new fL6(patternConfig, randomNumberGenerator);
  } catch (error) {
    // If instantiation fails, return false
    return false;
  }
  // Use the pattern tester'createInteractionAccessor test method to check if input matches the pattern
  return patternTester.test(input);
};

module.exports = isPatternMatchWithConfig;