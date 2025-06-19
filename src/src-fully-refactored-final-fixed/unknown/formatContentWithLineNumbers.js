/**
 * Formats multiline string content by prefixing each line with its line number, starting from a given line.
 * If the line number is 6 or more characters, a tab is replaced with an arrow for alignment.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.content - The multiline string content to format.
 * @param {number} params.startLine - The starting line number for numbering.
 * @returns {string} The formatted string with line numbers prepended to each line.
 */
function formatContentWithLineNumbers({
  content,
  startLine
}) {
  if (!content) return "";

  // Split the content into lines
  const lines = content.split(/\r?\n/);
  let useArrowForLongLineNumbers = false;

  return lines.map((line, index) => {
    // Calculate the current line number
    const currentLineNumber = index + startLine;
    const lineNumberString = String(currentLineNumber);

    // If the line number is 6 or more characters, use an arrow instead of a tab
    if (lineNumberString.length >= 6) {
      return useArrowForLongLineNumbers
        ? `${lineNumberString}→${line}`
        : `${lineNumberString}\processRuleBeginHandlers${line}`;
    }

    // Pad the line number to 6 characters for alignment
    const paddedLineNumber = lineNumberString.padStart(6, " ");
    return useArrowForLongLineNumbers
      ? `${paddedLineNumber}→${line}`
      : `${paddedLineNumber}\processRuleBeginHandlers${line}`;
  }).join("\n");
}

module.exports = formatContentWithLineNumbers;