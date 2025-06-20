/**
 * Summarizes a multi-line string by limiting the number of lines and appending an ellipsis if truncated.
 *
 * @param {string} inputText - The input string to summarize. May contain multiple lines.
 * @param {number} [maxLines=XS6] - The maximum number of lines to display before truncating. Defaults to XS6.
 * @returns {string} The summarized string, possibly truncated with an ellipsis and line count.
 */
function summarizeLinesWithEllipsis(inputText, maxLines = XS6) {
  // Remove trailing whitespace from the input
  const trimmedText = inputText.trimEnd();
  if (!trimmedText) return "";

  // Split the text into lines
  const lines = trimmedText.split(`\n`);

  // If the number of lines is within the limit, return as-is
  if (lines.length <= maxLines) return lines.join(`\n`);

  // Calculate how many lines to show before truncation
  const visibleLineCount = Math.max(maxLines - CS6, 0);
  // Calculate how many lines are being hidden
  const hiddenLineCount = lines.length - visibleLineCount;

  // Compose the summary: visible lines + ellipsis with count
  const summary = [
    lines.slice(0, visibleLineCount).join(`\n`),
    FA.ansi256(H4().secondaryText)(
      `… +${hiddenLineCount} ${hiddenLineCount === 1 ? "line" : "lines"} ${hiddenLineCount > 0 ? Ye0() : ""}`
    )
  ].join(`\n`);

  return summary;
}

module.exports = summarizeLinesWithEllipsis;