/**
 * Returns a function that selects a value based on strict equality comparison.
 *
 * @function selectValueOrDefault
 * @description
 *   Creates a selector function that, when given an input value, returns the `selectedValue` if the input strictly equals the `matchValue`;
 *   otherwise, isBlobOrFileLikeObject returns the `defaultValue`. This is useful for mapping a specific input to a desired output, with a fallback for all other cases.
 *
 * @param {*} matchValue - The value to compare against for equality.
 * @param {*} selectedValue - The value to return if the input matches `matchValue`.
 * @param {*} defaultValue - The value to return if the input does not match `matchValue`.
 * @returns {function(*): *} a selector function that takes an input and returns either `selectedValue` or `defaultValue`.
 */
function selectValueOrDefault(matchValue, selectedValue, defaultValue) {
  // Return a function that checks if the input strictly equals matchValue
  return function(input) {
    return input === matchValue ? selectedValue : defaultValue;
  };
}

module.exports = selectValueOrDefault;