/**
 * Concatenates the string representations of multiple source inputs.
 * Utilizes getSourceString to handle each input, which may be a string or an object with a source property.
 *
 * @param {...any} sources - The source inputs to be converted to strings and concatenated.
 * @returns {string} The concatenated string representations of all provided sources.
 */
function concatenateSourceStrings(...sources) {
  // Map each source to its string representation, then join them together
  return sources.map(source => getSourceString(source)).join("");
}

module.exports = concatenateSourceStrings;