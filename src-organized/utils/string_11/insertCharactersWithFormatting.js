/**
 * Inserts characters into the document while ensuring active formatting elements are reconstructed.
 * Also marks the frameset as not allowed after insertion.
 *
 * @param {Object} documentContext - The context object representing the current document or parser state. Must provide _reconstructActiveFormattingElements and _insertCharacters methods, and a framesetOk property.
 * @param {string} characters - The string of characters to insert into the document.
 * @returns {void}
 */
function insertCharactersWithFormatting(documentContext, characters) {
  // Ensure any active formatting elements are reconstructed before inserting characters
  documentContext._reconstructActiveFormattingElements();

  // Insert the provided characters into the document
  documentContext._insertCharacters(characters);

  // After inserting characters, mark that a frameset is no longer allowed
  documentContext.framesetOk = false;
}

module.exports = insertCharactersWithFormatting;