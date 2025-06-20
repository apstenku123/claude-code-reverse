/**
 * Processes a single character/token in the context of parsing a DOCTYPE declaration.
 * Updates parser state and invokes relevant handlers based on the character code and keyword.
 *
 * @param {number} charCode - The character code of the current character being processed.
 * @param {string} keyword - The current keyword or token (e.g., 'PUBLIC', 'SYSTEM').
 * @param {any} unusedParam - (Unused) Reserved for future use or compatibility.
 * @returns {void}
 */
function handleDoctypeToken(charCode, keyword, unusedParam) {
  // Whitespace character codes: Tab (9), Line Feed (10), Form Feed (12), Space (32)
  switch (charCode) {
    case 9: // Tab
    case 10: // Line Feed
    case 12: // Form Feed
    case 32: // Space
      doctypeIndex += 1;
      break;
    case 62: // '>' character, end of DOCTYPE
      doctypeState = DOCTYPE_STATE_AFTER;
      doctypeIndex += 1;
      handleDoctypeEnd();
      break;
    case -1: // End of input
      handleClassHandleCreation();
      handleDoctypeEnd();
      handleDoctypeError();
      break;
    default:
      // Check for PUBLIC or SYSTEM keywords (case-insensitive)
      const upperKeyword = keyword.toUpperCase();
      if (upperKeyword === "PUBLIC") {
        doctypeIndex += 6;
        doctypeState = DOCTYPE_STATE_PUBLIC;
      } else if (upperKeyword === "SYSTEM") {
        doctypeIndex += 6;
        doctypeState = DOCTYPE_STATE_SYSTEM;
      } else {
        handleClassHandleCreation();
        doctypeState = DOCTYPE_STATE_INVALID;
      }
      break;
  }
}

module.exports = handleDoctypeToken;