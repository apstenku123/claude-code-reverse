/**
 * Handles key events for an accessor, performing actions based on the key code received.
 *
 * Depending on the key code, this function may update the current parser state,
 * insert text at the cursor, or perform cleanup operations. It delegates to helper functions
 * for class handle creation, text insertion, and state management.
 *
 * @param {number} keyCode - The key code representing the user'createInteractionAccessor key event.
 * @returns {void}
 */
function handleAccessorKeyEvent(keyCode) {
  switch (keyCode) {
    // Whitespace and common non-action keys: Tab, Line Feed, Form Feed, Space
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      // No action needed for these keys
      break;
    case 34:  // Double Quote (")
      // Prepare for double-quoted string parsing
      prepareForStringParsing();
      parserState = parserStateDoubleQuote;
      break;
    case 39:  // Single Quote (')
      // Prepare for single-quoted string parsing
      prepareForStringParsing();
      parserState = parserStateSingleQuote;
      break;
    case 62:  // Greater Than ('>')
      // Finalize current class handle, set parser state, and insert text at cursor
      createClassHandle();
      parserState = parserStateTagClose;
      insertTextAtCursor();
      break;
    case -1:  // End of Input
      // Finalize class handle, insert text, and perform cleanup
      createClassHandle();
      insertTextAtCursor();
      cleanupAfterInputEnd();
      break;
    default:
      // For all other keys, finalize class handle and set parser to default state
      createClassHandle();
      parserState = parserStateDefault;
      break;
  }
}

module.exports = handleAccessorKeyEvent;