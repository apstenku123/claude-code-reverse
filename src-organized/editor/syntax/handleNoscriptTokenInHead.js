/**
 * Handles a token encountered within a <noscript> tag inside the <head> section of an HTML document.
 * Depending on the token type, triggers the appropriate parse error, updates the open elements stack,
 * resets the insertion mode, and processes the token again.
 *
 * @param {Object} parserContext - The parser context, containing the open elements stack, insertion mode, and error handling methods.
 * @param {Object} token - The token being processed, with at least a 'type' property.
 * @returns {void}
 */
function handleNoscriptTokenInHead(parserContext, token) {
  // Determine which error code to use based on whether the token is EOF
  const errorCode = token.type === e1.EOF_TOKEN
    ? xG.openElementsLeftAfterEof
    : xG.disallowedContentInNoscriptInHead;

  // Report the parse error
  parserContext._err(errorCode);

  // Remove the current element from the open elements stack
  parserContext.openElements.pop();

  // Reset the insertion mode to 'IN_HEAD_MODE'
  parserContext.insertionMode = "IN_HEAD_MODE";

  // Re-process the current token in the new insertion mode
  parserContext._processToken(token);
}

module.exports = handleNoscriptTokenInHead;