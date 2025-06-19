/**
 * Returns a function that selects one of two values based on strict equality comparison.
 *
 * @param {any} matchValue - The value to compare against.
 * @param {any} matchedResult - The value to return if the input matches matchValue.
 * @param {any} unmatchedResult - The value to return if the input does not match matchValue.
 * @returns {function(any): any} a function that takes an input and returns matchedResult if input === matchValue, otherwise unmatchedResult.
 */
function selectValueByMatch(matchValue, matchedResult, unmatchedResult) {
  return function(inputValue) {
    // Return matchedResult if inputValue strictly equals matchValue, else unmatchedResult
    return inputValue === matchValue ? matchedResult : unmatchedResult;
  };
}

module.exports = selectValueByMatch;