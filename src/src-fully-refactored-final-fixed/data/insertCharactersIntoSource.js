/**
 * Inserts characters into the specified source object using its internal method.
 *
 * @param {Object} sourceObject - The object that provides the _insertCharacters method.
 * @param {string} charactersToInsert - The string of characters to be inserted into the source object.
 * @returns {void}
 */
function insertCharactersIntoSource(sourceObject, charactersToInsert) {
  // Delegate the insertion of characters to the source object'createInteractionAccessor internal method
  sourceObject._insertCharacters(charactersToInsert);
}

module.exports = insertCharactersIntoSource;