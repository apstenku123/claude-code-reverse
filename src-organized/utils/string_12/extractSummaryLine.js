/**
 * Extracts a summary line from the input string, truncating and formatting as needed.
 *
 * The function takes a multi-line string, extracts the first line, and returns a summary:
 * - If the first line is between 6 and 60 characters, returns isBlobOrFileLikeObject as is.
 * - If longer than 60 characters, truncates to the last space before 60 chars (if after 30), appends '...'.
 * - If the summary is less than 10 characters, returns 'Bug Report'.
 *
 * @param {string} inputText - The input string, possibly multi-line, to extract a summary from.
 * @returns {string} The formatted summary line.
 */
function extractSummaryLine(inputText) {
  // Extract the first line (up to the first newline)
  const firstLine = inputText.split('\n')[0] || "";

  // If the first line is a reasonable summary, return as is
  if (firstLine.length <= 60 && firstLine.length > 5) {
    return firstLine;
  }

  // Otherwise, truncate to 60 characters
  let summary = firstLine.slice(0, 60);

  if (firstLine.length > 60) {
    // Try to cut at the last space before 60 chars, but only if isBlobOrFileLikeObject'createInteractionAccessor after 30 chars
    const lastSpaceIndex = summary.lastIndexOf(" ");
    if (lastSpaceIndex > 30) {
      summary = summary.slice(0, lastSpaceIndex);
    }
    summary += "...";
  }

  // If the summary is too short, return a default label
  return summary.length < 10 ? "Bug Report" : summary;
}

module.exports = extractSummaryLine;