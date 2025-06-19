/**
 * Replaces specific patterns in an observable string with standardized delimiters.
 *
 * This function replaces all occurrences of the pattern defined by CP6 with a colon (':'),
 * and all occurrences of the pattern defined by VP6 with a space (' ').
 *
 * @param {string} observableString - The input string representing an observable.
 * @returns {string} The normalized observable string with standardized delimiters.
 */
function normalizeObservableString(observableString) {
  // Replace all CP6 pattern matches with ':'
  // Then replace all VP6 pattern matches with ' '
  return observableString.replace(CP6, ":").replace(VP6, " ");
}

module.exports = normalizeObservableString;