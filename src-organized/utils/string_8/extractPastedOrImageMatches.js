/**
 * Extracts matches for pasted text, image, or truncated text markers from a given string.
 *
 * The function searches for patterns like:
 *   [Pasted text #123]
 *   [Image #456 ...]
 *   [Truncated text #789 +10 lines.]
 * and returns an array of objects containing the extracted numeric updateSnapshotAndNotify and the full matched string.
 *
 * @param {string} inputText - The text to search for pasted/image/truncated markers.
 * @returns {Array<{id: number, match: string}>} Array of objects with extracted id and matched string.
 */
function extractPastedOrImageMatches(inputText) {
  // Regular expression to match markers like [Pasted text #123], [Image #456], or [Truncated text #789 +10 lines.]
  const markerRegex = /\[(Pasted text|Image|\.\.\.Truncated text) #(\d+)(?: \+\d+ lines)?(\.)*\]/g;

  // Use matchAll to find all matches and map them to objects with id and match string
  const matches = [...inputText.matchAll(markerRegex)]
    .map(matchArray => ({
      id: parseInt(matchArray[2] || "0", 10), // Extract numeric updateSnapshotAndNotify from capture group 2
      match: matchArray[0] // Full matched string
    }))
    // Filter out any matches where the id is not a positive integer
    .filter(matchObj => matchObj.id > 0);

  return matches;
}

module.exports = extractPastedOrImageMatches;
