/**
 * Parses an error object to extract token counts when the input length and max_tokens exceed the model'createInteractionAccessor context limit.
 *
 * @param {Object} errorResponse - The error response object, expected to have 'status' and 'message' properties.
 * @returns {Object|undefined} Returns an object with inputTokens, maxTokens, and contextLimit if parsing is successful; otherwise undefined.
 */
function parseContextLimitError(errorResponse) {
  // Check if the error status is 400 and the message exists
  if (errorResponse.status !== 400 || !errorResponse.message) return;

  const contextLimitPattern = /input length and `max_tokens` exceed context limit: (\d+) \+ (\d+) > (\d+)/;

  // Ensure the error message matches the expected pattern
  if (!errorResponse.message.includes("input length and `max_tokens` exceed context limit")) return;

  const match = errorResponse.message.match(contextLimitPattern);

  // The match should have exactly 4 elements: [fullMatch, inputTokens, maxTokens, contextLimit]
  if (!match || match.length !== 4) return;

  const [ , inputTokensStr, maxTokensStr, contextLimitStr ] = match;

  // If any of the captured groups are missing, log an error and exit
  if (!inputTokensStr || !maxTokensStr || !contextLimitStr) {
    reportErrorIfAllowed(new Error("Unable to parse max_tokens from max_tokens exceed context limit error message"));
    return;
  }

  // Parse the captured strings into integers
  const inputTokens = parseInt(inputTokensStr, 10);
  const maxTokens = parseInt(maxTokensStr, 10);
  const contextLimit = parseInt(contextLimitStr, 10);

  // If any of the parsed values are not numbers, exit
  if (isNaN(inputTokens) || isNaN(maxTokens) || isNaN(contextLimit)) return;

  // Return the extracted values in a structured object
  return {
    inputTokens,
    maxTokens,
    contextLimit
  };
}

module.exports = parseContextLimitError;