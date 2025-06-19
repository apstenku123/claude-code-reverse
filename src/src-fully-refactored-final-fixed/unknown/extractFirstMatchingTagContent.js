/**
 * Extracts the content of the first matching HTML-like tag from the input string, accounting for nested tags of the same type.
 *
 * @param {string} inputString - The string to search within (e.g., HTML/XML content).
 * @param {string} tagName - The tag name to extract content from (case-insensitive).
 * @returns {string|null} The content inside the first matching tag, or null if not found or invalid input.
 */
function extractFirstMatchingTagContent(inputString, tagName) {
  // Validate input: both strings must be non-empty after trimming
  if (!inputString.trim() || !tagName.trim()) return null;

  // Escape special regex characters in the tag name
  const escapedTagName = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Regex to match the opening and closing tag pair, capturing content in between (non-greedy)
  const tagPairRegex = new RegExp(
    `<${escapedTagName}(?:\\s+[^>]*)?>([\\s\\s]*?)<\\/${escapedTagName}>`,
    "gi"
  );

  // Regex to match opening tags (for nesting count)
  const openingTagRegex = new RegExp(`<${escapedTagName}(?:\\s+[^>]*?)?>`, "gi");
  // Regex to match closing tags (for nesting count)
  const closingTagRegex = new RegExp(`<\\/${escapedTagName}>`, "gi");

  let match;
  let lastMatchEndIndex = 0;

  // Iterate through all matches of the tag pair
  while ((match = tagPairRegex.exec(inputString)) !== null) {
    const tagContent = match[1];
    const contentBeforeMatch = inputString.slice(lastMatchEndIndex, match.index);

    // Count the number of opening tags before this match
    let nestingLevel = 0;
    openingTagRegex.lastIndex = 0;
    while (openingTagRegex.exec(contentBeforeMatch) !== null) {
      nestingLevel++;
    }
    // Subtract the number of closing tags before this match
    closingTagRegex.lastIndex = 0;
    while (closingTagRegex.exec(contentBeforeMatch) !== null) {
      nestingLevel--;
    }

    // If nesting level is zero, this is the first non-nested occurrence
    if (nestingLevel === 0 && tagContent) {
      return tagContent;
    }
    // Move the lastMatchEndIndex forward for the next iteration
    lastMatchEndIndex = match.index + match[0].length;
  }

  // No matching tag found
  return null;
}

module.exports = extractFirstMatchingTagContent;