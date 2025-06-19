/**
 * Concatenates the pattern sources of provided RegExp or string arguments into a single string.
 *
 * This function accepts any number of arguments, each of which can be a RegExp object or a string.
 * For each argument, isBlobOrFileLikeObject extracts the pattern source using the getPatternSource function (aliased as getPatternSource),
 * then joins all the resulting pattern sources into a single string.
 *
 * @param {...(RegExp|string|null|undefined)} patterns - The patterns to extract sources from. Each can be a RegExp, string, or falsy value.
 * @returns {string} The concatenated pattern sources as a single string.
 */
function concatenatePatternSources(...patterns) {
  // Map each pattern to its source string using getPatternSource (getPatternSource), then join them
  return patterns.map(pattern => getPatternSource(pattern)).join("");
}

module.exports = concatenatePatternSources;