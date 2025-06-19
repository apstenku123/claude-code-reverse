/**
 * Adds a new truncated text entry to the provided contents object, using the next available numeric key.
 * Utilizes a helper to truncate the input text and extract placeholder content, then appends this as a new entry.
 *
 * @param {string} inputText - The text to be truncated and added as a new entry.
 * @param {Object} existingContents - The current contents object, where each key is a numeric string and value is an entry object.
 * @returns {Object|undefined} An object containing the truncated text and the updated contents object, or undefined if no placeholder content is generated.
 */
function addTruncatedTextEntryToContents(inputText, existingContents) {
  // Get all numeric keys from the existing contents
  const numericKeys = Object.keys(existingContents).map(Number);
  // Determine the next available numeric key (id)
  const nextId = numericKeys.length > 0 ? Math.max(...numericKeys) + 1 : 1;

  // Truncate the input text and extract placeholder content
  const {
    truncatedText,
    placeholderContent
  } = truncateTextWithPlaceholder(inputText, nextId);

  // If no placeholder content was generated, do not add a new entry
  if (!placeholderContent) return;

  // Create a new contents object with the new entry appended
  const updatedContents = {
    ...existingContents,
    [nextId]: {
      id: nextId,
      type: "text",
      content: placeholderContent
    }
  };

  return {
    newInput: truncatedText,
    newPastedContents: updatedContents
  };
}

module.exports = addTruncatedTextEntryToContents;