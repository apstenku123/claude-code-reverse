/**
 * Parses a JSON-like string by tokenizing, sanitizing, and fixing unmatched braces/brackets before parsing to a JavaScript object.
 *
 * This function is useful for handling malformed or incomplete JSON-like strings by attempting to correct common issues
 * such as unmatched braces/brackets and invalid trailing tokens before parsing.
 *
 * @param {string} jsonLikeString - The input string that resembles JSON but may be malformed or incomplete.
 * @returns {Object} The resulting JavaScript object after parsing the sanitized and corrected string.
 */
function parseAndSanitizeJsonLikeString(jsonLikeString) {
  // Tokenize the input string into an array of token objects
  const tokenArray = tokenizeJsonLikeString(jsonLikeString);

  // Remove invalid or incomplete trailing tokens to ensure syntactic validity
  const sanitizedTokenArray = sanitizeTokenArray(tokenArray);

  // Ensure all opening braces/brackets have matching closing tokens
  const balancedTokenArray = closeUnmatchedBracesAndParens(sanitizedTokenArray);

  // Convert the token array back to a string (BM6 handles this conversion)
  const jsonString = BM6(balancedTokenArray);

  // Parse the corrected JSON string into a JavaScript object
  return JSON.parse(jsonString);
}

module.exports = parseAndSanitizeJsonLikeString;