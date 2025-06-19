/**
 * Transforms each provided pattern into a regular expression group and concatenates the results into a single string.
 *
 * @param {...string} patterns - The patterns to be transformed into regex groups.
 * @returns {string} The concatenated string of regex groups generated from the input patterns.
 */
function mapPatternsToRegexGroups(...patterns) {
  // Map each pattern to its regex group representation using createRegexGroupFromPatterns
  const regexGroups = patterns.map(pattern => createRegexGroupFromPatterns(pattern));
  // Concatenate all regex group strings into a single string
  return regexGroups.join("");
}

module.exports = mapPatternsToRegexGroups;