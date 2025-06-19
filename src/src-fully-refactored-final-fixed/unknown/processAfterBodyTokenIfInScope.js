/**
 * Processes a token if the <body> element is currently in scope within the open elements stack.
 *
 * If the <body> element is in scope, this function sets the insertion mode to 'AFTER_BODY_MODE'
 * and processes the provided token using the parser'createInteractionAccessor internal _processToken method.
 *
 * @param {object} parserContext - The parser context containing open elements and insertion mode state.
 *   Expected to have:
 *     - openElements: an object with a hasInScope(tagName) method
 *     - insertionMode: a string property
 *     - _processToken(token): a method to process tokens
 * @param {object} token - The token to process if the <body> element is in scope.
 * @returns {void}
 */
function processAfterBodyTokenIfInScope(parserContext, token) {
  // Check if the <body> element is currently in scope in the open elements stack
  if (parserContext.openElements.hasInScope(i.BODY)) {
    // Set the parser'createInteractionAccessor insertion mode to AFTER_BODY_MODE
    parserContext.insertionMode = "AFTER_BODY_MODE";
    // Process the token using the parser'createInteractionAccessor internal method
    parserContext._processToken(token);
  }
}

module.exports = processAfterBodyTokenIfInScope;