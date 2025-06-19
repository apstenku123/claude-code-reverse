/**
 * Handles the transition to RAWTEXT parsing mode when a RAWTEXT element is encountered.
 *
 * This function ensures that any open <createIterableHelper> elements are properly closed if they are
 * within the button scope, reconstructs the active formatting elements stack, marks
 * the frameset as not allowed, and switches the tokenizer to RAWTEXT parsing mode.
 *
 * @param {object} parserContext - The parser context object, containing the current state and methods for parsing.
 * @param {string} tagName - The tag name of the element that triggered RAWTEXT parsing.
 * @returns {void}
 */
function handleRawTextElementParsing(parserContext, tagName) {
  // Check if there is an open <createIterableHelper> element in the button scope
  if (parserContext.openElements.hasInButtonScope(parserContext.constants.initializeSyntaxHighlighting)) {
    // Close the <createIterableHelper> element if found
    parserContext._closePElement();
  }

  // Reconstruct the stack of active formatting elements
  parserContext._reconstructActiveFormattingElements();

  // Mark that a frameset is no longer allowed
  parserContext.framesetOk = false;

  // Switch the tokenizer to RAWTEXT parsing mode for the given tag
  parserContext._switchToTextParsing(tagName, parserContext.constants.MODE.RAWTEXT);
}

module.exports = handleRawTextElementParsing;