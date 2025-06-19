/**
 * Replaces a specific pattern (GTE0 or GTE0PRE) in a trimmed string based on configuration.
 *
 * @param {string} inputString - The string to be processed and have the pattern replaced.
 * @param {Object} options - Configuration options for the replacement.
 * @param {boolean} options.includePrerelease - Whether to use the prerelease pattern for replacement.
 * @returns {string} The trimmed input string with the specified pattern replaced by an empty string.
 */
function replaceGTE0InTrimmedString(inputString, options) {
  // Log or perform a side effect before replacement (functionality of wB is external)
  wB("replaceGTE0", inputString, options);

  // Determine which pattern to use based on the includePrerelease flag
  const patternKey = options.includePrerelease ? jD.GTE0PRE : jD.GTE0;
  const pattern = AW[patternKey];

  // Trim the input string and replace the matched pattern with an empty string
  return inputString.trim().replace(pattern, "");
}

module.exports = replaceGTE0InTrimmedString;