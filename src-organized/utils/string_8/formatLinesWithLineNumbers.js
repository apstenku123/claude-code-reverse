/**
 * Formats multiline text by prefixing each line with its line number, starting from a given line.
 * Line numbers are padded to at least 6 characters. If the line number is 6 or more digits, a tab is used after the number;
 * otherwise, the number is left-padded with spaces. Optionally, an arrow (→) can be used after the line number (see note below).
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.content - The multiline string to format.
 * @param {number} params.startLine - The line number to start counting from.
 * @returns {string} The formatted string with line numbers prepended to each line.
 */
function formatLinesWithLineNumbers({ content, startLine }) {
  if (!content) return "";

  // Split the content into lines (supports both LF and CRLF)
  const lines = content.split(/\r?\n/);
  const useArrow = false; // This variable is always false in the original code

  return lines
    .map((line, index) => {
      const currentLineNumber = index + startLine;
      const lineNumberStr = String(currentLineNumber);

      // If the line number is 6 or more characters, no padding is needed
      if (lineNumberStr.length >= 6) {
        // Optionally use an arrow instead of a tab (not used in current logic)
        return useArrow ? `${lineNumberStr}→${line}` : `${lineNumberStr}\processRuleBeginHandlers${line}`;
      }

      // Pad the line number to 6 characters with spaces
      const paddedLineNumber = lineNumberStr.padStart(6, " ");
      return useArrow ? `${paddedLineNumber}→${line}` : `${paddedLineNumber}\processRuleBeginHandlers${line}`;
    })
    .join("\n");
}

module.exports = formatLinesWithLineNumbers;