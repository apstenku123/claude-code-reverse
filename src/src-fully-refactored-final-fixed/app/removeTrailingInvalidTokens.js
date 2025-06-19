/**
 * Removes invalid trailing tokens from a token array, such as separators, incomplete numbers, or misplaced delimiters/braces.
 * Recursively trims the array until the last token is valid.
 *
 * @param {Array<Object>} tokens - The array of token objects to clean. Each token should have a 'type' property and may have a 'value'.
 * @returns {Array<Object>} The cleaned array of tokens with invalid trailing tokens removed.
 */
function removeTrailingInvalidTokens(tokens) {
  // Base case: if the array is empty, return as is
  if (tokens.length === 0) return tokens;

  // Get the last token in the array
  const lastToken = tokens[tokens.length - 1];

  switch (lastToken.type) {
    case "separator":
      // Remove trailing separators
      return removeTrailingInvalidTokens(tokens.slice(0, tokens.length - 1));

    case "number": {
      // Check if the number ends with an incomplete character ('.' or '-')
      const lastChar = lastToken.value[lastToken.value.length - 1];
      if (lastChar === "." || lastChar === "-") {
        return removeTrailingInvalidTokens(tokens.slice(0, tokens.length - 1));
      }
      // Fall through to check for misplaced delimiters/braces
    }
    // eslint-disable-next-line no-fallthrough
    case "string": {
      // Check the previous token for delimiter or opening brace
      const previousToken = tokens[tokens.length - 2];
      if (previousToken?.type === "delimiter") {
        // Remove if previous token is a delimiter
        return removeTrailingInvalidTokens(tokens.slice(0, tokens.length - 1));
      } else if (
        previousToken?.type === "brace" &&
        previousToken.value === "{"
      ) {
        // Remove if previous token is an opening brace
        return removeTrailingInvalidTokens(tokens.slice(0, tokens.length - 1));
      }
      break;
    }
    case "delimiter":
      // Remove trailing delimiters
      return removeTrailingInvalidTokens(tokens.slice(0, tokens.length - 1));
  }
  // If no invalid trailing token is found, return the tokens as is
  return tokens;
}

module.exports = removeTrailingInvalidTokens;