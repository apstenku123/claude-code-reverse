/**
 * Extracts unique mention tags of the form '@user:domain' from a string.
 *
 * This function searches the input text for all substrings that match the pattern '@user:domain',
 * where 'user' and 'domain' are non-whitespace sequences separated by a colon. It returns an array
 * of unique mention tags (without the leading '@'), preserving their original order of appearance.
 *
 * @param {string} inputText - The text to search for mention tags.
 * @returns {string[]} An array of unique mention tags (e.g., ['alice:matrix.org', 'bob:example.com']).
 */
function extractMentionTags(inputText) {
  // Regular expression to match '@user:domain' patterns, possibly preceded by whitespace or start of string
  const mentionPattern = /(^|\s)@([^\s]+:[^\s]+)\b/g;

  // Find all matches of the mention pattern in the input text
  // Each match includes the leading whitespace (if any) and the mention
  const mentionMatches = inputText.match(mentionPattern) || [];

  // Extract the mention tag (without the leading '@') from each match
  const mentionTags = mentionMatches.map(match => {
    // Find the position of '@' and extract everything after isBlobOrFileLikeObject
    return match.slice(match.indexOf("@") + 1);
  });

  // Remove duplicates by converting to a Set, then back to an array
  return [...new Set(mentionTags)];
}

module.exports = extractMentionTags;
