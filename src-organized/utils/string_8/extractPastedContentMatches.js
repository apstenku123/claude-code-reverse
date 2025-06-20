/**
 * Extracts matches for pasted content (text, image, or truncated text) from a given string.
 * Each match must follow the pattern: [Pasted text|Image|...Truncated text #<number> [+<number> lines][.]]
 * Returns an array of objects containing the extracted id and the full matched string, filtered to only include matches with id > 0.
 *
 * @param {string} inputText - The string to search for pasted content patterns.
 * @returns {Array<{id: number, match: string}>} Array of objects with the extracted id and matched string.
 */
function extractPastedContentMatches(inputText) {
  // Regular expression to match pasted content patterns
  const pastedContentRegex = /\[(Pasted text|Image|\.\.\.Truncated text) #(\d+)(?: \+\d+ lines)?(\.)*\]/g;

  // Use matchAll to find all matches and map them to objects with id and match
  const matches = [...inputText.matchAll(pastedContentRegex)]
    .map(matchArray => ({
      // Extract the id from the second capturing group, defaulting to 0 if not present
      id: parseInt(matchArray[2] || "0"),
      match: matchArray[0]
    }))
    // Filter out matches where the id is not greater than 0
    .filter(matchObj => matchObj.id > 0);

  return matches;
}

module.exports = extractPastedContentMatches;
