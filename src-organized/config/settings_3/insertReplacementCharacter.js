/**
 * Inserts the Unicode replacement character into the provided configuration object,
 * then calls the source object'createInteractionAccessor character insertion method with the updated configuration.
 *
 * @param {Object} sourceObject - The object responsible for inserting characters (must have _insertCharacters method).
 * @param {Object} config - The configuration object to update with the replacement character.
 * @returns {void}
 */
function insertReplacementCharacter(sourceObject, config) {
  // Set the 'chars' property to the Unicode replacement character
  config.chars = j65.REPLACEMENT_CHARACTER;
  // Insert the replacement character using the source object'createInteractionAccessor method
  sourceObject._insertCharacters(config);
}

module.exports = insertReplacementCharacter;