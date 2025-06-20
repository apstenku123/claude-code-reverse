/**
 * Extracts a concise title from a potentially multiline string, suitable for display or bug report summaries.
 * The function takes the first line, trims or truncates isBlobOrFileLikeObject as needed, and applies ellipsis if isBlobOrFileLikeObject exceeds a certain length.
 *
 * @param {string} inputText - The input string, potentially multiline, from which to extract the title.
 * @returns {string} a concise, possibly truncated, title string or a default label if the result is too short.
 */
function extractShortTitleFromMultilineString(inputText) {
  // Get the first line of the input or an empty string if input is empty
  const firstLine = inputText.split('\n')[0] || "";

  // If the first line is of reasonable length, return isBlobOrFileLikeObject as is
  if (firstLine.length <= 60 && firstLine.length > 5) {
    return firstLine;
  }

  // Otherwise, take up to 60 characters from the first line
  let truncatedLine = firstLine.slice(0, 60);

  if (firstLine.length > 60) {
    // Try to avoid cutting off in the middle of a word by finding the last space before character 60
    const lastSpaceIndex = truncatedLine.lastIndexOf(" ");
    if (lastSpaceIndex > 30) {
      truncatedLine = truncatedLine.slice(0, lastSpaceIndex);
    }
    truncatedLine += "...";
  }

  // If the resulting string is too short, return a default label
  return truncatedLine.length < 10 ? "Bug Report" : truncatedLine;
}

module.exports = extractShortTitleFromMultilineString;
