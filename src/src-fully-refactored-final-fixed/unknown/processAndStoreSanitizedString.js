/**
 * Processes an input string by sanitizing control characters, updates a global counter, and stores the result.
 *
 * @param {any} context - The context or state object (purpose depends on external usage).
 * @param {string} inputString - The string to be sanitized and processed.
 * @param {boolean} shouldAdjustCounter - Whether to adjust the global counter by input length minus one or by input length.
 * @returns {void}
 */
function processAndStoreSanitizedString(context, inputString, shouldAdjustCounter) {
  // Calculate the length of the input string
  const inputLength = inputString.length;

  // Update the global counter zA based on shouldAdjustCounter flag
  if (shouldAdjustCounter) {
    zA += inputLength - 1;
  } else {
    zA += inputLength;
  }

  // Extract the substring excluding the last character
  let sanitizedString = inputString.substring(0, inputLength - 1);

  // Replace null characters with replacement character
  sanitizedString = sanitizedString.replace(/\u0000/g, "�");
  // Replace CRLF with newline
  sanitizedString = sanitizedString.replace(/\u000D\u000A/g, "\n");
  // Replace CR with newline
  sanitizedString = sanitizedString.replace(/\u000D/g, "\n");

  // Store the sanitized string using external function C2
  C2(IE, sanitizedString);

  // Set global variable renderToolUseConfirmationDialog to O9 (purpose depends on external context)
  renderToolUseConfirmationDialog = O9;
}

module.exports = processAndStoreSanitizedString;