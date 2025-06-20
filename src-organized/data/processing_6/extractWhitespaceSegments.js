/**
 * Extracts leading and trailing whitespace segments from a given string, distinguishing between ASCII and non-ASCII whitespace.
 *
 * The function uses a regular expression to capture:
 *   - All leading whitespace (group 1)
 *   - Leading ASCII whitespace (group 2)
 *   - Leading non-ASCII whitespace (group 3)
 *   - All trailing whitespace (group 4)
 *   - Trailing non-ASCII whitespace (group 5)
 *   - Trailing ASCII whitespace (group 6)
 *
 * @param {string} inputString - The string from which to extract whitespace segments.
 * @returns {Object} An object containing the leading and trailing whitespace segments, broken down into ASCII and non-ASCII parts.
 */
function extractWhitespaceSegments(inputString) {
  // Regular expression breakdown:
  // ^(([ \processRuleBeginHandlers\r\n]*)(\s*))  => Captures all leading whitespace (group 1),
  //                             with ASCII whitespace (group 2) and non-ASCII whitespace (group 3)
  // (?:(?=\s)[\s\s]*\s)?   => Matches the main content (non-whitespace), non-capturing
  // ((\s*?)([ \processRuleBeginHandlers\r\n]*))$ => Captures all trailing whitespace (group 4),
  //                             with non-ASCII whitespace (group 5) and ASCII whitespace (group 6)
  const whitespaceMatch = inputString.match(/^(([ \processRuleBeginHandlers\r\n]*)(\s*))(?:(?=\s)[\s\s]*\s)?((\s*?)([ \processRuleBeginHandlers\r\n]*))$/);

  return {
    leading: whitespaceMatch[1],           // All leading whitespace
    leadingAscii: whitespaceMatch[2],      // Leading ASCII whitespace (space, tab, CR, LF)
    leadingNonAscii: whitespaceMatch[3],   // Leading non-ASCII whitespace
    trailing: whitespaceMatch[4],          // All trailing whitespace
    trailingNonAscii: whitespaceMatch[5],  // Trailing non-ASCII whitespace
    trailingAscii: whitespaceMatch[6]      // Trailing ASCII whitespace (space, tab, CR, LF)
  };
}

module.exports = extractWhitespaceSegments;
