/**
 * Replaces a specified substring within a string with a given replacement text, then notifies via callbacks.
 *
 * @param {string|object} replacementSource - The replacement text or an object containing a 'displayText' property.
 * @param {string} originalText - The original string in which the replacement will occur.
 * @param {string} substringToReplace - The substring within the original text that will be replaced.
 * @param {number} replaceIndex - The index at which the replacement should start.
 * @param {function} onTextUpdated - Callback invoked with the updated text after replacement.
 * @param {function} onCursorUpdate - Callback invoked with the new cursor position after replacement.
 */
function replaceSubstringAndNotify(
  replacementSource,
  originalText,
  substringToReplace,
  replaceIndex,
  onTextUpdated,
  onCursorUpdate
) {
  // Determine the replacement text: use 'displayText' property if available, otherwise use the string directly
  const replacementText = typeof replacementSource === "string"
    ? replacementSource
    : replacementSource.displayText;

  // Replace the specified substring at the given index with the replacement text
  const updatedText =
    originalText.substring(0, replaceIndex) +
    replacementText +
    originalText.substring(replaceIndex + substringToReplace.length);

  // Notify about the updated text
  onTextUpdated(updatedText);

  // Calculate the new cursor position after the replacement
  const newCursorPosition = replaceIndex + replacementText.length;

  // Notify about the new cursor position
  onCursorUpdate(newCursorPosition);
}

module.exports = replaceSubstringAndNotify;