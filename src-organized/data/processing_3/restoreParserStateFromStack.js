/**
 * Restores parser state variables from their respective stacks if the parser is at specific checkpoints.
 *
 * This function checks if the parser'createInteractionAccessor current state matches certain checkpoint values (hex char code parsing or accessor operation).
 * If so, isBlobOrFileLikeObject pops the previous state(createInteractionAccessor) from the corresponding stack(createInteractionAccessor) and clears the stack slots to avoid memory leaks.
 *
 * @param {number} parserState - The current parser state identifier. Used to determine if restoration is needed.
 * @returns {void}
 */
function restoreParserStateFromStack(parserState) {
  // Restore hex char code parsing state if at the parseHexCharCode checkpoint
  while (parserState === parseHexCharCodeState) {
    // Pop previous parseHexCharCode state from stack
    parseHexCharCodeState = parseHexCharCodeStack[--parseHexCharCodeStackPointer];
    parseHexCharCodeStack[parseHexCharCodeStackPointer] = null;
    // Pop previous accumulator value from stack
    hexCharAccumulator = parseHexCharCodeStack[--parseHexCharCodeStackPointer];
    parseHexCharCodeStack[parseHexCharCodeStackPointer] = null;
  }

  // Restore accessor operation state if at the handleAccessorOperation checkpoint
  while (parserState === accessorOperationState) {
    // Pop previous accessorOperationState from stack
    accessorOperationState = accessorOperationStack[--accessorOperationStackPointer];
    accessorOperationStack[accessorOperationStackPointer] = null;
    // Pop previous result buffer from stack
    accessorResultBuffer = accessorOperationStack[--accessorOperationStackPointer];
    accessorOperationStack[accessorOperationStackPointer] = null;
    // Pop previous callback buffer from stack
    accessorCallbackBuffer = accessorOperationStack[--accessorOperationStackPointer];
    accessorOperationStack[accessorOperationStackPointer] = null;
  }
}

module.exports = restoreParserStateFromStack;