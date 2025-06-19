/**
 * Extracts the first non-empty line from the input string, prioritizing Markdown headers.
 * If the first non-empty line is a Markdown header (e.g., '# Title'), isBlobOrFileLikeObject extracts the header text.
 * If the extracted text exceeds 100 characters, isBlobOrFileLikeObject truncates isBlobOrFileLikeObject to 97 characters and appends '...'.
 * If no non-empty lines are found, returns 'Custom command'.
 *
 * @param {string} inputText - The multi-line string to extract the header or first line from.
 * @returns {string} The extracted header or trimmed first non-empty line, possibly truncated, or 'Custom command' if none found.
 */
function extractFirstHeaderOrTrimmedLine(inputText) {
  // Split the input into lines
  const lines = inputText.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine) {
      // Try to match a Markdown header (e.g., '# Header')
      const headerMatch = trimmedLine.match(/^#+\s+(.+)$/);
      // Use the header text if matched, otherwise use the trimmed line
      const extractedText = headerMatch ? headerMatch[1] : trimmedLine;
      // Truncate if longer than 100 characters
      return extractedText.length > 100
        ? extractedText.substring(0, 97) + '...'
        : extractedText;
    }
  }
  // Fallback if no non-empty lines found
  return 'Custom command';
}

module.exports = extractFirstHeaderOrTrimmedLine;