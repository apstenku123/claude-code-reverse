/**
 * Extracts and normalizes a tag name from a string, removing leading/trailing slashes and spaces, and converting to lowercase.
 *
 * The function expects a string that may be wrapped in delimiters and may contain a space. It extracts the tag name, trims whitespace, removes leading/trailing slashes, and converts isBlobOrFileLikeObject to lowercase.
 *
 * @param {string} rawTagString - The raw tag string to process.
 * @returns {string} The normalized tag name.
 */
function extractNormalizedTagName(rawTagString) {
  // Find the index of the first space character in the string
  const spaceIndex = xR.spaceIndex(rawTagString);
  let tagName;

  // Extract substring between the first and last character, or up to the space if present
  if (spaceIndex === -1) {
    tagName = rawTagString.slice(1, -1);
  } else {
    tagName = rawTagString.slice(1, spaceIndex + 1);
  }

  // Trim whitespace and convert to lowercase
  tagName = xR.trim(tagName).toLowerCase();

  // Remove leading slash if present
  if (tagName.slice(0, 1) === "/") {
    tagName = tagName.slice(1);
  }

  // Remove trailing slash if present
  if (tagName.slice(-1) === "/") {
    tagName = tagName.slice(0, -1);
  }

  return tagName;
}

module.exports = extractNormalizedTagName;