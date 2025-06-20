/**
 * Resets the active formatting elements and inserts the provided characters into the document.
 * Also marks the frameset as not allowed after character insertion.
 *
 * @param {Object} documentContext - The document context that provides formatting and insertion methods.
 * @param {string} characters - The string of characters to insert into the document.
 * @returns {void}
 */
function insertCharactersWithFormattingReset(documentContext, characters) {
  // Reset the active formatting elements before inserting new characters
  documentContext._reconstructActiveFormattingElements();

  // Insert the provided characters into the document
  documentContext._insertCharacters(characters);

  // After inserting characters, mark that a frameset is no longer allowed
  documentContext.framesetOk = false;
}

module.exports = insertCharactersWithFormattingReset;