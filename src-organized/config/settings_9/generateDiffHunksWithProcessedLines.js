/**
 * Generates unified diff hunks between two file contents, with special character replacement and optional whitespace/context controls.
 *
 * @param {Object} options - Options for generating the diff hunks.
 * @param {string} options.filePath - The path of the file being diffed.
 * @param {string} options.oldContent - The original content of the file.
 * @param {string} options.newContent - The new content of the file.
 * @param {boolean} [options.ignoreWhitespace=false] - Whether to ignore whitespace differences.
 * @param {boolean} [options.singleHunk=false] - Whether to generate a single hunk with maximum context.
 * @returns {Array<Object>} Array of diff hunk objects, each with processed lines.
 */
function generateDiffHunksWithProcessedLines({
  filePath,
  oldContent,
  newContent,
  ignoreWhitespace = false,
  singleHunk = false
}) {
  // Determine the context lines: use a very large number if singleHunk is true, otherwise use default context (Bw2)
  const contextLines = singleHunk ? 100000 : Bw2;

  // Generate diff hunks between the old and new content, after replacing special characters
  const diffResult = generateUnifiedDiffHunks(
    filePath, // old file path
    filePath, // new file path (same as old)
    replaceSpecialCharacters(oldContent),
    replaceSpecialCharacters(newContent),
    undefined, // optional parameters not used
    undefined,
    {
      ignoreWhitespace,
      context: contextLines
    }
  );

  // Map over each hunk and process its lines with Gw2
  return diffResult.hunks.map(hunk => ({
    ...hunk,
    lines: hunk.lines.map(Gw2)
  }));
}

module.exports = generateDiffHunksWithProcessedLines;