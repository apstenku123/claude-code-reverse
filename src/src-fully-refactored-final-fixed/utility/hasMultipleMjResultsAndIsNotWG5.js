/**
 * Checks if the result of the processRedirectionOperators function for the given input has more than one element
 * and that the input does not satisfy the isValidParsedCommand condition.
 *
 * @param {string} sourceObservable - The input value to be checked.
 * @returns {boolean} True if processRedirectionOperators(sourceObservable) returns more than one element and isValidParsedCommand(sourceObservable) is false; otherwise, false.
 */
function hasMultipleMjResultsAndIsNotWG5(sourceObservable) {
  // Get the result array from processRedirectionOperators for the given input
  const mjResults = processRedirectionOperators(sourceObservable);

  // Return true if there is more than one result and isValidParsedCommand returns false
  return mjResults.length > 1 && !isValidParsedCommand(sourceObservable);
}

module.exports = hasMultipleMjResultsAndIsNotWG5;