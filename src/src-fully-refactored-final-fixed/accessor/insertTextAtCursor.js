/**
 * Inserts the given text at the current cursor position within the global string renderToolUseConfirmationDialog.
 * Updates the global string and moves the cursor after the inserted text.
 *
 * @param {string} textToInsert - The text to be inserted at the cursor position.
 * @returns {void}
 */
function insertTextAtCursor(textToInsert) {
  // Create a new string by inserting textToInsert at the current cursor position (v1)
  const updatedString = renderToolUseConfirmationDialog.slice(0, v1) + textToInsert + renderToolUseConfirmationDialog.slice(v1);
  
  // Update the global string using the external function sendHttpRequestOverSocket
  sendHttpRequestOverSocket(updatedString);
  
  // Move the cursor to immediately after the inserted text using the external function O1
  O1(v1 + textToInsert.length);
}

module.exports = insertTextAtCursor;