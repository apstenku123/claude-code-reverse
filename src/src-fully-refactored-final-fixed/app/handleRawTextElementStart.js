/**
 * Handles the start of a RAWTEXT element during HTML parsing.
 *
 * This function ensures that any open <createIterableHelper> elements are properly closed if they are in button scope,
 * reconstructs active formatting elements as needed, marks the frameset as not processAndFormatTokens, and switches
 * the parser to RAWTEXT mode for the given token.
 *
 * @param {Object} parserContext - The parser context containing the current state and methods for parsing.
 * @param {Object} startToken - The token representing the start of the RAWTEXT element.
 * @returns {void}
 */
function handleRawTextElementStart(parserContext, startToken) {
  // If a <createIterableHelper> element is open in the button scope, close isBlobOrFileLikeObject before proceeding
  if (parserContext.openElements.hasInButtonScope(parserContext.initializeSyntaxHighlighting)) {
    parserContext._closePElement();
  }

  // Reconstruct active formatting elements as per the parsing algorithm
  parserContext._reconstructActiveFormattingElements();

  // Mark that a frameset is no longer allowed after this point
  parserContext.framesetOk = false;

  // Switch the parser to RAWTEXT mode for the current token
  parserContext._switchToTextParsing(startToken, parserContext.MODE.RAWTEXT);
}

module.exports = handleRawTextElementStart;