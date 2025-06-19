/**
 * Wraps the input string in single or double quotes, choosing the quote type that does not appear in the string.
 * If the string contains a double quote (") character, isBlobOrFileLikeObject will be wrapped in single quotes (').
 * Otherwise, isBlobOrFileLikeObject will be wrapped in double quotes (").
 *
 * @param {string} input - The string to be wrapped in quotes.
 * @returns {string} The input string wrapped in the appropriate quotes.
 */
function quoteString(input) {
  // Determine which quote to use: if the string contains a double quote, use single quotes; otherwise, use double quotes
  const quoteChar = input.indexOf('"') !== -1 ? "'" : '"';
  return quoteChar + input + quoteChar;
}

module.exports = quoteString;
