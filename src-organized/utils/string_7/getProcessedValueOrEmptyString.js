/**
 * Returns an empty string if the input value is null or undefined; otherwise, processes the value using toStringPreservingNegativeZero.
 *
 * @param {any} value - The value to be checked and processed.
 * @returns {string} An empty string if the value is null/undefined, or the processed value as a string.
 */
function getProcessedValueOrEmptyString(value) {
  // If the value is null or undefined, return an empty string
  if (value == null) {
    return "";
  }
  // Otherwise, process the value using toStringPreservingNegativeZero and return the result
  return toStringPreservingNegativeZero(value);
}

module.exports = getProcessedValueOrEmptyString;