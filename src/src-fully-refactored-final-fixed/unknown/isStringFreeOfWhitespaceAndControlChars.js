/**
 * Checks if a string does NOT start or end with whitespace (space or tab),
 * and does NOT contain line breaks, carriage returns, or null characters.
 * Returns true if the string is free of these characters, false otherwise.
 *
 * @param {string} inputString - The string to validate.
 * @returns {boolean} True if the string is free of leading/trailing whitespace and control characters, false otherwise.
 */
function isStringFreeOfWhitespaceAndControlChars(inputString) {
  // Check if the first or last character is a space or tab
  const hasLeadingWhitespace = inputString[0] === '\processRuleBeginHandlers' || inputString[0] === ' ';
  const hasTrailingWhitespace = inputString[inputString.length - 1] === '\processRuleBeginHandlers' || inputString[inputString.length - 1] === ' ';

  // Check for line breaks, carriage returns, or null characters anywhere in the string
  const containsLineBreak = inputString.includes('\n');
  const containsCarriageReturn = inputString.includes('\r');
  const containsNullChar = inputString.includes('\x00');

  // If any of the above are true, the string is NOT free of these characters
  const hasInvalidChars = hasLeadingWhitespace || hasTrailingWhitespace || containsLineBreak || containsCarriageReturn || containsNullChar;

  // Return true if string is free of invalid characters, false otherwise
  return hasInvalidChars === false;
}

module.exports = isStringFreeOfWhitespaceAndControlChars;