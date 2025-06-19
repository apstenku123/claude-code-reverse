/**
 * Inserts characters into the target object and marks its frameset as invalid.
 *
 * @param {Object} targetObject - The object that will receive the inserted characters. Must implement a _insertCharacters method and have a framesetOk property.
 * @param {any} charactersToInsert - The characters or data to insert into the target object.
 * @returns {void}
 *
 * This function delegates the insertion of characters to the target object'createInteractionAccessor _insertCharacters method,
 * then sets the framesetOk property to false to indicate that the frameset is no longer valid.
 */
function insertCharactersAndInvalidateFrameset(targetObject, charactersToInsert) {
  // Insert the provided characters/data into the target object
  targetObject._insertCharacters(charactersToInsert);
  // Invalidate the frameset after insertion
  targetObject.framesetOk = false;
}

module.exports = insertCharactersAndInvalidateFrameset;