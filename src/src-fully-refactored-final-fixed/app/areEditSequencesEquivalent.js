/**
 * Determines if two sequences of file edits are equivalent by comparing their structure and their effect on file contents.
 *
 * @param {Array<Object>} firstEditSequence - The first array of edit objects to compare. Each edit should have 'old_string', 'new_string', and 'replace_all' properties.
 * @param {Array<Object>} secondEditSequence - The second array of edit objects to compare.
 * @param {string} originalFileContents - The original file contents to which the edits will be applied.
 * @returns {boolean} True if the edit sequences are equivalent (produce the same result or same error), false otherwise.
 */
function areEditSequencesEquivalent(firstEditSequence, secondEditSequence, originalFileContents) {
  // First, check if both edit sequences are the same length and have identical edits
  const areEditsIdentical =
    firstEditSequence.length === secondEditSequence.length &&
    firstEditSequence.every((firstEdit, index) => {
      const secondEdit = secondEditSequence[index];
      return (
        secondEdit !== undefined &&
        firstEdit.old_string === secondEdit.old_string &&
        firstEdit.new_string === secondEdit.new_string &&
        firstEdit.replace_all === secondEdit.replace_all
      );
    });
  if (areEditsIdentical) {
    return true;
  }

  // Attempt to apply both edit sequences to the original file contents
  let firstEditResult = null;
  let firstEditError = null;
  let secondEditResult = null;
  let secondEditError = null;

  try {
    firstEditResult = applyFileEditsWithPatch({
      filePath: "temp",
      fileContents: originalFileContents,
      edits: firstEditSequence
    });
  } catch (error) {
    // Capture error message for first edit sequence
    firstEditError = error instanceof Error ? error.message : String(error);
  }

  try {
    secondEditResult = applyFileEditsWithPatch({
      filePath: "temp",
      fileContents: originalFileContents,
      edits: secondEditSequence
    });
  } catch (error) {
    // Capture error message for second edit sequence
    secondEditError = error instanceof Error ? error.message : String(error);
  }

  // If both edit applications failed, compare their error messages
  if (firstEditError !== null && secondEditError !== null) {
    return firstEditError === secondEditError;
  }

  // If only one edit application failed, the sequences are not equivalent
  if (firstEditError !== null || secondEditError !== null) {
    return false;
  }

  // Both edits succeeded; compare the resulting file contents
  return firstEditResult.updatedFile === secondEditResult.updatedFile;
}

module.exports = areEditSequencesEquivalent;