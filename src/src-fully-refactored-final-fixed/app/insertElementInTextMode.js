/**
 * Inserts an HTML element into the DOM and prepares the parser for text mode.
 * 
 * This function inserts a given element into the parser'createInteractionAccessor DOM tree, sets the parser to skip the next newline,
 * switches the tokenizer state to RCDATA mode, saves the current insertion mode, disables frameset parsing,
 * and sets the parser'createInteractionAccessor insertion mode to TEXT_MODE. This is typically used when handling elements like <textarea> or <title>.
 *
 * @param {object} parserContext - The parser context object containing the DOM and parsing state.
 * @param {object} elementToInsert - The element to be inserted into the DOM.
 * @returns {void}
 */
function insertElementInTextMode(parserContext, elementToInsert) {
  // Insert the element into the DOM tree using the parser'createInteractionAccessor method and HTML namespace
  parserContext._insertElement(elementToInsert, u2.HTML);

  // Instruct the parser to skip the next newline character
  parserContext.skipNextNewLine = true;

  // Switch the tokenizer state to RCDATA mode for text content parsing
  parserContext.tokenizer.state = e1.MODE.RCDATA;

  // Save the current insertion mode for later restoration
  parserContext.originalInsertionMode = parserContext.insertionMode;

  // Disallow frameset parsing in this context
  parserContext.framesetOk = false;

  // Set the parser'createInteractionAccessor insertion mode to TEXT_MODE
  parserContext.insertionMode = "TEXT_MODE";
}

module.exports = insertElementInTextMode;