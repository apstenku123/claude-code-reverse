/**
 * Selects the preferred semver operator object between two candidates based on their semver values and operators.
 *
 * @param {Object} firstOperator - The first semver operator object, must have 'semver' and 'operator' properties.
 * @param {Object} secondOperator - The second semver operator object, must have 'semver' and 'operator' properties.
 * @param {Object} comparisonOptions - Options to pass to the semver comparison function.
 * @returns {Object} The preferred semver operator object based on comparison logic.
 */
function selectPreferredSemverOperator(firstOperator, secondOperator, comparisonOptions) {
  // If the first operator is falsy, return the second operator as the default
  if (!firstOperator) return secondOperator;

  // Compare the semver values using the external Nc1 function
  const semverComparisonResult = Nc1(firstOperator.semver, secondOperator.semver, comparisonOptions);

  // If first semver is less than second, return first; if greater, return second
  if (semverComparisonResult < 0) {
    return firstOperator;
  } else if (semverComparisonResult > 0) {
    return secondOperator;
  }

  // If semvers are equal, prefer the more restrictive operator
  // If second operator is '<' and first is '<=', return second (more restrictive)
  if (secondOperator.operator === '<' && firstOperator.operator === '<=') {
    return secondOperator;
  }

  // Otherwise, return the first operator
  return firstOperator;
}

module.exports = selectPreferredSemverOperator;