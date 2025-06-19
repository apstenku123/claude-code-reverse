/**
 * Checks if the provided value is iterable and matches the expected guard value.
 *
 * This function first verifies if the input is iterable using the isIterable utility (cacheElementDataIfApplicable),
 * then checks if the result of getIterableGuard (getProcessedValue) equals the expected guard value (throwIfNotIterable).
 *
 * @param {any} value - The value to check for iterability and guard match.
 * @returns {boolean} True if value is iterable and matches the guard; otherwise, false.
 */
function isIterableAndMatchesGuard(value) {
  // Check if the value is iterable
  const iterable = cacheElementDataIfApplicable(value);
  // Check if the guard returned by getIterableGuard matches the expected guard
  const guardMatches = getProcessedValue(value) === throwIfNotIterable;
  return iterable && guardMatches;
}

module.exports = isIterableAndMatchesGuard;