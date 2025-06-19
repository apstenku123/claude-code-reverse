/**
 * Handles system accessor logic based on the provided character code and keyword.
 *
 * This function updates global parser state variables and invokes helper functions
 * depending on the input character code and keyword. It is used to process
 * system and public identifiers in markup declarations.
 *
 * @param {number} charCode - The character code being processed (e.g., from a parser loop).
 * @param {string} keyword - The current keyword or token string being evaluated.
 * @param {any} unusedParam - Unused parameter, reserved for future use or compatibility.
 * @returns {void}
 */
function setSystemAccessor(charCode, keyword, unusedParam) {
  switch (charCode) {
    // Whitespace characters: TAB (9), LF (10), FF (12), SPACE (32)
    case 9:
    case 10:
    case 12:
    case 32:
      // Advance the parser index for whitespace
      parserIndex += 1;
      break;
    // '>' character (62) indicates end of declaration
    case 62:
      parserState = markupDeclarationState;
      parserIndex += 1;
      handleMarkupDeclarationEnd();
      break;
    // End of input (-1)
    case -1:
      createClassHandle();
      handleMarkupDeclarationEnd();
      handleEndOfInput();
      break;
    default:
      // Normalize keyword to uppercase for comparison
      const upperKeyword = keyword.toUpperCase();
      if (upperKeyword === "PUBLIC") {
        // PUBLIC identifier found
        parserIndex += 6;
        parserState = publicIdentifierState;
      } else if (upperKeyword === "SYSTEM") {
        // SYSTEM identifier found
        parserIndex += 6;
        parserState = systemIdentifierState;
      } else {
        // Unknown keyword: fallback to error handling
        createClassHandle();
        parserState = fallbackState;
      }
      break;
  }
}

module.exports = setSystemAccessor;