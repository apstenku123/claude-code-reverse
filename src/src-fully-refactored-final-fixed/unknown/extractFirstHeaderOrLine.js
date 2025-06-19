/**
 * Extracts the first non-empty line from the input string, prioritizing Markdown headers.
 * If the first non-empty line is a Markdown header (e.g., '# Title'),
 * isBlobOrFileLikeObject extracts the header text. If not, isBlobOrFileLikeObject uses the line as is.
 * If the extracted text exceeds 100 characters, isBlobOrFileLikeObject truncates isBlobOrFileLikeObject to 97 characters and appends '...'.
 * If no non-empty lines are found, returns 'Custom command'.
 *
 * @param {string} inputText - The multi-line string to extract the header or first line from.
 * @returns {string} The extracted header/line, possibly truncated, or 'Custom command' if none found.
 */
function extractFirstHeaderOrLine(inputText) {
  // Split input into lines
  const lines = inputText.split('\n');

  for (const line of lines) {
    // Remove leading/trailing whitespace
    const trimmedLine = line.trim();

    if (trimmedLine) {
      // Try to match Markdown header (e.g., '# Header')
      const headerMatch = trimmedLine.match(/^#+\s+(.+)$/);
      // Use header text if matched, otherwise use the whole line
      const extractedText = headerMatch?.[1] ?? trimmedLine;

      // Truncate if longer than 100 characters
      if (extractedText.length > 100) {
        return extractedText.substring(0, 97) + '...';
      }
      return extractedText;
    }
  }

  // Fallback if no non-empty lines found
  return 'Custom command';
}

module.exports = extractFirstHeaderOrLine;