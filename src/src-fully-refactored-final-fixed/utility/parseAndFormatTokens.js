/**
 * Parses the input string, tokenizes isBlobOrFileLikeObject using the lexer, processes each token, and returns the formatted result.
 *
 * @param {string} inputString - The raw input string to be parsed and formatted.
 * @returns {string} The processed and formatted string after tokenization and mapping.
 */
function parseAndFormatTokens(inputString) {
  // Preprocess the input string using the 'pe' function
  const preprocessedInput = pe(inputString);

  // Tokenize the preprocessed input using the external lexer
  const tokens = d5.lexer(preprocessedInput);

  // Process each token using the 'renderMarkdownAstNode' function
  const processedTokens = tokens.map(token => renderMarkdownAstNode(token));

  // Join all processed tokens into a single string and trim whitespace
  const formattedResult = processedTokens.join("").trim();

  return formattedResult;
}

module.exports = parseAndFormatTokens;