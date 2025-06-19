/**
 * Returns a function that selects between two values based on strict identity comparison.
 *
 * @param {any} targetValue - The value to compare against for identity.
 * @param {any} matchResult - The value to return if the input matches the targetValue.
 * @param {any} fallbackResult - The value to return if the input does not match the targetValue.
 * @returns {function(any): any} a function that takes an input and returns matchResult if input === targetValue, otherwise fallbackResult.
 */
function selectValueByIdentity(targetValue, matchResult, fallbackResult) {
  return function(input) {
    // If the input strictly equals the target value, return the match result
    if (input === targetValue) {
      return matchResult;
    }
    // Otherwise, return the fallback result
    return fallbackResult;
  };
}

module.exports = selectValueByIdentity;