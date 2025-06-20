/**
 * Extracts the pattern string from each provided input (string or RegExp) and concatenates them into a single string.
 *
 * @param {...(string|RegExp|null|undefined)} sources - One or more values (strings or RegExp objects) to extract patterns from.
 * @returns {string} The concatenated pattern strings from all provided sources.
 */
function concatenateSourcePatterns(...sources) {
  // Map each source to its pattern string using getSourcePattern, then join them
  return sources.map(source => getSourcePattern(source)).join("");
}

module.exports = concatenateSourcePatterns;