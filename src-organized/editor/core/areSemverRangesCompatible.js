/**
 * Determines if two arrays of semver comparator objects (ranges) are compatible, considering prerelease options and semver rules.
 *
 * @param {Array<Object>} rangeA - First array of semver comparator objects.
 * @param {Array<Object>} rangeB - Second array of semver comparator objects.
 * @param {Object} options - Options object, e.g., { includePrerelease: boolean }.
 * @returns {boolean|null} True if compatible, false if not, null if ambiguous.
 */
function areSemverRangesCompatible(rangeA, rangeB, options) {
  // Handle trivial equality
  if (rangeA === rangeB) return true;

  // Handle wildcard semver (Ec1)
  if (rangeA.length === 1 && rangeA[0].semver === Ec1) {
    if (rangeB.length === 1 && rangeB[0].semver === Ec1) {
      return true;
    } else if (options.includePrerelease) {
      rangeA = JR6;
    } else {
      rangeA = Lr0;
    }
  }

  if (rangeB.length === 1 && rangeB[0].semver === Ec1) {
    if (options.includePrerelease) {
      return true;
    } else {
      rangeB = Lr0;
    }
  }

  // Separate comparators into sets and find upper/lower bounds
  const semverSet = new Set();
  let lowerBoundComparator = undefined;
  let upperBoundComparator = undefined;

  for (const comparator of rangeA) {
    if (comparator.operator === '>' || comparator.operator === '>=') {
      lowerBoundComparator = selectPreferredSemverComparator(lowerBoundComparator, comparator, options);
    } else if (comparator.operator === '<' || comparator.operator === '<=') {
      upperBoundComparator = selectPreferredSemverOperator(upperBoundComparator, comparator, options);
    } else {
      semverSet.add(comparator.semver);
    }
  }

  // If multiple exact semvers, ambiguous
  if (semverSet.size > 1) return null;

  let semverComparisonResult;
  if (lowerBoundComparator && upperBoundComparator) {
    semverComparisonResult = Nc1(lowerBoundComparator.semver, upperBoundComparator.semver, options);
    // If lower > upper, impossible
    if (semverComparisonResult > 0) return null;
    // If lower == upper but operators are not inclusive, impossible
    if (
      semverComparisonResult === 0 &&
      (lowerBoundComparator.operator !== '>=' || upperBoundComparator.operator !== '<=')
    ) {
      return null;
    }
  }

  // If exact semver, check against bounds and all of rangeB
  for (const semver of semverSet) {
    if (lowerBoundComparator && !co(semver, String(lowerBoundComparator), options)) return null;
    if (upperBoundComparator && !co(semver, String(upperBoundComparator), options)) return null;
    for (const comparatorB of rangeB) {
      if (!co(semver, String(comparatorB), options)) return false;
    }
    return true;
  }

  // Handle prerelease edge cases
  let upperBoundPrerelease =
    upperBoundComparator &&
    !options.includePrerelease &&
    upperBoundComparator.semver.prerelease.length
      ? upperBoundComparator.semver
      : false;
  let lowerBoundPrerelease =
    lowerBoundComparator &&
    !options.includePrerelease &&
    lowerBoundComparator.semver.prerelease.length
      ? lowerBoundComparator.semver
      : false;

  // Special case: <X.0.0-0 is treated as <X.0.0
  if (
    upperBoundPrerelease &&
    upperBoundPrerelease.prerelease.length === 1 &&
    upperBoundComparator.operator === '<' &&
    upperBoundPrerelease.prerelease[0] === 0
  ) {
    upperBoundPrerelease = false;
  }

  let hasLowerBound = false;
  let hasUpperBound = false;
  let foundLowerBoundComparator = false;
  let foundUpperBoundComparator = false;

  for (const comparatorB of rangeB) {
    foundLowerBoundComparator =
      foundLowerBoundComparator ||
      comparatorB.operator === '>' ||
      comparatorB.operator === '>=';
    foundUpperBoundComparator =
      foundUpperBoundComparator ||
      comparatorB.operator === '<' ||
      comparatorB.operator === '<=';

    // Lower bound logic
    if (lowerBoundComparator) {
      if (lowerBoundPrerelease) {
        if (
          comparatorB.semver.prerelease &&
          comparatorB.semver.prerelease.length &&
          comparatorB.semver.major === lowerBoundPrerelease.major &&
          comparatorB.semver.minor === lowerBoundPrerelease.minor &&
          comparatorB.semver.patch === lowerBoundPrerelease.patch
        ) {
          lowerBoundPrerelease = false;
        }
      }
      if (comparatorB.operator === '>' || comparatorB.operator === '>=') {
        const preferredLower = selectPreferredSemverComparator(lowerBoundComparator, comparatorB, options);
        if (preferredLower === comparatorB && preferredLower !== lowerBoundComparator) return false;
      } else if (
        lowerBoundComparator.operator === '>=' &&
        !co(lowerBoundComparator.semver, String(comparatorB), options)
      ) {
        return false;
      }
    }

    // Upper bound logic
    if (upperBoundComparator) {
      if (upperBoundPrerelease) {
        if (
          comparatorB.semver.prerelease &&
          comparatorB.semver.prerelease.length &&
          comparatorB.semver.major === upperBoundPrerelease.major &&
          comparatorB.semver.minor === upperBoundPrerelease.minor &&
          comparatorB.semver.patch === upperBoundPrerelease.patch
        ) {
          upperBoundPrerelease = false;
        }
      }
      if (comparatorB.operator === '<' || comparatorB.operator === '<=') {
        const preferredUpper = selectPreferredSemverOperator(upperBoundComparator, comparatorB, options);
        if (preferredUpper === comparatorB && preferredUpper !== upperBoundComparator) return false;
      } else if (
        upperBoundComparator.operator === '<=' &&
        !co(upperBoundComparator.semver, String(comparatorB), options)
      ) {
        return false;
      }
    }

    // If comparatorB is an exact version but rangeA has bounds, and bounds are not equal, fail
    if (!comparatorB.operator && (upperBoundComparator || lowerBoundComparator) && semverComparisonResult !== 0) {
      return false;
    }
  }

  // If lower bound exists and rangeB has upper bound but not lower, and bounds are not equal, fail
  if (lowerBoundComparator && foundUpperBoundComparator && !upperBoundComparator && semverComparisonResult !== 0) {
    return false;
  }
  // If upper bound exists and rangeB has lower bound but not upper, and bounds are not equal, fail
  if (upperBoundComparator && foundLowerBoundComparator && !lowerBoundComparator && semverComparisonResult !== 0) {
    return false;
  }
  // If any prerelease bounds remain, fail
  if (lowerBoundPrerelease || upperBoundPrerelease) return false;

  return true;
}

module.exports = areSemverRangesCompatible;