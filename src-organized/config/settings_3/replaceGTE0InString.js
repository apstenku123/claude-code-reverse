/**
 * Replaces occurrences of a 'greater than or equal to zero' (GTE0) pattern in a string, optionally handling prerelease versions.
 * Calls an external logging or tracking function before performing the replacement.
 *
 * @param {string} inputString - The string to process and replace the GTE0 pattern in.
 * @param {Object} options - Configuration options for the replacement.
 * @param {boolean} [options.includePrerelease=false] - Whether to use the prerelease GTE0 pattern.
 * @returns {string} The input string with the GTE0 pattern removed.
 */
function replaceGTE0InString(inputString, options) {
  // Log or track the replacement operation
  wB("replaceGTE0", inputString, options);

  // Determine the correct regex pattern based on the 'includePrerelease' option
  const gte0PatternKey = options.includePrerelease ? jD.GTE0PRE : jD.GTE0;
  const gte0Pattern = AW[gte0PatternKey];

  // Trim the input string and replace the GTE0 pattern with an empty string
  return inputString.trim().replace(gte0Pattern, "");
}

module.exports = replaceGTE0InString;
