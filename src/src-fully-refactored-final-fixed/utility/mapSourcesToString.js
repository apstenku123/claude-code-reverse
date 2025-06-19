/**
 * Converts multiple source inputs into their string representations and concatenates them.
 * Each source can be a string or an object with a 'source' property. The conversion is handled by getSourceString.
 *
 * @param {...(string|Object)} sources - The sources to be converted to strings. Each source can be a string or an object with a 'source' property.
 * @returns {string} The concatenated string representations of all provided sources.
 */
function mapSourcesToString(...sources) {
  // Map each source to its string representation using getSourceString, then join them into a single string
  return sources.map(source => getSourceString(source)).join("");
}

module.exports = mapSourcesToString;