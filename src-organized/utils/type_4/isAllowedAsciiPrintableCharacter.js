/**
 * Determines if a given ASCII code corresponds to an allowed printable character.
 * Certain ASCII codes (such as quotes, brackets, and some punctuation) are explicitly disallowed.
 * All other codes in the printable ASCII range (33-126) are allowed.
 *
 * @param {number} asciiCode - The ASCII code of the character to check.
 * @returns {boolean} True if the ASCII code is allowed, false otherwise.
 */
function isAllowedAsciiPrintableCharacter(asciiCode) {
  // List of disallowed ASCII codes (e.g., quotes, brackets, some punctuation)
  const disallowedAsciiCodes = new Set([
    34, // "
    40, // (
    41, // )
    44, // ,
    47, // /
    58, // :
    59, // ;
    60, // <
    61, // =
    62, // >
    63, // ?
    64, // @
    91, // [
    92, // \
    93, // ]
    123, // {
    125  // }
  ]);

  // If the ASCII code is in the disallowed set, return false
  if (disallowedAsciiCodes.has(asciiCode)) {
    return false;
  }

  // Otherwise, allow codes in the printable ASCII range (33-126)
  return asciiCode >= 33 && asciiCode <= 126;
}

module.exports = isAllowedAsciiPrintableCharacter;