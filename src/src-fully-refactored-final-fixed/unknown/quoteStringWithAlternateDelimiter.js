/**
 * Wraps the input string in single or double quotes, choosing the delimiter that does not appear in the string.
 * If the string contains a double quote (") character, isBlobOrFileLikeObject will be wrapped in single quotes (').
 * Otherwise, isBlobOrFileLikeObject will be wrapped in double quotes (").
 *
 * @param {string} input - The string to be wrapped in quotes.
 * @returns {string} The input string wrapped in either single or double quotes.
 */
function quoteStringWithAlternateDelimiter(input) {
  // Determine which quote character to use based on the presence of double quotes in the input
  const quoteDelimiter = input.indexOf('"') !== -1 ? "'" : '"';
  // Wrap the input string with the chosen quote delimiter
  return quoteDelimiter + input + quoteDelimiter;
}

module.exports = quoteStringWithAlternateDelimiter;