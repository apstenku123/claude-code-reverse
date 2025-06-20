/**
 * Converts an observable source string into a sanitized, brace/paren-balanced, and string-quoted JSON object.
 *
 * This function processes the input observable string through several stages:
 *   1. Tokenizes the source string (via tokenizeJsonLikeString)
 *   2. Removes invalid or incomplete trailing tokens (via sanitizeTokenList)
 *   3. Appends missing closing braces/brackets to balance the token list (via closeUnmatchedBracesAndParens)
 *   4. Concatenates the token values into a string, quoting string values as needed (via concatenateValuesWithStringQuotes)
 *   5. Parses the resulting string as JSON
 *
 * @param {string} sourceObservable - The observable source string to be parsed and sanitized.
 * @returns {Object} The parsed JSON object after sanitization and formatting.
 */
function parseSanitizedObservableToJson(sourceObservable) {
  // Step 1: Tokenize the source observable string
  const tokenList = tokenizeJsonLikeString(sourceObservable);

  // Step 2: Remove invalid or incomplete trailing tokens
  const sanitizedTokenList = sanitizeTokenList(tokenList);

  // Step 3: Ensure all opened braces/brackets are properly closed
  const balancedTokenList = closeUnmatchedBracesAndParens(sanitizedTokenList);

  // Step 4: Concatenate token values into a string, quoting string values as needed
  const jsonString = concatenateValuesWithStringQuotes(balancedTokenList);

  // Step 5: Parse the resulting string as JSON
  return JSON.parse(jsonString);
}

module.exports = parseSanitizedObservableToJson;