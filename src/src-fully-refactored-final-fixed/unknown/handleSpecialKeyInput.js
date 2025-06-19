/**
 * Handles special key input codes and updates the input mode or triggers actions accordingly.
 *
 * @param {number} keyCode - The key code representing the user input.
 * @returns {void}
 *
 * This function processes specific key codes (such as whitespace, quotes, and special control codes),
 * updates the global input mode, and calls helper functions to handle side effects like inserting text
 * or managing class handles.
 */
function handleSpecialKeyInput(keyCode) {
  switch (keyCode) {
    // Whitespace characters: Tab, Line Feed, Form Feed, Space
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      currentInputMode = handleKeyInput;
      break;
    // Double quote (")
    case 34:
      prepareForQuoteInput();
      currentInputMode = doubleQuoteInputMode;
      break;
    // Single quote (')
    case 39:
      prepareForQuoteInput();
      currentInputMode = singleQuoteInputMode;
      break;
    // Greater-than sign ('>')
    case 62:
      createClassHandle();
      currentInputMode = tagCloseInputMode;
      insertTextAtCursor();
      break;
    // End of input or error (-1)
    case -1:
      createClassHandle();
      insertTextAtCursor();
      finalizeInput();
      break;
    // All other characters
    default:
      createClassHandle();
      currentInputMode = literalBufferInputMode;
      break;
  }
}

module.exports = handleSpecialKeyInput;