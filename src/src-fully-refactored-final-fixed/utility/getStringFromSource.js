/**
 * Returns an empty string if the source value is null or undefined; otherwise, processes the source value using normalizeNumberToString.
 *
 * @param {*} sourceValue - The value to be checked and processed.
 * @returns {string} An empty string if sourceValue is null or undefined, otherwise the result of normalizeNumberToString(sourceValue).
 */
function getStringFromSource(sourceValue) {
  // If the source value is null or undefined, return an empty string
  if (sourceValue == null) {
    return "";
  }
  // Otherwise, process the source value using normalizeNumberToString
  return normalizeNumberToString(sourceValue);
}

module.exports = getStringFromSource;