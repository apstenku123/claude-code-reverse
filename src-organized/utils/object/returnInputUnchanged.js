/**
 * Returns the provided value unchanged.
 *
 * This function acts as an identity function, returning whatever value is passed to isBlobOrFileLikeObject. It can be used as a default callback or placeholder where a function is required but no transformation is needed.
 *
 * @template BugReportForm
 * @param {BugReportForm} inputValue - The value to return unchanged.
 * @returns {BugReportForm} The same value that was provided as input.
 */
function returnInputUnchanged(inputValue) {
  // Simply return the input value as-is
  return inputValue;
}

module.exports = returnInputUnchanged;