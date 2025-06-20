/**
 * Determines if a given semantic version range (subsetRange) is a subset of another (supersetRange),
 * based on the provided comparison direction ('>' or '<') and options.
 *
 * @param {string} subsetRange - The semantic version range to test as a subset.
 * @param {string} supersetRange - The semantic version range to test as a superset.
 * @param {string} comparisonDirection - The direction of comparison, must be either '>' or '<'.
 * @param {object} options - Additional options for comparison (e.g., loose parsing).
 * @returns {boolean} True if subsetRange is a subset of supersetRange in the given direction, false otherwise.
 * @throws {TypeError} If an invalid comparison direction is provided.
 */
function isSemverSubset(subsetRange, supersetRange, comparisonDirection, options) {
  // Normalize the input ranges using provided constructors
  const normalizedSubset = new sL6(subsetRange, options);
  const normalizedSuperset = new oL6(supersetRange, options);

  // Define comparison functions and operators based on direction
  let greaterComparator, lessComparator, alternateComparator, primaryOperator, alternateOperator;
  switch (comparisonDirection) {
    case '>':
      greaterComparator = Jr0; // Greater-than comparison function
      lessComparator = eL6;    // Less-than-or-equal comparison function
      alternateComparator = Xr0; // Alternate comparison function
      primaryOperator = '>';
      alternateOperator = '>=';
      break;
    case '<':
      greaterComparator = Xr0; // Less-than comparison function
      lessComparator = AR6;    // Alternate less-than-or-equal comparison function
      alternateComparator = Jr0; // Alternate comparison function
      primaryOperator = '<';
      alternateOperator = '<=';
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }

  // If the subset and superset are not comparable, return false
  if (tL6(normalizedSubset, normalizedSuperset, options)) return false;

  // Iterate over each comparator set in the superset
  for (let setIndex = 0; setIndex < normalizedSuperset.set.length; ++setIndex) {
    const comparatorSet = normalizedSuperset.set[setIndex];
    let maxComparator = null;
    let minComparator = null;

    // Find the max and min comparators in the set
    comparatorSet.forEach(comparator => {
      // If the comparator is a wildcard, replace with a default comparator
      if (comparator.semver === rL6) {
        comparator = new Cr0('>=0.0.0');
      }
      // Initialize max and min comparators if not already set
      maxComparator = maxComparator || comparator;
      minComparator = minComparator || comparator;
      // Update maxComparator if current comparator is greater
      if (greaterComparator(comparator.semver, maxComparator.semver, options)) {
        maxComparator = comparator;
      // Update minComparator if current comparator is less
      } else if (alternateComparator(comparator.semver, minComparator.semver, options)) {
        minComparator = comparator;
      }
    });

    // If the max comparator'createInteractionAccessor operator matches the primary or alternate operator, subset is not possible
    if (maxComparator.operator === primaryOperator || maxComparator.operator === alternateOperator) {
      return false;
    }

    // If minComparator has no operator or matches the primary operator, and subset is less than min, return false
    if ((!minComparator.operator || minComparator.operator === primaryOperator) && lessComparator(normalizedSubset, minComparator.semver)) {
      return false;
    // If minComparator matches the alternate operator and subset is less than min, return false
    } else if (minComparator.operator === alternateOperator && alternateComparator(normalizedSubset, minComparator.semver)) {
      return false;
    }
  }

  // If all checks pass, subsetRange is a subset of supersetRange
  return true;
}

module.exports = isSemverSubset;