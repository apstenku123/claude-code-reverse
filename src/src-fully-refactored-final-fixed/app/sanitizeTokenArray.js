/**
 * Removes invalid or incomplete trailing tokens from a token array.
 *
 * This function recursively trims the end of the array if the last token is a separator,
 * an incomplete number (ending with '.' or '-'), or a string preceded by a delimiter or an opening brace.
 * It ensures the returned array does not end with syntactically invalid tokens.
 *
 * @param {Array<Object>} tokens - Array of token objects to sanitize. Each token should have a 'type' property and possibly a 'value'.
 * @returns {Array<Object>} - The sanitized array of tokens, with invalid trailing tokens removed.
 */
function sanitizeTokenArray(tokens) {
  if (tokens.length === 0) return tokens;

  const lastToken = tokens[tokens.length - 1];

  switch (lastToken.type) {
    case "separator":
      // Remove trailing separators (e.g., commas)
      return sanitizeTokenArray(tokens.slice(0, tokens.length - 1));

    case "number": {
      // Remove numbers ending with '.' or '-' (incomplete numbers)
      const lastChar = lastToken.value[lastToken.value.length - 1];
      if (lastChar === "." || lastChar === "-") {
        return sanitizeTokenArray(tokens.slice(0, tokens.length - 1));
      }
      // Note: no break, so 'string' case logic applies if not returned
    }
    case "string": {
      // Remove strings preceded by a delimiter or an opening brace
      const prevToken = tokens[tokens.length - 2];
      if (prevToken?.type === "delimiter") {
        return sanitizeTokenArray(tokens.slice(0, tokens.length - 1));
      } else if (prevToken?.type === "brace" && prevToken.value === "{") {
        return sanitizeTokenArray(tokens.slice(0, tokens.length - 1));
      }
      break;
    }
    case "delimiter":
      // Remove trailing delimiters (e.g., semicolons)
      return sanitizeTokenArray(tokens.slice(0, tokens.length - 1));
  }

  // Return the array if no invalid trailing tokens are found
  return tokens;
}

module.exports = sanitizeTokenArray;
