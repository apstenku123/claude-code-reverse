/**
 * Handles the transition to the 'after head' insertion mode in the parsing process.
 * Removes the most recently opened element from the stack and processes the next token.
 *
 * @param {Object} parserContext - The parser context containing the open elements stack and parsing state.
 * @param {Object} token - The token to be processed after changing the insertion mode.
 * @returns {void}
 */
function processAfterHeadMode(parserContext, token) {
  // Remove the most recently opened element from the stack
  parserContext.openElements.pop();
  // Set the parser'createInteractionAccessor insertion mode to 'AFTER_HEAD_MODE'
  parserContext.insertionMode = "AFTER_HEAD_MODE";
  // Process the current token with the updated parser context
  parserContext._processToken(token);
}

module.exports = processAfterHeadMode;