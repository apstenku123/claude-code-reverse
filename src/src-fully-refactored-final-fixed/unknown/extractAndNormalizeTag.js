/**
 * Extracts and normalizes a tag or identifier from a given string.
 * The function trims whitespace, removes leading/trailing slashes, and converts to lowercase.
 * If a space is found, only the substring up to and including the space is considered.
 *
 * @param {string} inputString - The string to extract and normalize the tag from.
 * @returns {string} The normalized tag or identifier.
 */
function extractAndNormalizeTag(inputString) {
  // Find the index of the first space character in the input string
  const spaceIndex = xR.spaceIndex(inputString);
  let tagCandidate;

  if (spaceIndex === -1) {
    // No space found: extract substring from index 1 to the second-to-last character
    tagCandidate = inputString.slice(1, -1);
  } else {
    // Space found: extract substring from index 1 up to and including the space
    tagCandidate = inputString.slice(1, spaceIndex + 1);
  }

  // Trim whitespace and convert to lowercase
  tagCandidate = xR.trim(tagCandidate).toLowerCase();

  // Remove leading slash if present
  if (tagCandidate.slice(0, 1) === "/") {
    tagCandidate = tagCandidate.slice(1);
  }

  // Remove trailing slash if present
  if (tagCandidate.slice(-1) === "/") {
    tagCandidate = tagCandidate.slice(0, -1);
  }

  return tagCandidate;
}

module.exports = extractAndNormalizeTag;