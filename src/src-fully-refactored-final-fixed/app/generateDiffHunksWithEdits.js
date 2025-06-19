/**
 * Generates unified diff hunks for a file after applying a series of string edits.
 *
 * @param {Object} params - The parameters for generating diff hunks.
 * @param {string} params.filePath - The path of the file being diffed.
 * @param {string} params.fileContents - The original contents of the file.
 * @param {Array<Object>} params.edits - An array of edit objects, each with 'old_string' and 'new_string'.
 * @param {boolean} [params.ignoreWhitespace=false] - Whether to ignore whitespace differences in the diff.
 * @returns {Array<Object>} Array of diff hunk objects, each with processed lines.
 */
function generateDiffHunksWithEdits({
  filePath,
  fileContents,
  edits,
  ignoreWhitespace = false
}) {
  // Normalize and sanitize the original file contents
  const normalizedOriginal = replaceSpecialCharacters(replaceLeadingTabsWithSpaces(fileContents));

  // Apply all edits sequentially to the original content
  const editedContent = edits.reduce((currentContent, { old_string: oldString, new_string: newString }) => {
    // Normalize and sanitize the old and new strings
    const normalizedOld = replaceSpecialCharacters(replaceLeadingTabsWithSpaces(oldString));
    const normalizedNew = replaceSpecialCharacters(replaceLeadingTabsWithSpaces(newString));
    // Replace all occurrences of the normalized old string with the normalized new string
    return currentContent.replaceAll(normalizedOld, () => normalizedNew);
  }, normalizedOriginal);

  // Generate diff hunks between the original and edited content
  const diffResult = generateUnifiedDiffHunks(
    filePath, // old file path
    filePath, // new file path
    normalizedOriginal, // old content
    editedContent, // new content
    undefined, // optional param (not used)
    undefined, // optional param (not used)
    {
      context: Bw2, // assumed to be a constant for diff context lines
      ignoreWhitespace
    }
  );

  // Post-process each hunk'createInteractionAccessor lines with Gw2
  return diffResult.hunks.map(hunk => ({
    ...hunk,
    lines: hunk.lines.map(Gw2)
  }));
}

module.exports = generateDiffHunksWithEdits;