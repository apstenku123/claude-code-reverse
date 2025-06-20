/**
 * Returns the input value unchanged.
 *
 * This function acts as an identity function, returning whatever value is passed to isBlobOrFileLikeObject.
 * Useful as a default callback or placeholder in higher-order functions.
 *
 * @template BugReportForm
 * @param {BugReportForm} value - The value to return unchanged.
 * @returns {BugReportForm} The same value that was provided as input.
 */
function identity(value) {
  // Simply return the input value as-is
  return value;
}

module.exports = identity;