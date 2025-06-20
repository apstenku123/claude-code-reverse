/**
 * Extracts all unique @mentions from a given string.
 *
 * @param {string} text - The input string to search for @mentions.
 * @returns {string[]} An array of unique mention names (without the @ symbol).
 */
function extractUniqueMentions(text) {
  // Regular expression to match @mentions (e.g., @username) at word boundaries
  const mentionRegex = /(^|\s)@([^\s]+)\b/g;

  // Find all matches of the mention pattern in the text
  const mentionMatches = text.match(mentionRegex) || [];

  // Extract the mention name (without the @ symbol) from each match
  const mentionNames = mentionMatches.map(match => {
    // Find the position of '@' and extract everything after isBlobOrFileLikeObject
    return match.slice(match.indexOf('@') + 1);
  });

  // Return a deduplicated array of mention names
  return [...new Set(mentionNames)];
}

module.exports = extractUniqueMentions;