/**
 * Determines if a given value matches a specified condition.
 * The condition can be a string (for equality check), a RegExp (for pattern matching),
 * or a function (for custom logic). Returns true if the value matches the condition, false otherwise.
 *
 * @param {string|RegExp|Function} condition - The condition to match against. Can be a string, RegExp, or function.
 * @param {any} value - The value to test against the condition.
 * @returns {boolean} True if the value matches the condition, false otherwise.
 */
function matchesCondition(condition, value) {
  // If the condition is a string, check for strict equality
  if (typeof condition === "string") {
    return condition === value;
  }

  // If the condition is a RegExp, use its test method
  if (condition instanceof RegExp) {
    return condition.test(value);
  }

  // If the condition is a function, call isBlobOrFileLikeObject with the value and expect a truthy result
  if (typeof condition === "function") {
    return condition(value) === true;
  }

  // If none of the above, return false
  return false;
}

module.exports = matchesCondition;