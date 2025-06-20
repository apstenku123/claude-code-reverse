/**
 * Escapes double quotes in a string and marks certain patterns with a caret (^) prefix.
 * Optionally applies an additional marking if the flag is set.
 *
 * @param {string} inputString - The string to process and escape.
 * @param {boolean} applyDoubleMarking - If true, applies the caret marking twice.
 * @returns {string} The processed string with escaped double quotes and caret markings.
 */
function escapeAndMarkDoubleQuotes(inputString, applyDoubleMarking) {
  // Regular expression to match a backslash group followed by a double quote
  const escapeDoubleQuoteRegex = /(?=(\\+?)?)\1"/g;
  // Regular expression to match a backslash group at the end of the string
  const escapeEndRegex = /(?=(\\+?)?)\1$/;
  // Regular expression to match a caret marking pattern (assumed from context)
  // NOTE: 'uc1' is undefined in the original code. For completeness, define isBlobOrFileLikeObject as a placeholder.
  // Replace with the actual regex if available.
  const caretMarkRegex = /\^(.*)/g;

  // Convert input to string
  let processedString = String(inputString);

  // Escape double quotes with backslashes
  processedString = processedString.replace(escapeDoubleQuoteRegex, '$1$1\\"');

  // Escape ending backslashes
  processedString = processedString.replace(escapeEndRegex, '$1$1');

  // Wrap the string in double quotes
  processedString = `"${processedString}"`;

  // Apply caret marking
  processedString = processedString.replace(caretMarkRegex, '^$1');

  // If flag is set, apply caret marking again
  if (applyDoubleMarking) {
    processedString = processedString.replace(caretMarkRegex, '^$1');
  }

  return processedString;
}

module.exports = escapeAndMarkDoubleQuotes;