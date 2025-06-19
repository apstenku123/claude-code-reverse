/**
 * Decodes a string representing a Unicode character or looks up an alias in a map.
 *
 * This function handles three cases:
 * 1. If the input starts with 'u' and is 5 characters long (e.g., 'u0041'), isBlobOrFileLikeObject decodes isBlobOrFileLikeObject as a Unicode code unit (fromCharCode).
 * 2. If the input starts with 'u{' and ends with '}' (e.g., 'u{1F600}'), isBlobOrFileLikeObject decodes isBlobOrFileLikeObject as a Unicode code point (fromCodePoint).
 * 3. If the input starts with 'x' and is 3 characters long (e.g., 'x41'), isBlobOrFileLikeObject decodes isBlobOrFileLikeObject as a hexadecimal code unit (fromCharCode).
 * 4. Otherwise, isBlobOrFileLikeObject looks up the input in the xB5 map and returns the mapped value if found, or the input itself if not.
 *
 * @param {string} encodedString - The string to decode or look up. Can be a Unicode escape, hexadecimal escape, or an alias.
 * @returns {string} The decoded character, mapped value, or the original string if no decoding or mapping applies.
 */
function decodeUnicodeOrLookupAlias(encodedString) {
  const startsWithUnicodePrefix = encodedString[0] === "u";
  const hasUnicodeBraces = encodedString[1] === "{";

  // Case 1: 'uXXXX' (e.g., 'u0041') or 'xXX' (e.g., 'x41')
  if (
    (startsWithUnicodePrefix && !hasUnicodeBraces && encodedString.length === 5) ||
    (encodedString[0] === "x" && encodedString.length === 3)
  ) {
    // Parse the hexadecimal part and convert to character
    return String.fromCharCode(parseInt(encodedString.slice(1), 16));
  }

  // Case 2: 'u{XXXX}' (e.g., 'u{1F600}')
  if (startsWithUnicodePrefix && hasUnicodeBraces) {
    // Parse the hexadecimal part inside the braces and convert to code point
    return String.fromCodePoint(parseInt(encodedString.slice(2, -1), 16));
  }

  // Case 3: Lookup in xB5 map or return as is
  return xB5.get(encodedString) || encodedString;
}

module.exports = decodeUnicodeOrLookupAlias;