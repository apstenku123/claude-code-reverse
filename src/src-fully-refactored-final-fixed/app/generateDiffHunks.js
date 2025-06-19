/**
 * Generates diff hunks for a file based on its old and new content.
 *
 * @param {string} filePath - The path to the file being compared.
 * @param {string} oldContent - The original content of the file.
 * @param {string} newContent - The updated content of the file.
 * @param {string} hunkMode - Specifies if only a single hunk should be generated ("single") or multiple hunks are allowed.
 * @returns {Array} An array of processed diff hunks, or an empty array if no differences are found.
 */
function generateDiffHunks(filePath, oldContent, newContent, hunkMode) {
  // Determine if only a single hunk should be generated
  const isSingleHunk = hunkMode === "single";

  // Generate hunks using the generateDiffHunksWithTransformedLines diffing utility
  const diffHunks = generateDiffHunksWithTransformedLines({
    filePath: filePath,
    oldContent: oldContent,
    newContent: newContent,
    singleHunk: isSingleHunk
  });

  // If there are no hunks, return an empty array
  if (diffHunks.length === 0) {
    return [];
  }

  // If single hunk mode is requested but multiple hunks are found, throw an error
  if (isSingleHunk && diffHunks.length > 1) {
    reportErrorIfAllowed(new Error(`Unexpected number of hunks: ${diffHunks.length}. Expected 1 hunk.`));
  }

  // Process and return the hunks using Jw2 utility
  return Jw2(diffHunks);
}

module.exports = generateDiffHunks;