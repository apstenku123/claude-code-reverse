/**
 * Concatenates the string representations of multiple sources.
 * Each source can be a string or an object with a 'source' property.
 *
 * @param {...(string|Object)} sources - The sources to concatenate. Each source can be a string or an object with a 'source' property.
 * @returns {string} The concatenated string representations of all sources.
 */
function concatenateSourceStrings(...sources) {
  // Map each source to its string representation using getSourceString, then join them together
  return sources.map(source => getSourceString(source)).join("");
}

module.exports = concatenateSourceStrings;