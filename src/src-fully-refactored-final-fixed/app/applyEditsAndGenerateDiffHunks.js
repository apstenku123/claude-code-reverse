/**
 * Applies a series of string edits to file contents and generates unified diff hunks.
 *
 * @param {Object} params - Parameters for diff generation.
 * @param {string} params.filePath - The path of the file being edited.
 * @param {string} params.fileContents - The original contents of the file.
 * @param {Array<{old_string: string, new_string: string}>} params.edits - List of edits to apply.
 * @param {boolean} [params.ignoreWhitespace=false] - Whether to ignore whitespace differences in the diff.
 * @returns {Array<Object>} Array of diff hunks, each with mapped lines for display or patching.
 */
function applyEditsAndGenerateDiffHunks({
  filePath,
  fileContents,
  edits,
  ignoreWhitespace = false
}) {
  // Convert the original file contents into a normalized form (e.g., split into lines)
  const originalLines = te(Xv(fileContents));

  // Apply all edits sequentially to the file contents
  const editedLines = edits.reduce((currentLines, { old_string, new_string }) => {
    // Replace all occurrences of the old string (normalized) with the new string (normalized)
    return currentLines.replaceAll(te(Xv(old_string)), () => te(Xv(new_string)));
  }, originalLines);

  // Generate diff hunks between the original and edited content
  const diffResult = generateUnifiedDiffHunks(
    filePath, // old file path
    filePath, // new file path (same as old)
    originalLines, // original content
    editedLines,   // edited content
    undefined,     // optional parameter (not used)
    undefined,     // optional parameter (not used)
    {
      context: Bw2, // context lines for diff
      ignoreWhitespace // whether to ignore whitespace differences
    }
  );

  // Map each hunk'createInteractionAccessor lines for display or further processing
  return diffResult.hunks.map(hunk => ({
    ...hunk,
    lines: hunk.lines.map(Gw2)
  }));
}

module.exports = applyEditsAndGenerateDiffHunks;