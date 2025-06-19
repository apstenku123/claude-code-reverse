/**
 * Replaces a segment of text within a string at a specified index with new text, then notifies via callbacks.
 *
 * @param {string|object} replacementSource - The replacement text as a string, or an object with a 'displayText' property.
 * @param {string} originalText - The original string to modify.
 * @param {string} textToReplace - The text segment to be replaced (used for length calculation).
 * @param {number} insertIndex - The index at which to insert the replacement text.
 * @param {function} onTextChanged - Callback invoked with the new text after replacement.
 * @param {function} onCaretMoved - Callback invoked with the new caret position after replacement.
 */
function replaceTextAtIndexAndNotify(
  replacementSource,
  originalText,
  textToReplace,
  insertIndex,
  onTextChanged,
  onCaretMoved
) {
  // Determine the replacement text
  const replacementText = typeof replacementSource === "string"
    ? replacementSource
    : replacementSource.displayText;

  // Replace the specified segment in the original text with the replacement text
  const updatedText =
    originalText.substring(0, insertIndex) +
    replacementText +
    originalText.substring(insertIndex + textToReplace.length);

  // Notify that the text has changed
  onTextChanged(updatedText);

  // Calculate the new caret position after the replacement
  const newCaretPosition = insertIndex + replacementText.length;

  // Notify that the caret has moved
  onCaretMoved(newCaretPosition);
}

module.exports = replaceTextAtIndexAndNotify;