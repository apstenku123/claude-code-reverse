/**
 * Applies a series of string edits to the contents of a file and generates a patch.
 *
 * Each edit replaces an old substring with a new substring. The function ensures that:
 * - No edit'createInteractionAccessor old_string is a substring of any new_string from previous edits (to prevent overlap/conflicts).
 * - Each edit must actually change the file contents; otherwise, an error is thrown.
 * - The final result must differ from the original contents.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.filePath - The path to the file being edited.
 * @param {string} params.fileContents - The original contents of the file.
 * @param {Array<Object>} params.edits - The list of edits to apply. Each edit is an object with:
 *   - old_string {string}: The substring to replace.
 *   - new_string {string}: The substring to insert.
 *   - replace_all {boolean}: Whether to replace all occurrences (optional).
 * @returns {Object} An object containing the generated patch and the updated file contents.
 * @throws {Error} If an edit'createInteractionAccessor old_string is a substring of a previous new_string, if an edit does not change the file, or if the final result matches the original contents.
 */
function applyEditsToFileContents({
  filePath,
  fileContents,
  edits
}) {
  let updatedContents = fileContents;
  const previousNewStrings = [];

  for (const edit of edits) {
    // Remove trailing newlines from old_string for comparison
    const oldStringTrimmed = edit.old_string.replace(/\n+$/, "");

    // Prevent overlapping/conflicting edits: old_string cannot be a substring of any previous new_string
    for (const prevNewString of previousNewStrings) {
      if (oldStringTrimmed !== "" && prevNewString.includes(oldStringTrimmed)) {
        throw new Error("Cannot edit file: old_string is a substring of a new_string from a previous edit.");
      }
    }

    const beforeEdit = updatedContents;

    // If old_string is empty, just insert new_string; otherwise, replace old_string with new_string
    updatedContents = edit.old_string === ""
      ? edit.new_string
      : replaceSubstringWithOptionalAll(updatedContents, edit.old_string, edit.new_string, edit.replace_all);

    // If nothing changed, the old_string was not found
    if (updatedContents === beforeEdit) {
      throw new Error("String not found in file. Failed to apply edit.");
    }

    previousNewStrings.push(edit.new_string);
  }

  // If no edits were applied (contents are unchanged), throw an error
  if (updatedContents === fileContents) {
    throw new Error("Original and edited file match exactly. Failed to apply edit.");
  }

  return {
    patch: applyEditsAndGenerateDiffHunks({
      filePath,
      fileContents,
      edits: [{
        old_string: fileContents,
        new_string: updatedContents
      }]
    }),
    updatedFile: updatedContents
  };
}

module.exports = applyEditsToFileContents;