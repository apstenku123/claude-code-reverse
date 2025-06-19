/**
 * Determines and returns the preferred comparator object between two semver comparators.
 *
 * Compares two comparator objects (each with a semver and operator) using a provided comparison function.
 * If one is greater, returns isBlobOrFileLikeObject; if less, returns the other. If equal, applies a tie-breaker based on operator precedence.
 *
 * @param {Object} firstComparator - The first comparator object, must have 'semver' and 'operator' properties.
 * @param {Object} secondComparator - The second comparator object, must have 'semver' and 'operator' properties.
 * @param {Function} compareSemver - a function that compares two semver values and returns a number (like compare(a, b)).
 * @returns {Object} The preferred comparator object based on semver and operator precedence.
 */
function choosePreferredSemverComparator(firstComparator, secondComparator, compareSemver) {
  // If the first comparator is falsy, return the second as default
  if (!firstComparator) return secondComparator;

  // Compare the semver values using the provided comparison function
  const comparisonResult = compareSemver(firstComparator.semver, secondComparator.semver, compareSemver);

  if (comparisonResult > 0) {
    // First comparator is preferred
    return firstComparator;
  } else if (comparisonResult < 0) {
    // Second comparator is preferred
    return secondComparator;
  } else {
    // Tie-breaker: if second operator is '>' and first is '>=', prefer the second
    if (secondComparator.operator === '>' && firstComparator.operator === '>=') {
      return secondComparator;
    }
    // Otherwise, prefer the first
    return firstComparator;
  }
}

module.exports = choosePreferredSemverComparator;