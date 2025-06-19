/**
 * Checks if a string does NOT start or end with whitespace (space or tab),
 * and does NOT contain line breaks, carriage returns, or null characters.
 * Returns true only if none of these conditions are present.
 *
 * @param {string} inputString - The string to validate.
 * @returns {boolean} True if the string does NOT contain leading/trailing whitespace or control characters; otherwise, false.
 */
function isStringWithoutWhitespaceOrControlChars(inputString) {
  // Check for leading space or tab
  const startsWithWhitespace = inputString[0] === '\processRuleBeginHandlers' || inputString[0] === ' ';
  // Check for trailing space or tab
  const endsWithWhitespace = inputString[inputString.length - 1] === '\processRuleBeginHandlers' || inputString[inputString.length - 1] === ' ';
  // Check for line breaks, carriage returns, or null characters anywhere in the string
  const containsLineBreak = inputString.includes('\n');
  const containsCarriageReturn = inputString.includes('\r');
  const containsNullChar = inputString.includes('\x00');

  // If any of the above are true, the string is invalid
  const hasInvalidChars = startsWithWhitespace || endsWithWhitespace || containsLineBreak || containsCarriageReturn || containsNullChar;

  // The original function returns true if none of the invalid conditions are present
  return hasInvalidChars === false;
}

module.exports = isStringWithoutWhitespaceOrControlChars;