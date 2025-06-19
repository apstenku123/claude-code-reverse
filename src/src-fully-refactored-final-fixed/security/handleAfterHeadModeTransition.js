/**
 * Handles the transition of the parser to the 'after head' insertion mode.
 * Removes the most recently opened element from the stack and processes the next token.
 *
 * @param {Object} parserContext - The current parser context, containing the open elements stack and insertion mode.
 * @param {Object} token - The token to be processed after the transition.
 * @returns {void}
 */
function handleAfterHeadModeTransition(parserContext, token) {
  // Remove the most recently opened element from the stack
  parserContext.openElements.pop();

  // Set the parser'createInteractionAccessor insertion mode to 'AFTER_HEAD_MODE'
  parserContext.insertionMode = "AFTER_HEAD_MODE";

  // Process the provided token in the new context
  parserContext._processToken(token);
}

module.exports = handleAfterHeadModeTransition;