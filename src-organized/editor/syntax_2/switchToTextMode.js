/**
 * Switches the parser to text mode (RCDATA), inserts an HTML element, and updates parser state flags.
 *
 * @param {Object} parserContext - The parser context object containing state and methods for parsing.
 * @param {Object} htmlElement - The HTML element to insert into the parser context.
 * @returns {void}
 */
function switchToTextMode(parserContext, htmlElement) {
  // Insert the specified HTML element into the parser context using the provided method and HTML namespace
  parserContext._insertElement(htmlElement, u2.HTML);

  // Indicate that the next new line should be skipped
  parserContext.skipNextNewLine = true;

  // Set the tokenizer state to RCDATA mode
  parserContext.tokenizer.state = e1.MODE.RCDATA;

  // Store the current insertion mode as the original insertion mode
  parserContext.originalInsertionMode = parserContext.insertionMode;

  // Mark that a frameset is not allowed in this context
  parserContext.framesetOk = false;

  // Set the parser'createInteractionAccessor insertion mode to text mode
  parserContext.insertionMode = "TEXT_MODE";
}

module.exports = switchToTextMode;