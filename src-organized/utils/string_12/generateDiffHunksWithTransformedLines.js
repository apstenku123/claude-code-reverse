/**
 * Generates diff hunks between two file contents and transforms each line in the hunks.
 *
 * @param {Object} params - The parameters for generating the diff hunks.
 * @param {string} params.filePath - The path to the file being compared.
 * @param {string} params.oldContent - The original content of the file.
 * @param {string} params.newContent - The new content of the file.
 * @param {boolean} [params.ignoreWhitespace=false] - Whether to ignore whitespace differences.
 * @param {boolean} [params.singleHunk=false] - Whether to generate a single hunk with a large context.
 * @returns {Array<Object>} An array of diff hunk objects, each with transformed lines.
 */
function generateDiffHunksWithTransformedLines({
  filePath,
  oldContent,
  newContent,
  ignoreWhitespace = false,
  singleHunk = false
}) {
  // Determine the context size: very large if singleHunk is true, otherwise use default context size
  const contextSize = singleHunk ? 100000 : Bw2;

  // Generate diff hunks using the provided contents and options
  const diffResult = generateUnifiedDiffHunks(
    filePath, // old file path
    filePath, // new file path (same as old)
    te(oldContent), // split old content into lines (te is a dependency)
    te(newContent), // split new content into lines (te is a dependency)
    undefined, // optional parameters not used
    undefined, // optional parameters not used
    {
      ignoreWhitespace,
      context: contextSize
    }
  );

  // Map over each hunk and transform its lines using Gw2 (dependency)
  return diffResult.hunks.map(hunk => ({
    ...hunk,
    lines: hunk.lines.map(Gw2)
  }));
}

module.exports = generateDiffHunksWithTransformedLines;