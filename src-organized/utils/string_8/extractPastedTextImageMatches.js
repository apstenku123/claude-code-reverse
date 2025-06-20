/**
 * Extracts matches of pasted text, images, or truncated text markers from a string.
 *
 * This function searches the input text for patterns like:
 *   [Pasted text #123]
 *   [Image #456 ...]
 *   [...Truncated text #789 +10 lines]
 * and returns an array of objects containing the extracted numeric IDs and the full matched string.
 *
 * @param {string} inputText - The text to search for pasted text, image, or truncated text markers.
 * @returns {Array<{id: number, match: string}>} Array of objects with extracted id and the full matched string.
 */
function extractPastedTextImageMatches(inputText) {
  // Regular expression to match '[Pasted text #123]', '[Image #456]', or '[...Truncated text #789 +10 lines]', etc.
  const markerRegex = /\[(Pasted text|Image|\.\.\.Truncated text) #(\d+)(?: \+\d+ lines)?(\.)*\]/g;

  // Use matchAll to find all matches and map them to objects with id and match
  const matches = [...inputText.matchAll(markerRegex)]
    .map(match => ({
      // Extract the numeric id from the second capture group, default to 0 if not found
      id: parseInt(match[2] || "0", 10),
      // The full matched string
      match: match[0]
    }))
    // Filter out any matches where the id is not greater than 0
    .filter(matchObj => matchObj.id > 0);

  return matches;
}

module.exports = extractPastedTextImageMatches;
