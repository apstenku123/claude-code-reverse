/**
 * Normalizes line endings in a multiline string, splits isBlobOrFileLikeObject into lines, and applies formatting to each line.
 *
 * This function replaces all Windows-style (\r\n) line endings with Unix-style (\n),
 * splits the string into individual lines, and then formats each line using the provided formatting function.
 *
 * @param {string} inputText - The multiline string to normalize and format.
 * @param {object} formattingOptions - Options to control how each line is formatted (passed to wrapTextWithFormatting).
 * @param {object} formattingContext - Additional context or configuration for formatting (passed to wrapTextWithFormatting).
 * @returns {string} The normalized and formatted multiline string.
 */
function normalizeAndFormatMultilineString(inputText, formattingOptions, formattingContext) {
  // Normalize the input to a string and standardize line endings to '\n'
  const normalizedText = String(inputText).normalize().replaceAll('\r\n', '\n');

  // Split the normalized text into lines
  const lines = normalizedText.split('\n');

  // Format each line using the provided formatting function
  const formattedLines = lines.map(line => wrapTextWithFormatting(line, formattingOptions, formattingContext));

  // Join the formatted lines back into a single string with '\n' line breaks
  return formattedLines.join('\n');
}

module.exports = normalizeAndFormatMultilineString;