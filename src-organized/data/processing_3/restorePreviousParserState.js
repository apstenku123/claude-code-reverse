/**
 * Restores the previous parser state from the parser state stack.
 *
 * @param {Object} parserContext - The parser context object whose 'current' property will be updated.
 * @returns {void}
 *
 * @description
 * If there is a previous parser state available (parserStateStackIndex >= 0),
 * this function assigns the top state from the parserStateStack to the parserContext.current property,
 * clears that slot in the stack, and decrements the stack index.
 */
function restorePreviousParserState(parserContext) {
  // Check if there is a previous state to restore
  if (parserStateStackIndex >= 0) {
    // Restore the previous state to the parser context
    parserContext.current = parserStateStack[parserStateStackIndex];
    // Clear the restored state from the stack
    parserStateStack[parserStateStackIndex] = null;
    // Move the stack pointer down
    parserStateStackIndex--;
  }
}

module.exports = restorePreviousParserState;