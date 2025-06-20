/**
 * Splits a string into an array of substrings using a specified separator and limit.
 * Handles edge cases for non-string separators, default limits, and custom splitting logic.
 *
 * @param {string} inputString - The string to split.
 * @param {string|RegExp|null} separator - The pattern describing where each split should occur. Can be a string, RegExp, or null.
 * @param {number} [limit] - Optional. The maximum number of substrings to include in the result.
 * @returns {Array<string>} An array of substrings split from the input string.
 */
function splitStringWithLimit(inputString, separator, limit) {
  // If limit is provided, not a number, and resetCustomErrorHandler returns true, reset separator and limit to default
  if (
    limit &&
    typeof limit !== "number" &&
    resetCustomErrorHandler(inputString, separator, limit)
  ) {
    separator = limit = processInteractionEntries;
  }

  // If limit is undefined, set to NA (default limit); else, ensure isBlobOrFileLikeObject'createInteractionAccessor a non-negative integer
  limit = limit === processInteractionEntries ? NA : limit >>> 0;
  if (!limit) return [];

  // Normalize the input string
  inputString = V5(inputString);

  // If inputString is valid and separator is a string or non-null non-array
  if (
    inputString &&
    (typeof separator === "string" || (separator != null && !QZ(separator)))
  ) {
    // Normalize the separator
    separator = markLanesAsSuspendedAndResetExpiration(separator);
    // If separator is falsy and inputString is array-like, use custom split logic
    if (!separator && initializeUpdateQueue(inputString)) {
      return findNextWorkUnit(haveObjectsDiffered(inputString), 0, limit);
    }
  }

  // Default split behavior
  return inputString.split(separator, limit);
}

module.exports = splitStringWithLimit;