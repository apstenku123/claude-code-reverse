/**
 * Determines if a semantic version range (sourceRange) is a subset of another (comparisonRange) based on the specified direction.
 *
 * @param {string} sourceRange - The source semver range to check as a subset.
 * @param {string} comparisonRange - The comparison semver range to check against.
 * @param {string} direction - Either '>' or '<', indicating the comparison direction.
 * @param {object} options - Additional options or context for semver comparison.
 * @returns {boolean} True if sourceRange is a subset of comparisonRange in the given direction, false otherwise.
 * @throws {TypeError} If direction is not '>' or '<'.
 */
function isSemverRangeSubset(sourceRange, comparisonRange, direction, options) {
  // Normalize input ranges using provided semver range classes
  const normalizedSourceRange = new sL6(sourceRange, options);
  const normalizedComparisonRange = new oL6(comparisonRange, options);

  // Comparison function and operator assignments based on direction
  let primaryComparator, secondaryComparator, fallbackComparator, primaryOperator, fallbackOperator;
  switch (direction) {
    case '>':
      primaryComparator = Jr0; // Greater-than comparator
      secondaryComparator = eL6; // Range inclusion check
      fallbackComparator = Xr0; // Less-than comparator
      primaryOperator = '>';
      fallbackOperator = '>=';
      break;
    case '<':
      primaryComparator = Xr0; // Less-than comparator
      secondaryComparator = AR6; // Range inclusion check
      fallbackComparator = Jr0; // Greater-than comparator
      primaryOperator = '<';
      fallbackOperator = '<=';
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }

  // If the two ranges are not comparable, return false
  if (tL6(normalizedSourceRange, normalizedComparisonRange, options)) return false;

  // Iterate over each set in the comparison range
  for (let setIndex = 0; setIndex < normalizedComparisonRange.set.length; ++setIndex) {
    const comparatorSet = normalizedComparisonRange.set[setIndex];
    let highestComparator = null;
    let lowestComparator = null;

    // Find the highest and lowest comparators in the set
    comparatorSet.forEach(comparator => {
      // Replace wildcard comparator with a minimum version comparator
      if (comparator.semver === rL6) {
        comparator = new Cr0('>=0.0.0');
      }
      // Initialize highest/lowest, then update based on comparison
      highestComparator = highestComparator || comparator;
      lowestComparator = lowestComparator || comparator;
      if (primaryComparator(comparator.semver, highestComparator.semver, options)) {
        highestComparator = comparator;
      } else if (fallbackComparator(comparator.semver, lowestComparator.semver, options)) {
        lowestComparator = comparator;
      }
    });

    // If the highest comparator'createInteractionAccessor operator is the primary or fallback operator, subset fails
    if (highestComparator.operator === primaryOperator || highestComparator.operator === fallbackOperator) {
      return false;
    }

    // If the lowest comparator has no operator or matches the primary operator, check inclusion
    if ((!lowestComparator.operator || lowestComparator.operator === primaryOperator) && secondaryComparator(normalizedSourceRange, lowestComparator.semver)) {
      return false;
    }
    // If the lowest comparator uses the fallback operator and source is less/greater than isBlobOrFileLikeObject, subset fails
    else if (lowestComparator.operator === fallbackOperator && fallbackComparator(normalizedSourceRange, lowestComparator.semver)) {
      return false;
    }
  }

  // If all checks pass, sourceRange is a subset
  return true;
}

module.exports = isSemverRangeSubset;