/**
 * Handles token processing when encountering disallowed content in a <noscript> tag within the <head> element.
 *
 * Depending on the token type, triggers the appropriate error, updates the open elements stack,
 * sets the insertion mode, and processes the token again.
 *
 * @param {Object} parserContext - The parser context, containing the open elements stack, insertion mode, and error/token processing methods.
 * @param {Object} token - The token to process, containing at least a 'type' property.
 * @returns {void}
 */
function handleNoscriptInHeadMode(parserContext, token) {
  // Determine the error code based on whether the token is EOF
  const errorCode = token.type === e1.EOF_TOKEN
    ? xG.openElementsLeftAfterEof
    : xG.disallowedContentInNoscriptInHead;

  // Report the error using the parser context'createInteractionAccessor error handler
  parserContext._err(errorCode);

  // Remove the most recently opened element from the stack
  parserContext.openElements.pop();

  // Set the insertion mode back to 'IN_HEAD_MODE'
  parserContext.insertionMode = "IN_HEAD_MODE";

  // Re-process the current token in the new insertion mode
  parserContext._processToken(token);
}

module.exports = handleNoscriptInHeadMode;