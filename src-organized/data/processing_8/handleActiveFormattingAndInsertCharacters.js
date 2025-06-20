/**
 * Handles the reconstruction of active formatting elements and inserts characters into the document.
 * Also marks the frameset as not allowed after character insertion.
 *
 * @param {Object} parserContext - The parser context object containing document state and methods.
 * @param {string} characters - The string of characters to be inserted into the document.
 * @returns {void}
 */
function handleActiveFormattingAndInsertCharacters(parserContext, characters) {
  // Reconstruct active formatting elements as per the parsing algorithm
  parserContext._reconstructActiveFormattingElements();
  // Insert the provided characters into the document
  parserContext._insertCharacters(characters);
  // After inserting characters, frameset is no longer allowed
  parserContext.framesetOk = false;
}

module.exports = handleActiveFormattingAndInsertCharacters;