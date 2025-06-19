/**
 * Normalizes newline characters in a string to use a standard line break (\n).
 *
 * This function replaces all occurrences of carriage return followed by either line feed or NEXT LINE (UL+0085)
 * with a single line feed (\n). It then replaces any remaining carriage returns (\r), NEXT LINE (UL+0085),
 * or LINE SEPARATOR (UL+2028) characters with a line feed (\n).
 *
 * @param {string} inputText - The text in which to normalize newline characters.
 * @returns {string} The input text with all newlines normalized to \n.
 */
function normalizeNewlines(inputText) {
  // Replace \r followed by \n or NEXT LINE (UL+0085) with a single \n
  const replacedCarriageReturnSequences = inputText.replace(/\r[\n\u0085]/g, '\n');

  // Replace any remaining \r, NEXT LINE (UL+0085), or LINE SEPARATOR (UL+2028) with \n
  const normalizedText = replacedCarriageReturnSequences.replace(/[\r\u0085\u2028]/g, '\n');

  return normalizedText;
}

module.exports = normalizeNewlines;