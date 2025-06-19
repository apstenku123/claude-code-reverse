/**
 * Processes a markup token and updates the parser state accordingly.
 *
 * This function examines the current token in the markup parsing process and determines
 * the appropriate parser state transition based on the token'createInteractionAccessor content. It handles
 * special cases such as comments, DOCTYPE declarations, and CDATA sections.
 *
 * @param {string} parserInput - The full input string being parsed (unused in this function but may be required for context).
 * @param {string} currentToken - The current token or substring being analyzed.
 * @param {any} parserContext - The parser context or state object (unused in this function but may be required for context).
 * @returns {void}
 */
function processMarkupToken(parserInput, currentToken, parserContext) {
  // Check if the current token starts with '--', indicating a comment
  if (currentToken[0] === '-' && currentToken[1] === '-') {
    parserPosition += 2; // Advance the parser position by 2 to skip '--'
    resetParserState();   // Call function to reset parser state
    parserState = COMMENT_STATE; // Set parser state to comment handling
    return;
  }

  // Check for DOCTYPE declaration (case-insensitive)
  if (currentToken.toUpperCase() === 'DOCTYPE') {
    parserPosition += 7; // Advance parser position by length of 'DOCTYPE'
    parserState = DOCTYPE_STATE; // Set parser state to DOCTYPE handling
  }
  // Check for CDATA section
  else if (currentToken === '[CDATA[' && isInsideCDATASection()) {
    parserPosition += 7; // Advance parser position by length of '[CDATA['
    parserState = CDATA_STATE; // Set parser state to CDATA handling
  }
  // Default case: set to generic markup state
  else {
    parserState = GENERIC_MARKUP_STATE;
  }
}

module.exports = processMarkupToken;