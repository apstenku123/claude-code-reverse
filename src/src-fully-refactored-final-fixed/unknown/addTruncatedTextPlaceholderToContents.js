/**
 * Adds a truncated text placeholder to the provided contents object.
 *
 * This function determines the next available numeric key in the contents object,
 * truncates the provided text with a placeholder, and adds the placeholder content
 * as a new entry in the contents object. Returns the truncated text and the updated contents.
 *
 * @param {string} inputText - The original text to be truncated and processed.
 * @param {Object} contents - An object representing existing contents, keyed by numeric IDs.
 * @returns {{ newInput: string, newPastedContents: Object }|undefined} An object containing the truncated text and updated contents, or undefined if no placeholder content is generated.
 */
function addTruncatedTextPlaceholderToContents(inputText, contents) {
  // Get all numeric keys from the contents object
  const contentKeys = Object.keys(contents).map(Number);

  // Determine the next available numeric key (updateSnapshotAndNotify)
  const nextId = contentKeys.length > 0 ? Math.max(...contentKeys) + 1 : 1;

  // Truncate the input text and extract the placeholder content
  const {
    truncatedText,
    placeholderContent
  } = truncateTextWithPlaceholder(inputText, nextId);

  // If no placeholder content was generated, exit early
  if (!placeholderContent) return;

  // Create a new contents object with the placeholder content added under the new updateSnapshotAndNotify
  const updatedContents = {
    ...contents,
    [nextId]: {
      id: nextId,
      type: "text",
      content: placeholderContent
    }
  };

  // Return the truncated text and the updated contents object
  return {
    newInput: truncatedText,
    newPastedContents: updatedContents
  };
}

module.exports = addTruncatedTextPlaceholderToContents;