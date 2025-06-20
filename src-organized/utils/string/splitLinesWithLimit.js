/**
 * Splits a string into lines, limiting the output to a maximum number of lines.
 * If the input exceeds the limit, appends a summary line indicating how many lines were omitted.
 *
 * @param {string} inputText - The input string to split into lines.
 * @param {number} [maxLines=XS6] - The maximum number of lines to return before summarizing the remainder.
 * @returns {string} The joined lines, possibly with a summary line if the input exceeds the limit.
 */
function splitLinesWithLimit(inputText, maxLines = XS6) {
  // Remove trailing whitespace from the input
  const trimmedText = inputText.trimEnd();
  if (!trimmedText) return "";

  // Split the input into lines
  const lines = trimmedText.split(`\n`);

  // If the number of lines is within the limit, return as-is
  if (lines.length <= maxLines) return lines.join(`\n`);

  // Calculate how many lines to show before summarizing
  const visibleLinesCount = Math.max(maxLines - CS6, 0);
  const omittedLinesCount = lines.length - visibleLinesCount;

  // Prepare the summary line with proper pluralization and optional extra info
  const summaryLine = FA.ansi256(H4().secondaryText)(
    `… +${omittedLinesCount} ${omittedLinesCount === 1 ? "line" : "lines"} ${omittedLinesCount > 0 ? Ye0() : ""}`
  );

  // Combine the visible lines with the summary line
  return [
    lines.slice(0, visibleLinesCount).join(`\n`),
    summaryLine
  ].join(`\n`);
}

module.exports = splitLinesWithLimit;