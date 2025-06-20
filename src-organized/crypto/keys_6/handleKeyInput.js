/**
 * Handles key input codes and performs corresponding actions such as updating state, inserting text, or managing class handles.
 *
 * @param {number} keyCode - The numeric code representing the key input to handle.
 * @returns {void}
 */
function handleKeyInput(keyCode) {
  switch (keyCode) {
    // Ignore whitespace and some control keys
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      break;
    case 34:  // Double Quote (")
      // Prepare for double quote input
      prepareForQuoteInput();
      currentInputMode = doubleQuoteMode;
      break;
    case 39:  // Single Quote (')
      // Prepare for single quote input
      prepareForQuoteInput();
      currentInputMode = singleQuoteMode;
      break;
    case 62:  // Greater Than ('>')
      // Finalize current class handle, set mode, and insert text
      createClassHandle();
      currentInputMode = tagCloseMode;
      insertTextAtCursor();
      break;
    case -1:  // End of Input
      // Finalize current class handle, insert text, and reset state
      createClassHandle();
      insertTextAtCursor();
      resetInputState();
      break;
    default:
      // For all other input, finalize current class handle and set to literal mode
      createClassHandle();
      currentInputMode = literalMode;
      break;
  }
}

module.exports = handleKeyInput;