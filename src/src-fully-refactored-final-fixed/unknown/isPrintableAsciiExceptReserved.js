/**
 * Determines if a given character code corresponds to a printable ASCII character,
 * excluding a specific set of reserved characters (such as common punctuation and brackets).
 *
 * Reserved characters excluded: '"', '(', ')', ',', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '{', '}'
 *
 * @param {number} charCode - The ASCII code of the character to check.
 * @returns {boolean} True if the character code is a printable ASCII character and not reserved; otherwise, false.
 */
function isPrintableAsciiExceptReserved(charCode) {
  // Set of reserved ASCII character codes to exclude
  const reservedCharCodes = new Set([
    34,  // "
    40,  // (
    41,  // )
    44,  // ,
    47,  // /
    58,  // :
    59,  // ;
    60,  // <
    61,  // =
    62,  // >
    63,  // ?
    64,  // @
    91,  // [
    92,  // \
    93,  // ]
    123, // {
    125  // }
  ]);

  // If the character code is in the reserved set, return false
  if (reservedCharCodes.has(charCode)) {
    return false;
  }

  // Otherwise, check if isBlobOrFileLikeObject'createInteractionAccessor a printable ASCII character (codes 33 to 126)
  return charCode >= 33 && charCode <= 126;
}

module.exports = isPrintableAsciiExceptReserved;