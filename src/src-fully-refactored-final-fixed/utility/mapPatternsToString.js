/**
 * Converts each input (string or RegExp) to its string pattern using getSourceString, then concatenates the results.
 *
 * @param {...(string|RegExp|null|undefined)} patterns - One or more strings or RegExp objects to extract patterns from.
 * @returns {string} Concatenated string of all extracted patterns.
 */
function mapPatternsToString(...patterns) {
  // Map each pattern to its extracted string pattern using getSourceString, then join all results into a single string
  return patterns.map(pattern => getSourceString(pattern)).join("");
}

module.exports = mapPatternsToString;