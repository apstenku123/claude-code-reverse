/**
 * Selects the preferred comparator object between two semver comparators based on their precedence and operator.
 *
 * @param {Object} firstComparator - The first comparator object, containing 'semver' and 'operator' properties.
 * @param {Object} secondComparator - The second comparator object, containing 'semver' and 'operator' properties.
 * @param {Object} comparisonOptions - Options to be passed to the semver comparison function.
 * @returns {Object} The preferred comparator object based on semver precedence and operator rules.
 */
function selectPreferredSemverComparator(firstComparator, secondComparator, comparisonOptions) {
  // If the first comparator is falsy, return the second comparator
  if (!firstComparator) return secondComparator;

  // Compare the semver values using the external Nc1 function
  const semverComparisonResult = Nc1(firstComparator.semver, secondComparator.semver, comparisonOptions);

  if (semverComparisonResult > 0) {
    // firstComparator has higher precedence
    return firstComparator;
  } else if (semverComparisonResult < 0) {
    // secondComparator has higher precedence
    return secondComparator;
  } else {
    // If semver values are equal, prefer the comparator with operator '>' over '>='
    if (secondComparator.operator === '>' && firstComparator.operator === '>=') {
      return secondComparator;
    }
    // Otherwise, return the first comparator
    return firstComparator;
  }
}

module.exports = selectPreferredSemverComparator;