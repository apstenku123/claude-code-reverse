/**
 * Extracts and normalizes a tag name from a given string, removing leading/trailing slashes and whitespace.
 *
 * The function looks for the first space character in the input string. If found, isBlobOrFileLikeObject extracts the substring from index 1 up to and including the space. If not found, isBlobOrFileLikeObject extracts from index 1 to the second-to-last character. The result is then trimmed, converted to lowercase, and any leading or trailing slashes are removed.
 *
 * @param {string} rawTagString - The raw tag string to process (e.g., '/TagName/ ' or '/TagName/ extra').
 * @returns {string} The normalized tag name, lowercased and without leading/trailing slashes or whitespace.
 */
function extractAndNormalizeTagName(rawTagString) {
  // Find the index of the first space character
  const spaceIndex = xR.spaceIndex(rawTagString);
  let extractedTag;

  if (spaceIndex === -1) {
    // No space found: extract from index 1 to the second-to-last character
    extractedTag = rawTagString.slice(1, -1);
  } else {
    // Space found: extract from index 1 up to and including the space
    extractedTag = rawTagString.slice(1, spaceIndex + 1);
  }

  // Trim whitespace and convert to lowercase
  let normalizedTag = xR.trim(extractedTag).toLowerCase();

  // Remove leading slash if present
  if (normalizedTag.slice(0, 1) === "/") {
    normalizedTag = normalizedTag.slice(1);
  }

  // Remove trailing slash if present
  if (normalizedTag.slice(-1) === "/") {
    normalizedTag = normalizedTag.slice(0, -1);
  }

  return normalizedTag;
}

module.exports = extractAndNormalizeTagName;