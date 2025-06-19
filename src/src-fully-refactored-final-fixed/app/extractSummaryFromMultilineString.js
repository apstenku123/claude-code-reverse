/**
 * Extracts a concise summary from the first line of a multiline string, truncating if necessary.
 *
 * @param {string} multilineString - The input string, potentially containing multiple lines.
 * @returns {string} a summary string based on the first line, truncated and formatted as needed.
 */
function extractSummaryFromMultilineString(multilineString) {
  // Get the first line or an empty string if input is empty
  const firstLine = multilineString.split('\n')[0] || "";

  // If the first line is of reasonable length, return as is
  if (firstLine.length <= 60 && firstLine.length > 5) {
    return firstLine;
  }

  // Take up to 60 characters from the first line
  let summary = firstLine.slice(0, 60);

  if (firstLine.length > 60) {
    // Try to avoid cutting off a word: find last space within the first 60 chars
    const lastSpaceIndex = summary.lastIndexOf(" ");
    if (lastSpaceIndex > 30) {
      summary = summary.slice(0, lastSpaceIndex);
    }
    summary += "...";
  }

  // If the summary is too short, return a default label
  return summary.length < 10 ? "Bug Report" : summary;
}

module.exports = extractSummaryFromMultilineString;