/**
 * Inserts the specified content into the source string at the given offset, replacing a specified number of characters.
 *
 * @param {string} sourceString - The original string where content will be inserted.
 * @param {Object} insertConfig - Configuration object specifying insertion details.
 * @param {number} insertConfig.offset - The position in the string where the content should be inserted.
 * @param {number} insertConfig.length - The number of characters to replace starting from the offset.
 * @param {string} insertConfig.content - The content to insert into the source string.
 * @returns {string} The resulting string after the content has been inserted and the specified characters replaced.
 */
function insertContentAtOffset(sourceString, insertConfig) {
  // Extract the part of the string before the insertion point
  const beforeInsertion = sourceString.substring(0, insertConfig.offset);

  // Extract the part of the string after the replaced section
  const afterInsertion = sourceString.substring(insertConfig.offset + insertConfig.length);

  // Concatenate the parts with the new content in between
  return beforeInsertion + insertConfig.content + afterInsertion;
}

module.exports = insertContentAtOffset;
