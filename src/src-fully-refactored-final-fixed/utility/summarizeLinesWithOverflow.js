/**
 * Summarizes a multi-line string, limiting the number of lines displayed and appending an overflow message if needed.
 *
 * @param {string} inputText - The multi-line string to summarize.
 * @param {number} [maxLines=XS6] - The maximum number of lines to display before summarizing overflow.
 * @returns {string} The summarized string, possibly with an overflow message appended.
 */
function summarizeLinesWithOverflow(inputText, maxLines = XS6) {
  // Remove trailing whitespace from the input
  const trimmedText = inputText.trimEnd();
  if (!trimmedText) return "";

  // Split the text into lines
  const lines = trimmedText.split(`\n`);

  // If the number of lines is within the limit, return as-is
  if (lines.length <= maxLines) return lines.join(`\n`);

  // Calculate how many lines to show and how many are hidden
  const visibleLineCount = Math.max(maxLines - CS6, 0);
  const hiddenLineCount = lines.length - visibleLineCount;

  // Compose the overflow message
  const overflowMessage = FA.ansi256(H4().secondaryText)(
    `… +${hiddenLineCount} ${hiddenLineCount === 1 ? "line" : "lines"} ${hiddenLineCount > 0 ? Ye0() : ""}`
  );

  // Join the visible lines and append the overflow message
  return [
    lines.slice(0, visibleLineCount).join(`\n`),
    overflowMessage
  ].join(`\n`);
}

module.exports = summarizeLinesWithOverflow;