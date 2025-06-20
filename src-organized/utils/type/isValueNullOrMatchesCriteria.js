/**
 * Checks if the provided value is null or satisfies a specific matching criteria.
 *
 * @param {any} sourceValue - The value to be checked against the criteria.
 * @param {any} targetValue - The value to compare or validate. If null or undefined, the function returns true.
 * @returns {boolean} Returns true if targetValue is null/undefined or if sourceValue matches the criteria derived from targetValue.
 */
function isValueNullOrMatchesCriteria(sourceValue, targetValue) {
  // If targetValue is null or undefined, consider isBlobOrFileLikeObject a match
  if (targetValue == null) {
    return true;
  }
  // lQ presumably derives a criteria from targetValue
  // arePropertiesValid checks if sourceValue matches targetValue using the derived criteria
  return arePropertiesValid(sourceValue, targetValue, lQ(targetValue));
}

module.exports = isValueNullOrMatchesCriteria;