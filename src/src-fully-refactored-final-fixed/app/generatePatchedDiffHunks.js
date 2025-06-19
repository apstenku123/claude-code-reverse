/**
 * Generates unified diff hunks for a file after applying a series of string edits.
 *
 * @param {Object} params - The parameters for generating the diff hunks.
 * @param {string} params.filePath - The path to the file being diffed.
 * @param {string} params.fileContents - The original contents of the file.
 * @param {Array<{old_string: string, new_string: string}>} params.edits - An array of edits to apply, each with an old and new string.
 * @param {boolean} [params.ignoreWhitespace=false] - Whether to ignore whitespace differences in the diff.
 * @returns {Array<Object>} An array of diff hunks, each with patched lines.
 */
function generatePatchedDiffHunks({
  filePath,
  fileContents,
  edits,
  ignoreWhitespace = false
}) {
  // Apply special character replacement to the original file contents
  const originalContent = replaceSpecialCharacters(Xv(fileContents));

  // Apply all edits sequentially to the original content
  const patchedContent = edits.reduce((currentContent, { old_string, new_string }) => {
    // Replace all occurrences of the old string (after special char replacement) with the new string (also replaced)
    return currentContent.replaceAll(
      replaceSpecialCharacters(Xv(old_string)),
      () => replaceSpecialCharacters(Xv(new_string))
    );
  }, originalContent);

  // Generate unified diff hunks between the original and patched content
  const diffResult = generateUnifiedDiffHunks(
    filePath, // old file path
    filePath, // new file path (same as old)
    originalContent,
    patchedContent,
    undefined,
    undefined,
    {
      context: Bw2, // context lines constant
      ignoreWhitespace
    }
  );

  // Map over each hunk and process its lines with Gw2
  return diffResult.hunks.map(hunk => ({
    ...hunk,
    lines: hunk.lines.map(Gw2)
  }));
}

module.exports = generatePatchedDiffHunks;