/**
 * Normalizes each substring in a null-separated string using Unicode NFC normalization.
 *
 * @param {string} nullSeparatedString - The input string where substrings are separated by null characters (\x00).
 * @returns {string} The resulting string with each substring normalized and rejoined by null characters.
 */
function normalizeNullSeparatedString(nullSeparatedString) {
  // Split the input string into substrings using the null character as a separator
  const substrings = nullSeparatedString.split("\x00");

  // Normalize each substring using Unicode NFC normalization
  const normalizedSubstrings = substrings.map((substring) => {
    return substring.normalize("NFC");
  });

  // Join the normalized substrings back together with the null character
  return normalizedSubstrings.join("\x00");
}

module.exports = normalizeNullSeparatedString;