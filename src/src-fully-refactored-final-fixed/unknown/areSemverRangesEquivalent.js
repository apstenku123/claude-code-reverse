/**
 * Determines if two arrays of semver comparator objects (ranges) are equivalent under given options.
 * Handles special cases for ANY version, prerelease inclusion, and complex semver operator logic.
 *
 * @param {Array<Object>} rangeA - First array of semver comparator objects.
 * @param {Array<Object>} rangeB - Second array of semver comparator objects.
 * @param {Object} options - Options object, e.g., { includePrerelease: boolean }.
 * @returns {boolean|null} True if ranges are equivalent, false if not, null if indeterminate.
 */
function areSemverRangesEquivalent(rangeA, rangeB, options) {
  // Special constant representing ANY version
  const ANY_SEMVER = Ec1;
  // Default ranges for ANY version
  const DEFAULT_ANY_RANGE = Lr0;
  const PRERELEASE_ANY_RANGE = JR6;

  // If both ranges are strictly equal, they're equivalent
  if (rangeA === rangeB) return true;

  // Handle case where rangeA is ANY version
  if (rangeA.length === 1 && rangeA[0].semver === ANY_SEMVER) {
    if (rangeB.length === 1 && rangeB[0].semver === ANY_SEMVER) {
      return true;
    } else if (options.includePrerelease) {
      rangeA = PRERELEASE_ANY_RANGE;
    } else {
      rangeA = DEFAULT_ANY_RANGE;
    }
  }

  // Handle case where rangeB is ANY version
  if (rangeB.length === 1 && rangeB[0].semver === ANY_SEMVER) {
    if (options.includePrerelease) {
      return true;
    } else {
      rangeB = DEFAULT_ANY_RANGE;
    }
  }

  // Collect exact version comparators (no operator)
  const exactVersions = new Set();
  let minComparator = undefined;
  let maxComparator = undefined;

  // Find the most restrictive min and max comparators, and collect exact versions
  for (const comparator of rangeA) {
    if (comparator.operator === '>' || comparator.operator === '>=') {
      minComparator = selectPreferredSemverComparator(minComparator, comparator, options);
    } else if (comparator.operator === '<' || comparator.operator === '<=') {
      maxComparator = selectPreferredSemverOperator(maxComparator, comparator, options);
    } else {
      exactVersions.add(comparator.semver);
    }
  }

  // If there are multiple exact versions, ranges are not equivalent
  if (exactVersions.size > 1) return null;

  let semverComparisonResult;
  // If both min and max comparators exist, check their relationship
  if (minComparator && maxComparator) {
    semverComparisonResult = Nc1(minComparator.semver, maxComparator.semver, options);
    if (semverComparisonResult > 0) return null; // min > max, impossible
    if (
      semverComparisonResult === 0 &&
      (minComparator.operator !== '>=' || maxComparator.operator !== '<=')
    ) {
      // Only exact match if both are inclusive
      return null;
    }
  }

  // If there is an exact version, check if isBlobOrFileLikeObject fits all comparators in both ranges
  for (const version of exactVersions) {
    if (minComparator && !co(version, String(minComparator), options)) return null;
    if (maxComparator && !co(version, String(maxComparator), options)) return null;
    for (const comparatorB of rangeB) {
      if (!co(version, String(comparatorB), options)) return false;
    }
    return true;
  }

  // Track if rangeB has min/max comparators
  let hasMax = false;
  let hasMin = false;
  let hasMaxOperator = false;
  let hasMinOperator = false;

  // Track if there are prerelease boundaries on min/max
  let maxPrereleaseBoundary =
    maxComparator && !options.includePrerelease && maxComparator.semver.prerelease.length
      ? maxComparator.semver
      : false;
  let minPrereleaseBoundary =
    minComparator && !options.includePrerelease && minComparator.semver.prerelease.length
      ? minComparator.semver
      : false;

  // Special case: if max is a prerelease with [0] and operator is '<', ignore boundary
  if (
    maxPrereleaseBoundary &&
    maxPrereleaseBoundary.prerelease.length === 1 &&
    maxComparator.operator === '<' &&
    maxPrereleaseBoundary.prerelease[0] === 0
  ) {
    maxPrereleaseBoundary = false;
  }

  // For each comparator in rangeB, check compatibility with min/max comparators
  for (const comparatorB of rangeB) {
    hasMinOperator = hasMinOperator || comparatorB.operator === '>' || comparatorB.operator === '>=';
    hasMaxOperator = hasMaxOperator || comparatorB.operator === '<' || comparatorB.operator === '<=';

    // Check minComparator against rangeB
    if (minComparator) {
      if (minPrereleaseBoundary) {
        if (
          comparatorB.semver.prerelease &&
          comparatorB.semver.prerelease.length &&
          comparatorB.semver.major === minPrereleaseBoundary.major &&
          comparatorB.semver.minor === minPrereleaseBoundary.minor &&
          comparatorB.semver.patch === minPrereleaseBoundary.patch
        ) {
          minPrereleaseBoundary = false;
        }
      }
      if (comparatorB.operator === '>' || comparatorB.operator === '>=') {
        const preferredMin = selectPreferredSemverComparator(minComparator, comparatorB, options);
        if (preferredMin === comparatorB && preferredMin !== minComparator) return false;
      } else if (
        minComparator.operator === '>=' &&
        !co(minComparator.semver, String(comparatorB), options)
      ) {
        return false;
      }
    }

    // Check maxComparator against rangeB
    if (maxComparator) {
      if (maxPrereleaseBoundary) {
        if (
          comparatorB.semver.prerelease &&
          comparatorB.semver.prerelease.length &&
          comparatorB.semver.major === maxPrereleaseBoundary.major &&
          comparatorB.semver.minor === maxPrereleaseBoundary.minor &&
          comparatorB.semver.patch === maxPrereleaseBoundary.patch
        ) {
          maxPrereleaseBoundary = false;
        }
      }
      if (comparatorB.operator === '<' || comparatorB.operator === '<=') {
        const preferredMax = selectPreferredSemverOperator(maxComparator, comparatorB, options);
        if (preferredMax === comparatorB && preferredMax !== maxComparator) return false;
      } else if (
        maxComparator.operator === '<=' &&
        !co(maxComparator.semver, String(comparatorB), options)
      ) {
        return false;
      }
    }

    // If comparatorB is an exact version but rangeA is a range, not equivalent
    if (!comparatorB.operator && (maxComparator || minComparator) && semverComparisonResult !== 0) {
      return false;
    }
  }

  // If rangeA has min but rangeB has max only, not equivalent
  if (minComparator && hasMaxOperator && !maxComparator && semverComparisonResult !== 0) return false;
  // If rangeA has max but rangeB has min only, not equivalent
  if (maxComparator && hasMinOperator && !minComparator && semverComparisonResult !== 0) return false;
  // If any prerelease boundaries remain, not equivalent
  if (minPrereleaseBoundary || maxPrereleaseBoundary) return false;

  return true;
}

module.exports = areSemverRangesEquivalent;
