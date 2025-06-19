/**
 * Attempts to retrieve a result from a series of utility functions in order of priority.
 * Returns the first non-falsy result found, or the result of the default fallback function if none are found.
 *
 * @param {any} inputValue - The value to be checked by the utility functions.
 * @returns {any} The first non-falsy result from the utility functions, or the fallback result.
 */
function getFirstAvailableResult(inputValue) {
  // Try to get a result from the highest-priority utility function
  const resultFromIw1 = createFileWithDefaults(inputValue);
  if (resultFromIw1) {
    return resultFromIw1;
  }

  // Try the next utility function if the previous returned a falsy value
  const resultFromFY = FY(inputValue);
  if (resultFromFY) {
    return resultFromFY;
  }

  // Try the third utility function
  const resultFromHA1 = normalizeIterableOrArrayLike(inputValue);
  if (resultFromHA1) {
    return resultFromHA1;
  }

  // If all above fail, return the fallback/default result
  return Qw1();
}

module.exports = getFirstAvailableResult;