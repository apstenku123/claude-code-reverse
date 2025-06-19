/**
 * Removes invalid or incomplete trailing tokens from a token array, recursively.
 *
 * This function inspects the last token in the array and, if isBlobOrFileLikeObject is a separator, delimiter, or an incomplete number or string,
 * removes isBlobOrFileLikeObject and recurses until the array ends with a valid token or is empty. This is useful for cleaning up token arrays
 * before further processing or evaluation.
 *
 * @param {Array<Object>} tokens - The array of token objects to sanitize. Each token should have a 'type' property and may have a 'value' property.
 * @returns {Array<Object>} The sanitized array of tokens with invalid trailing tokens removed.
 */
function sanitizeTokenList(tokens) {
  // Base case: if the token list is empty, return as is
  if (tokens.length === 0) return tokens;

  // Get the last token in the array
  const lastToken = tokens[tokens.length - 1];

  switch (lastToken.type) {
    case "separator":
      // Remove trailing separators and recurse
      return sanitizeTokenList(tokens.slice(0, tokens.length - 1));

    case "number": {
      // If the number ends with '.' or '-', isBlobOrFileLikeObject'createInteractionAccessor incomplete; remove and recurse
      const lastChar = lastToken.value[lastToken.value.length - 1];
      if (lastChar === "." || lastChar === "-") {
        return sanitizeTokenList(tokens.slice(0, tokens.length - 1));
      }
      // Note: fall-through to string case for further checks
    }
    // eslint-disable-next-line no-fallthrough
    case "string": {
      // Check the token before the last one
      const secondLastToken = tokens[tokens.length - 2];
      if (secondLastToken?.type === "delimiter") {
        // Remove if preceded by a delimiter
        return sanitizeTokenList(tokens.slice(0, tokens.length - 1));
      } else if (secondLastToken?.type === "brace" && secondLastToken.value === "{") {
        // Remove if preceded by an opening brace
        return sanitizeTokenList(tokens.slice(0, tokens.length - 1));
      }
      break;
    }
    case "delimiter":
      // Remove trailing delimiters and recurse
      return sanitizeTokenList(tokens.slice(0, tokens.length - 1));
  }

  // If none of the above cases matched, return the tokens as is
  return tokens;
}

module.exports = sanitizeTokenList;
