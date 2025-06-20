/**
 * Processes the input string by removing the last character, replacing special characters,
 * and updating global state variables. Also calls an external handler with the processed string.
 *
 * @param {any} context - The context or state object (purpose depends on external usage)
 * @param {string} inputString - The string to process and replace special characters in
 * @param {boolean} shouldSkipLastChar - If true, adjusts the global counter differently
 * @returns {void}
 */
function processAndReplaceSpecialCharacters(context, inputString, shouldSkipLastChar) {
  // Get the length of the input string
  const inputLength = inputString.length;

  // Adjust the global counter zA based on shouldSkipLastChar
  if (shouldSkipLastChar) {
    zA += inputLength - 1;
  } else {
    zA += inputLength;
  }

  // Remove the last character from the input string
  let processedString = inputString.substring(0, inputLength - 1);

  // Replace all null characters with the replacement character
  processedString = processedString.replace(/\u0000/g, "�");

  // Replace Windows CRLF (\r\n) and standalone CR (\r) with a newline
  processedString = processedString.replace(/\u000D\u000A/g, `\n`);
  processedString = processedString.replace(/\u000D/g, `\n`);

  // Call external handler with processed string
  C2(IE, processedString);

  // Update global state variable renderToolUseConfirmationDialog to O9
  renderToolUseConfirmationDialog = O9;
}

module.exports = processAndReplaceSpecialCharacters;