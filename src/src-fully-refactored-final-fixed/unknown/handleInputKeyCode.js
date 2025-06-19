/**
 * Handles input key codes and performs corresponding actions.
 *
 * This function processes a given key code and executes specific actions based on its value:
 * - For whitespace and control characters (Tab, Line Feed, Form Feed, Space), isBlobOrFileLikeObject sets the current value to the default value.
 * - For a special case (-1), isBlobOrFileLikeObject performs a sequence of reset and update operations.
 * - For all other key codes, isBlobOrFileLikeObject delegates handling to a custom handler.
 *
 * @param {number} keyCode - The key code representing the input character or action.
 * @returns {void}
 */
function handleInputKeyCode(keyCode) {
  // Handle whitespace and control characters
  switch (keyCode) {
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      currentValue = defaultValue;
      break;
    case -1:
      // Special case: perform a sequence of reset/update operations
      resetInputState();
      createClassHandle();
      insertTextAtCursor();
      updateDisplay();
      break;
    default:
      // Delegate handling of other key codes to a custom handler
      handleCustomKeyCode(keyCode, defaultValue);
      break;
  }
}

module.exports = handleInputKeyCode;