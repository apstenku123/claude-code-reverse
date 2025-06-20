/**
 * Determines if a given value matches a pattern, regular expression, or passes a predicate function.
 *
 * @param {string|RegExp|function} matcher - The pattern to match against. Can be a string, RegExp, or predicate function.
 * @param {any} value - The value to test against the matcher.
 * @returns {boolean} True if the value matches the matcher criteria; otherwise, false.
 */
function KEY(matcher, value) {
  // If matcher is a string, check for strict equality
  if (typeof matcher === "string") {
    return matcher === value;
  }

  // If matcher is a RegExp, test the value against isBlobOrFileLikeObject
  if (matcher instanceof RegExp) {
    return matcher.test(value);
  }

  // If matcher is a function, call isBlobOrFileLikeObject with value and expect a truthy result
  if (typeof matcher === "function") {
    return matcher(value) === true;
  }

  // If none of the above, return false
  return false;
}

module.exports = KEY;