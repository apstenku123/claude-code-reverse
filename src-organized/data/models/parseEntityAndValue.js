/**
 * Parses an entity name and its quoted value from a character array starting at a given index.
 *
 * The function extracts a contiguous sequence of non-space, non-quote characters as the entity name,
 * then expects a quoted value (either single or double quotes), and extracts the value inside the quotes.
 * Throws an error if the entity name contains spaces (external entities are not supported).
 *
 * @param {string[]} charArray - The array of characters to parse from.
 * @param {number} startIndex - The index at which to start parsing.
 * @returns {[string, string, number]} An array containing the entity name, its value, and the index after the closing quote.
 * @throws {Error} If the entity name contains spaces.
 */
function parseEntityAndValue(charArray, startIndex) {
  let entityName = "";
  let currentIndex = startIndex;

  // Extract entity name until a quote or end of array is reached
  while (
    currentIndex < charArray.length &&
    charArray[currentIndex] !== "'" &&
    charArray[currentIndex] !== '"'
  ) {
    entityName += charArray[currentIndex];
    currentIndex++;
  }

  entityName = entityName.trim();

  // Entity names with spaces are not supported
  if (entityName.indexOf(" ") !== -1) {
    throw new Error("External entites are not supported");
  }

  // The next character should be the quote character
  const quoteChar = charArray[currentIndex++];
  let entityValue = "";

  // Extract value until the matching quote is found
  while (
    currentIndex < charArray.length &&
    charArray[currentIndex] !== quoteChar
  ) {
    entityValue += charArray[currentIndex];
    currentIndex++;
  }

  // Return the entity name, value, and the index after the closing quote
  return [entityName, entityValue, currentIndex];
}

module.exports = parseEntityAndValue;