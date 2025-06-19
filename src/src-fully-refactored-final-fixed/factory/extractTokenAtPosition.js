/**
 * Extracts the last matching token (such as a word or @mention) from a substring of the input up to a given position.
 *
 * @param {string} inputText - The full input string from which to extract the token.
 * @param {number} cursorPosition - The position in the string up to which to consider for token extraction.
 * @param {boolean} [includeAtMentions=false] - If true, matches @mentions as tokens; otherwise, matches only words/paths.
 * @returns {{ token: string, startPos: number } | null} An object containing the matched token and its start position, or null if no match is found.
 */
function extractTokenAtPosition(inputText, cursorPosition, includeAtMentions = false) {
  if (!inputText) return null;

  // Get the substring up to the cursor position
  const substringUpToCursor = inputText.substring(0, cursorPosition);

  // Choose the appropriate regex: with or without @mention support
  const tokenRegex = includeAtMentions
    ? /(@[a-zA-Z0-9_\-./]*|[a-zA-Z0-9_\-./]+)$/
    : /[a-zA-Z0-9_\-./]+$/;

  // Find the last matching token before the cursor
  const match = substringUpToCursor.match(tokenRegex);

  // If no match is found or index is undefined, return null
  if (!match || match.index === undefined) return null;

  // Return the matched token and its start position
  return {
    token: match[0],
    startPos: match.index
  };
}

module.exports = extractTokenAtPosition;