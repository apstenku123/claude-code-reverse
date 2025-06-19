/**
 * Parses an error object to extract token counts when the input length and max_tokens exceed the model'createInteractionAccessor context limit.
 *
 * @param {Object} errorResponse - The error response object, expected to have 'status' and 'message' properties.
 * @returns {Object|undefined} An object with inputTokens, maxTokens, and contextLimit if the error matches; otherwise undefined.
 */
function parseContextLimitExceededError(errorResponse) {
  // Only handle errors with status 400 and a message
  if (errorResponse.status !== 400 || !errorResponse.message) return;

  // Only process messages that mention the context limit being exceeded
  const contextLimitMessage = "input length and `max_tokens` exceed context limit";
  if (!errorResponse.message.includes(contextLimitMessage)) return;

  // Regex to extract the three numbers from the error message
  const contextLimitRegex = /input length and `max_tokens` exceed context limit: (\d+) \+ (\d+) > (\d+)/;
  const match = errorResponse.message.match(contextLimitRegex);

  // Ensure the regex matched and captured all three groups
  if (!match || match.length !== 4) return;

  const [ , inputTokensStr, maxTokensStr, contextLimitStr ] = match;

  // Validate that all captured groups are present
  if (!inputTokensStr || !maxTokensStr || !contextLimitStr) {
    reportErrorIfAllowed(new Error("Unable to parse max_tokens from max_tokens exceed context limit error message"));
    return;
  }

  // Parse the captured numbers as integers
  const inputTokens = parseInt(inputTokensStr, 10);
  const maxTokens = parseInt(maxTokensStr, 10);
  const contextLimit = parseInt(contextLimitStr, 10);

  // Ensure all parsed values are valid numbers
  if (isNaN(inputTokens) || isNaN(maxTokens) || isNaN(contextLimit)) return;

  // Return the extracted values in a structured object
  return {
    inputTokens,
    maxTokens,
    contextLimit
  };
}

module.exports = parseContextLimitExceededError;
