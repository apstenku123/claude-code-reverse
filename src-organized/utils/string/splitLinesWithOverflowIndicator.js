/**
 * Splits a string into lines, limiting the number of lines returned. If the input exceeds the limit,
 * the overflow is replaced with a formatted indicator showing how many lines were omitted.
 *
 * @param {string} inputText - The input string to split into lines.
 * @param {number} [maxLines=XS6] - The maximum number of lines to return before truncating.
 * @returns {string} The processed string with at most maxLines lines, possibly ending with an overflow indicator.
 */
function splitLinesWithOverflowIndicator(inputText, maxLines = XS6) {
  // Remove trailing whitespace from the input
  const trimmedText = inputText.trimEnd();
  if (!trimmedText) return "";

  // Split the input into lines
  const lines = trimmedText.split(`\n`);

  // If the number of lines is within the limit, return as-is
  if (lines.length <= maxLines) return lines.join(`\n`);

  // Calculate how many lines to show and how many are omitted
  const visibleLineCount = Math.max(maxLines - CS6, 0);
  const omittedLineCount = lines.length - visibleLineCount;

  // Build the overflow indicator string
  const overflowIndicator = FA.ansi256(H4().secondaryText)(
    `… +${omittedLineCount} ${omittedLineCount === 1 ? "line" : "lines"} ${omittedLineCount > 0 ? Ye0() : ""}`
  );

  // Return the visible lines plus the overflow indicator
  return [
    lines.slice(0, visibleLineCount).join(`\n`),
    overflowIndicator
  ].join(`\n`);
}

module.exports = splitLinesWithOverflowIndicator;