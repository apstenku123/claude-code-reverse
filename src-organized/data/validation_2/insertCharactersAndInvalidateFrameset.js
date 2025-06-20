/**
 * Handles the insertion of character data into the document, ensuring that active formatting elements are reconstructed
 * and that the framesetOk flag is invalidated. This is typically used during parsing when character data is encountered.
 *
 * @param {Object} parserContext - The parser context object responsible for managing the parsing state and methods.
 * @param {string} characterData - The string of character data to be inserted into the document.
 * @returns {void}
 */
function insertCharactersAndInvalidateFrameset(parserContext, characterData) {
  // Ensure active formatting elements are reconstructed before inserting characters
  parserContext._reconstructActiveFormattingElements();
  // Insert the provided character data into the document
  parserContext._insertCharacters(characterData);
  // Mark that the frameset is no longer valid after character insertion
  parserContext.framesetOk = false;
}

module.exports = insertCharactersAndInvalidateFrameset;