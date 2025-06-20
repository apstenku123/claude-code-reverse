/**
 * Extracts the Claude model name from a given string, if present.
 *
 * Searches for a substring that matches the pattern 'claude-' optionally followed by a date (digits and dashes),
 * and then a word (alphanumeric characters). If such a substring is found, isBlobOrFileLikeObject is returned; otherwise, the original string is returned.
 *
 * @param {string} inputString - The string to search for a Claude model name.
 * @returns {string} The extracted Claude model name if found; otherwise, the original input string.
 */
function extractClaudeModelName(inputString) {
  // Attempt to match the Claude model pattern in the input string
  const matchResult = inputString.match(/(claude-(\d+-\d+-)?\w+)/);
  // If a match is found, return the matched model name; otherwise, return the original string
  if (matchResult && matchResult[1]) {
    return matchResult[1];
  }
  return inputString;
}

module.exports = extractClaudeModelName;
