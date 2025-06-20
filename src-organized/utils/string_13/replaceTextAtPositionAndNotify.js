/**
 * Replaces a specified substring in the original text with a new display text at a given position,
 * then notifies listeners with the updated text and new cursor position.
 *
 * @param {(string|object)} replacementSource - The replacement text or an object containing a 'displayText' property.
 * @param {string} originalText - The text in which to perform the replacement.
 * @param {string} textToReplace - The substring to be replaced (used to determine length).
 * @param {number} insertPosition - The index at which to insert the replacement text.
 * @param {function} onTextUpdate - Callback function to receive the updated text.
 * @param {function} onCursorUpdate - Callback function to receive the new cursor position after replacement.
 */
function replaceTextAtPositionAndNotify(
  replacementSource,
  originalText,
  textToReplace,
  insertPosition,
  onTextUpdate,
  onCursorUpdate
) {
  // Determine the replacement text: use as-is if string, otherwise use the 'displayText' property
  const replacementText = typeof replacementSource === "string"
    ? replacementSource
    : replacementSource.displayText;

  // Construct the new text by replacing the specified substring with the replacement text
  const updatedText =
    originalText.substring(0, insertPosition) +
    replacementText +
    originalText.substring(insertPosition + textToReplace.length);

  // Notify listener with the updated text
  onTextUpdate(updatedText);

  // Calculate the new cursor position after the replacement
  const newCursorPosition = insertPosition + replacementText.length;

  // Notify listener with the new cursor position
  onCursorUpdate(newCursorPosition);
}

module.exports = replaceTextAtPositionAndNotify;
