/**
 * Extracts the source patterns from each input (string or RegExp) and joins them into a single string.
 *
 * @param {...(string|RegExp|null|undefined)} inputs - The inputs to extract source patterns from. Each can be a string, RegExp, or falsy value.
 * @returns {string} The concatenated string of all extracted source patterns.
 */
function joinSourcePatterns(...inputs) {
  // Map each input to its source pattern using getSourcePattern, then join the results into a single string
  return inputs.map(input => getSourcePattern(input)).join("");
}

module.exports = joinSourcePatterns;