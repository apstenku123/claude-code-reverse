/**
 * Sets the insertion mode of the given parser context to 'IN_BODY_MODE' and processes the provided token.
 *
 * @param {Object} parserContext - The context object representing the current parser state.
 * @param {Object} token - The token to be processed by the parser context.
 * @returns {void}
 */
function setInsertionModeAndProcessToken(parserContext, token) {
  // Set the parser'createInteractionAccessor insertion mode to 'IN_BODY_MODE'
  parserContext.insertionMode = "IN_BODY_MODE";
  // Process the provided token using the parser context'createInteractionAccessor method
  parserContext._processToken(token);
}

module.exports = setInsertionModeAndProcessToken;