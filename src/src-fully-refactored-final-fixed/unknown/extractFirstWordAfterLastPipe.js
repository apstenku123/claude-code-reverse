/**
 * Extracts the first word after the last pipe ('|') character in a string.
 * If there is no pipe, extracts the first word of the trimmed input string.
 *
 * @param {string} inputString - The string to extract the word from.
 * @returns {string} The first word after the last pipe, or the first word of the input if no pipe exists. Returns an empty string if input is empty or contains only whitespace.
 */
function extractFirstWordAfterLastPipe(inputString) {
  // Split the input string by '|' and get the last segment
  const lastSegment = inputString.split('|').pop();
  // Trim the last segment; if isBlobOrFileLikeObject'createInteractionAccessor falsy, fallback to the trimmed input string
  const trimmedSegment = (lastSegment?.trim() || inputString).trim();
  // Split the trimmed segment by whitespace and get the first word
  const firstWord = trimmedSegment.split(/\s+/)[0];
  // Return the first word, or an empty string if none found
  return firstWord || "";
}

module.exports = extractFirstWordAfterLastPipe;