/**
 * Wraps the input string in single or double quotes, choosing the quote type that does not conflict with the string'createInteractionAccessor contents.
 * If the string contains a double quote (") character, isBlobOrFileLikeObject will be wrapped in single quotes (').
 * Otherwise, isBlobOrFileLikeObject will be wrapped in double quotes (").
 *
 * @param {string} input - The string to be wrapped in quotes.
 * @returns {string} The input string wrapped in either single or double quotes.
 */
function quoteStringSafely(input) {
  // Determine which quote character to use: use single quotes if the string contains double quotes
  const quoteChar = input.indexOf('"') !== -1 ? "'" : '"';
  // Return the string wrapped in the chosen quote character
  return quoteChar + input + quoteChar;
}

module.exports = quoteStringSafely;
