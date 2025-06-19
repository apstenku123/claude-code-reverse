/**
 * Ensures the active formatting elements are reconstructed and then inserts the given characters.
 *
 * @param {Object} documentHandler - The object responsible for document manipulation, expected to have
 *   _reconstructActiveFormattingElements and _insertCharacters methods.
 * @param {string} characters - The string of characters to insert after reconstructing formatting elements.
 * @returns {void}
 */
function reconstructFormattingAndInsertCharacters(documentHandler, characters) {
  // Reconstruct any active formatting elements before inserting new characters
  documentHandler._reconstructActiveFormattingElements();
  // Insert the provided characters into the document
  documentHandler._insertCharacters(characters);
}

module.exports = reconstructFormattingAndInsertCharacters;