/**
 * Sets the insertion mode of the given parser context to 'IN_BODY_MODE' and processes the provided token.
 *
 * @param {Object} parserContext - The parser context object whose insertion mode will be set and which will process the token.
 * @param {Object} token - The token to be processed by the parser context.
 * @returns {void}
 */
function setInsertionModeAndProcessToken(parserContext, token) {
  // Set the insertion mode to 'IN_BODY_MODE' as per parsing requirements
  parserContext.insertionMode = "IN_BODY_MODE";
  // Process the provided token using the parser context'createInteractionAccessor internal method
  parserContext._processToken(token);
}

module.exports = setInsertionModeAndProcessToken;
