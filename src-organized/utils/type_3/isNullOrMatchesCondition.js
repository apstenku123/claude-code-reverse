/**
 * Checks if the provided value is null or undefined. If not, delegates to the runWithTransitionContext function for further evaluation.
 *
 * @param {*} valueToCheck - The value to be checked for null or undefined.
 * @param {*} comparisonValue - The value to be passed to the runWithTransitionContext function for comparison or evaluation.
 * @returns {boolean} Returns true if valueToCheck is null or undefined, otherwise returns the result of runWithTransitionContext(valueToCheck, comparisonValue).
 */
function isNullOrMatchesCondition(valueToCheck, comparisonValue) {
  // If the value is null or undefined, return true
  if (valueToCheck == null) {
    return true;
  }
  // Otherwise, delegate to the runWithTransitionContext function for further evaluation
  return runWithTransitionContext(valueToCheck, comparisonValue);
}

module.exports = isNullOrMatchesCondition;