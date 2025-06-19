/**
 * Creates a concatenated string of regular expression groups from multiple input patterns.
 * Each pattern is transformed into a regex group using createRegexGroupFromPatterns.
 *
 * @param {...string} patterns - The input patterns to be converted into regex groups.
 * @returns {string} The concatenated string of regex groups.
 */
function createRegexGroupFromMultiplePatterns(...patterns) {
  // Map each pattern to its regex group representation
  const regexGroups = patterns.map(pattern => createRegexGroupFromPatterns(pattern));
  // Concatenate all regex groups into a single string
  return regexGroups.join("");
}

module.exports = createRegexGroupFromMultiplePatterns;