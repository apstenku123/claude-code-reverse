/**
 * Calculates a match score based on the number of errors, string length, and location differences.
 * This function is typically used in fuzzy matching algorithms to determine how closely two strings match,
 * factoring in the number of errors and the distance between expected and actual match locations.
 *
 * @param {string} targetString - The string being compared or matched against.
 * @param {Object} [options={}] - Configuration options for the match calculation.
 * @param {number} [options.errors=0] - The number of errors (differences) found in the match.
 * @param {number} [options.currentLocation=0] - The actual location where the match was found.
 * @param {number} [options.expectedLocation=0] - The expected location for the match.
 * @param {number} [options.distance=N4.distance] - The maximum distance allowed for a match to be considered valid.
 * @param {boolean} [options.ignoreLocation=N4.ignoreLocation] - Whether to ignore the location difference in the score calculation.
 * @returns {number} The calculated match score (lower is better; 0 is a perfect match).
 */
function calculateMatchScore(
  targetString,
  {
    errors = 0,
    currentLocation = 0,
    expectedLocation = 0,
    distance = N4.distance,
    ignoreLocation = N4.ignoreLocation
  } = {}
) {
  // Calculate the basic error score as a fraction of the string length
  const errorScore = errors / targetString.length;

  // If location is to be ignored, return the error score only
  if (ignoreLocation) {
    return errorScore;
  }

  // Calculate the absolute difference between expected and actual locations
  const locationDifference = Math.abs(expectedLocation - currentLocation);

  // If distance is zero, return 1 if there is any location difference, else return error score
  if (!distance) {
    return locationDifference ? 1 : errorScore;
  }

  // Combine error score with normalized location difference
  return errorScore + locationDifference / distance;
}

module.exports = calculateMatchScore;
