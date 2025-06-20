/**
 * Replaces a segment of text in the original string with a new display text at a specified position,
 * then invokes provided callbacks with the updated string and new cursor position.
 *
 * @param {string|object} replacementSource - The replacement text as a string, or an object containing a 'displayText' property.
 * @param {string} originalText - The original string to be modified.
 * @param {string} replacedSegment - The segment of text in the original string to be replaced.
 * @param {number} insertPosition - The index in the original string where the replacement should occur.
 * @param {function} onTextUpdate - Callback function to receive the updated string after replacement.
 * @param {function} onCursorUpdate - Callback function to receive the new cursor position after replacement.
 */
function replaceTextAtPosition(
  replacementSource,
  originalText,
  replacedSegment,
  insertPosition,
  onTextUpdate,
  onCursorUpdate
) {
  // Determine the replacement text
  const replacementText = typeof replacementSource === "string"
    ? replacementSource
    : replacementSource.displayText;

  // Replace the specified segment in the original text with the replacement text
  const updatedText =
    originalText.substring(0, insertPosition) +
    replacementText +
    originalText.substring(insertPosition + replacedSegment.length);

  // Call the callback with the updated text
  onTextUpdate(updatedText);

  // Calculate the new cursor position after the replacement
  const newCursorPosition = insertPosition + replacementText.length;

  // Call the callback with the new cursor position
  onCursorUpdate(newCursorPosition);
}

module.exports = replaceTextAtPosition;