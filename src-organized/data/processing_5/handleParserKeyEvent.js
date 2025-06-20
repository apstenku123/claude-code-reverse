/**
 * Handles key events in the parser, updating parser state and invoking actions based on the received key code.
 *
 * @param {number} keyCode - The key code of the pressed key to handle.
 * @returns {void}
 */
function handleParserKeyEvent(keyCode) {
  switch (keyCode) {
    // Whitespace characters: Tab, Line Feed, Form Feed, Space
    case 9:   // Tab
    case 10:  // Line Feed
    case 12:  // Form Feed
    case 32:  // Space
      // Set parser state to handle accessor key event
      parserState = handleAccessorKeyEvent;
      break;
    case 34:  // Double Quote (")
      // Prepare for attribute value parsing (double-quoted)
      prepareAttributeParsing();
      parserState = attributeValueDoubleQuoted;
      break;
    case 39:  // Single Quote (')
      // Prepare for attribute value parsing (single-quoted)
      prepareAttributeParsing();
      parserState = attributeValueSingleQuoted;
      break;
    case 62:  // Greater Than ('>')
      // Finalize tag, set parser state, and insert text at cursor
      createClassHandle();
      parserState = tagClose;
      insertTextAtCursor();
      break;
    case -1:  // End of input
      // Finalize tag, insert text, and perform cleanup
      createClassHandle();
      insertTextAtCursor();
      cleanupParser();
      break;
    default:
      // For any other character, finalize tag and set parser state to handle literal body
      createClassHandle();
      parserState = literalBody;
      break;
  }
}

module.exports = handleParserKeyEvent;