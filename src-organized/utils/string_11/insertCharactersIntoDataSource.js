/**
 * Inserts characters into the specified data source by delegating to its _insertCharacters method.
 *
 * @param {Object} dataSource - The target object that contains the _insertCharacters method.
 * @param {string} characters - The string of characters to insert into the data source.
 * @returns {void}
 */
function insertCharactersIntoDataSource(dataSource, characters) {
  // Delegate the insertion of characters to the dataSource'createInteractionAccessor _insertCharacters method
  dataSource._insertCharacters(characters);
}

module.exports = insertCharactersIntoDataSource;