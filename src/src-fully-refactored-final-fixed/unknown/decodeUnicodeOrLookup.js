/**
 * Decodes a string representing a Unicode character (in either '\uXXXX' or '\u{XXXXXX}' or '\xXX' format),
 * or looks up the string in a provided map if not a Unicode escape.
 *
 * @param {string} input - The string to decode or look up. Can be a Unicode escape sequence or a key for lookup.
 * @returns {string} The decoded character if input is a Unicode escape, or the mapped value, or the original input.
 */
function decodeUnicodeOrLookup(input) {
  const startsWithUnicode = input[0] === 'u';
  const isBracketedUnicode = input[1] === '{';

  // Handle '\uXXXX' (length 5) or '\xXX' (length 3) style escapes
  if ((startsWithUnicode && !isBracketedUnicode && input.length === 5) || (input[0] === 'x' && input.length === 3)) {
    // Parse the hex part and convert to character
    return String.fromCharCode(parseInt(input.slice(1), 16));
  }

  // Handle '\u{XXXXXX}' style escapes
  if (startsWithUnicode && isBracketedUnicode) {
    // Parse the hex part inside the brackets and convert to character
    return String.fromCodePoint(parseInt(input.slice(2, -1), 16));
  }

  // Fallback: look up in xB5 map, or return the input as-is
  return xB5.get(input) || input;
}

module.exports = decodeUnicodeOrLookup;
