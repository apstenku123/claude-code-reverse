/**
 * Determines if two file edit sets are equivalent by comparing file paths and edit details.
 * If the file paths match and all edits are identical, returns true.
 * Otherwise, performs a deeper comparison using file content and a custom comparator.
 *
 * @param {Object} firstEditSet - The first file edit set to compare.
 * @param {Object} secondEditSet - The second file edit set to compare.
 * @returns {boolean} True if the edit sets are equivalent, false otherwise.
 */
function areFileEditSetsEquivalent(firstEditSet, secondEditSet) {
  // Compare file paths first; if they differ, the sets are not equivalent
  if (firstEditSet.file_path !== secondEditSet.file_path) {
    return false;
  }

  // Check if both have the same number of edits and all edits match
  const editsAreEqual =
    firstEditSet.edits.length === secondEditSet.edits.length &&
    firstEditSet.edits.every((firstEdit, index) => {
      const secondEdit = secondEditSet.edits[index];
      // Ensure the corresponding edit exists and all properties match
      return (
        secondEdit !== undefined &&
        firstEdit.old_string === secondEdit.old_string &&
        firstEdit.new_string === secondEdit.new_string &&
        firstEdit.replace_all === secondEdit.replace_all
      );
    });

  if (editsAreEqual) {
    return true;
  }

  // If not identical, load file content if isBlobOrFileLikeObject exists, otherwise use empty string
  const fileSystem = f1();
  const fileContent = fileSystem.existsSync(firstEditSet.file_path)
    ? getFileContent(firstEditSet.file_path)
    : "";

  // Use areEditSequencesEquivalent to perform a deeper comparison with the file content
  return areEditSequencesEquivalent(firstEditSet.edits, secondEditSet.edits, fileContent);
}

module.exports = areFileEditSetsEquivalent;