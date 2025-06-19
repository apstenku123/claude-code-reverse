/**
 * Truncates a multi-line string to a specified maximum number of lines, appending a summary if truncated.
 *
 * @param {string} inputText - The multi-line string to process.
 * @param {number} [maxLines=XS6] - The maximum number of lines to retain before truncating. Defaults to XS6.
 * @returns {string} The possibly truncated string, with a summary line appended if truncation occurred.
 */
function truncateLinesWithSummary(inputText, maxLines = XS6) {
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

  // Prepare the summary line with styling
  const summaryLine = FA.ansi256(H4().secondaryText)(
    `… +${hiddenLineCount} ${hiddenLineCount === 1 ? "line" : "lines"} ${hiddenLineCount > 0 ? Ye0() : ""}`
  );

  // Return the visible lines plus the summary line
  return [
    lines.slice(0, visibleLineCount).join(`\n`),
    summaryLine
  ].join(`\n`);
}

module.exports = truncateLinesWithSummary;