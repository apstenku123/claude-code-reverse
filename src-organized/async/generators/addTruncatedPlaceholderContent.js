/**
 * Adds a new text entry with placeholder content to an existing collection, using a truncated version of the input text.
 *
 * @param {string} inputText - The original text to be truncated and added.
 * @param {Object} existingContents - The current collection of content entries, keyed by numeric IDs.
 * @returns {Object|undefined} An object containing the truncated text and the updated contents, or undefined if no placeholder content was generated.
 */
function addTruncatedPlaceholderContent(inputText, existingContents) {
  // Extract all numeric keys from the existing contents
  const existingKeys = Object.keys(existingContents).map(Number);

  // Determine the next available numeric updateSnapshotAndNotify
  const nextId = existingKeys.length > 0 ? Math.max(...existingKeys) + 1 : 1;

  // Truncate the input text and generate placeholder content
  // truncateTextWithPlaceholder returns { truncatedText, placeholderContent }
  const {
    truncatedText,
    placeholderContent
  } = truncateTextWithPlaceholder(inputText, nextId);

  // If no placeholder content was generated, return undefined
  if (!placeholderContent) return;

  // Create a new contents object with the new entry added
  const updatedContents = {
    ...existingContents,
    [nextId]: {
      id: nextId,
      type: "text",
      content: placeholderContent
    }
  };

  // Return the truncated text and the updated contents
  return {
    newInput: truncatedText,
    newPastedContents: updatedContents
  };
}

module.exports = addTruncatedPlaceholderContent;