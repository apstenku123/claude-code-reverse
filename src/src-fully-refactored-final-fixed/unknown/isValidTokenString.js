/**
 * Checks if the input string is a valid token according to specific character rules.
 *
 * a valid token:
 *   - Is not empty
 *   - Contains only printable ASCII characters (33-126)
 *   - Does NOT contain any of the following characters:
 *     '"' (34), '(' (40), ')' (41), ',' (44), '/' (47), ':' (58), ';' (59),
 *     '<' (60), '=' (61), '>' (62), '?' (63), '@' (64), '[' (91), '\\' (92),
 *     ']' (93), '{' (123), '}' (125)
 *
 * @param {string} inputString - The string to validate as a token.
 * @returns {boolean} True if the string is a valid token, false otherwise.
 */
function isValidTokenString(inputString) {
  // Return false if the string is empty
  if (inputString.length === 0) return false;

  // Set of forbidden character codes
  const forbiddenCharCodes = new Set([
    34,  // '"'
    40,  // '('
    41,  // ')'
    44,  // ','
    47,  // '/'
    58,  // ':'
    59,  // ';'
    60,  // '<'
    61,  // '='
    62,  // '>'
    63,  // '?'
    64,  // '@'
    91,  // '['
    92,  // '\\'
    93,  // ']'
    123, // '{'
    125  // '}'
  ]);

  // Check each character in the string
  for (let index = 0; index < inputString.length; ++index) {
    const charCode = inputString.charCodeAt(index);
    // Check if character is outside printable ASCII range or is forbidden
    if (
      charCode < 33 ||
      charCode > 126 ||
      forbiddenCharCodes.has(charCode)
    ) {
      return false;
    }
  }
  // All checks passed; string is a valid token
  return true;
}

module.exports = isValidTokenString;
