/**
 * Generates a summary string for pasted text, indicating the paste number and the number of lines added.
 *
 * @param {number|string} pasteNumber - The sequential number or identifier of the pasted text.
 * @param {number|string} lineCount - The number of lines included in the pasted text.
 * @returns {string} a formatted summary string describing the pasted text and line count.
 */
function formatPastedTextSummary(pasteNumber, lineCount) {
  // Construct and return the summary string for the pasted text
  return `[Pasted text #${pasteNumber} +${lineCount} lines]`;
}

module.exports = formatPastedTextSummary;