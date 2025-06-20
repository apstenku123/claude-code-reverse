/**
 * Applies a series of string edits to file contents, ensuring no conflicting edits,
 * and generates a patch representing the changes.
 *
 * @param {Object} params - The parameters for the edit operation.
 * @param {string} params.filePath - The path to the file being edited.
 * @param {string} params.fileContents - The original contents of the file.
 * @param {Array<Object>} params.edits - An array of edit objects to apply.
 * @param {string} params.edits[].old_string - The string to be replaced.
 * @param {string} params.edits[].new_string - The string to replace with.
 * @param {boolean} [params.edits[].replace_all] - Whether to replace all occurrences.
 * @returns {Object} An object containing the generated patch and the updated file contents.
 * @throws {Error} If an edit is invalid or cannot be applied.
 */
function applyFileEditsWithPatch({
  filePath,
  fileContents,
  edits
}) {
  let updatedContents = fileContents;
  const previousNewStrings = [];

  for (const edit of edits) {
    // Remove trailing newlines from old_string for substring check
    const oldStringTrimmed = edit.old_string.replace(/\n+$/, "");

    // Prevent conflicting edits: old_string cannot be a substring of any previous new_string
    for (const prevNewString of previousNewStrings) {
      if (oldStringTrimmed !== "" && prevNewString.includes(oldStringTrimmed)) {
        throw new Error("Cannot edit file: old_string is a substring of a new_string from a previous edit.");
      }
    }

    const previousContents = updatedContents;

    // Apply the edit: if old_string is empty, just prepend new_string; otherwise, use replaceSubstringWithOptionalAll to replace
    updatedContents = edit.old_string === ""
      ? edit.new_string
      : replaceSubstringWithOptionalAll(updatedContents, edit.old_string, edit.new_string, edit.replace_all);

    // If nothing changed, the old string was not found
    if (updatedContents === previousContents) {
      throw new Error("String not found in file. Failed to apply edit.");
    }

    previousNewStrings.push(edit.new_string);
  }

  // If no changes were made, throw an error
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

module.exports = applyFileEditsWithPatch;