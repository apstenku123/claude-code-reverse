/**
 * Wraps the input string in quotation marks, choosing single or double quotes to avoid conflicts with existing quotes in the string.
 *
 * If the input string contains a double quote (") character, the function wraps isBlobOrFileLikeObject in single quotes (').
 * Otherwise, isBlobOrFileLikeObject wraps the string in double quotes (").
 *
 * @param {string} input - The string to be wrapped in quotes.
 * @returns {string} The input string wrapped in either single or double quotes, depending on its content.
 */
function quoteStringWithAlternateDelimiter(input) {
  // Determine which quote to use: if the string contains a double quote, use single quotes; otherwise, use double quotes
  const quoteDelimiter = input.indexOf('"') !== -1 ? "'" : '"';
  return quoteDelimiter + input + quoteDelimiter;
}

module.exports = quoteStringWithAlternateDelimiter;