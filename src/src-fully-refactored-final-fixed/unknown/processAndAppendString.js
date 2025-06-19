/**
 * Processes an input string by cleaning control characters, updates a global counter, and appends the result to a buffer.
 *
 * @param {any} context - The context or buffer to which the processed string will be appended (not used directly in this function, but may be used by C2).
 * @param {string} inputString - The string to process and append.
 * @param {boolean} shouldOmitLastChar - If true, omits the last character of the input string when processing.
 * @returns {void}
 */
function processAndAppendString(context, inputString, shouldOmitLastChar) {
  // Calculate the length of the input string
  const inputLength = inputString.length;

  // Update the global zA counter based on whether the last character is omitted
  if (shouldOmitLastChar) {
    zA += inputLength - 1;
  } else {
    zA += inputLength;
  }

  // Extract the substring, omitting the last character if specified
  let processedString = inputString.substring(0, inputLength - 1);

  // Replace all null characters with the replacement character
  processedString = processedString.replace(/\u0000/g, "�");

  // Replace carriage return + line feed and carriage return with a newline
  processedString = processedString.replace(/\u000D\u000A/g, "\n");
  processedString = processedString.replace(/\u000D/g, "\n");

  // Append the processed string to the buffer using C2
  C2(IE, processedString);

  // Set the global renderToolUseConfirmationDialog variable to O9 (possibly to update state)
  renderToolUseConfirmationDialog = O9;
}

module.exports = processAndAppendString;