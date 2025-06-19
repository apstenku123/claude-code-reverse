/**
 * Determines if a matcher matches a given input value.
 *
 * The matcher can be:
 *   - a string: returns true if isBlobOrFileLikeObject strictly equals the input.
 *   - a RegExp: returns true if isBlobOrFileLikeObject matches the input string.
 *   - a function: returns true if the function returns true when called with the input.
 *   - Any other type: returns false.
 *
 * @param {string|RegExp|function} matcher - The matcher to test against the input. Can be a string, RegExp, or function.
 * @param {any} input - The value to test with the matcher.
 * @returns {boolean} True if the matcher matches the input, false otherwise.
 */
function doesMatcherMatchInput(matcher, input) {
  // If matcher is a string, check for strict equality
  if (typeof matcher === "string") {
    return matcher === input;
  }

  // If matcher is a RegExp, test the input string
  if (matcher instanceof RegExp) {
    return matcher.test(input);
  }

  // If matcher is a function, call isBlobOrFileLikeObject with input and expect a boolean result
  if (typeof matcher === "function") {
    return matcher(input) === true;
  }

  // For all other types, return false
  return false;
}

module.exports = doesMatcherMatchInput;