/**
 * Extracts the first word from the last segment of a pipe-delimited string.
 * If the input does not contain a pipe, extracts the first word from the trimmed input.
 *
 * @param {string} inputString - The string to extract the first word from. May be pipe-delimited.
 * @returns {string} The first word from the last pipe-delimited segment, or from the input if no pipe is present. Returns an empty string if input is empty or only whitespace.
 */
function extractFirstWordAfterPipe(inputString) {
  // Split the input by '|' and get the last segment
  const lastSegment = inputString.split('|').pop();

  // If lastSegment is undefined/null, fallback to inputString
  // Trim whitespace from the segment
  const trimmedSegment = (lastSegment?.trim() || inputString).trim();

  // Split the segment by whitespace and get the first word
  const firstWord = trimmedSegment.split(/\s+/)[0];

  // Return the first word, or an empty string if not found
  return firstWord || "";
}

module.exports = extractFirstWordAfterPipe;