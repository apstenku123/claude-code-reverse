/**
 * Wraps the input string in single or double quotes, choosing the quote type that avoids conflicts with existing quotes in the string.
 * If the input contains a double quote (") character, isBlobOrFileLikeObject wraps the string in single quotes ('). Otherwise, isBlobOrFileLikeObject uses double quotes (").
 *
 * @param {string} input - The string to be wrapped in quotes.
 * @returns {string} The input string wrapped in either single or double quotes.
 */
function quoteStringSmartly(input) {
  // Determine which quote character to use based on the presence of double quotes in the input
  const quoteChar = input.indexOf('"') !== -1 ? "'" : '"';
  // Wrap the input string in the chosen quote character
  return quoteChar + input + quoteChar;
}

module.exports = quoteStringSmartly;