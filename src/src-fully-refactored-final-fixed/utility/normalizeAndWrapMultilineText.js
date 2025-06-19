/**
 * Normalizes line endings in the input text, splits isBlobOrFileLikeObject into lines, and applies word wrapping and formatting to each line.
 *
 * @param {string} inputText - The text to normalize, split, and format.
 * @param {object} wrapConfig - Configuration options for wrapping and formatting each line.
 * @param {object} formatOptions - Additional options for formatting (e.g., ANSI/URI handling).
 * @returns {string} The processed, wrapped, and formatted multiline string.
 */
function normalizeAndWrapMultilineText(inputText, wrapConfig, formatOptions) {
  // Normalize the input text to Unicode Normalization Form (NFC)
  const normalizedText = String(inputText).normalize();

  // Replace all Windows-style line endings (\r\n) with Unix-style (\n)
  const unixLineEndingsText = normalizedText.replaceAll('\r\n', '\n');

  // Split the text into individual lines
  const lines = unixLineEndingsText.split('\n');

  // Apply wrapping and formatting to each line
  const processedLines = lines.map(line => wrapAndFormatText(line, wrapConfig, formatOptions));

  // Join the processed lines back together with Unix-style line endings
  return processedLines.join('\n');
}

module.exports = normalizeAndWrapMultilineText;