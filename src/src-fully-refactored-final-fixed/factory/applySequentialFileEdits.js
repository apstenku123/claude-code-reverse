/**
 * Applies a sequence of string edits to file contents, ensuring no conflicting or duplicate edits.
 * Throws errors if edits are invalid or do not change the file.
 *
 * @param {Object} params - The parameters for the edit operation.
 * @param {string} params.filePath - The path of the file being edited.
 * @param {string} params.fileContents - The original contents of the file.
 * @param {Array<Object>} params.edits - An array of edit objects, each containing old_string, new_string, and options.
 * @returns {Object} An object containing the generated patch and the updated file contents.
 * @throws {Error} If an edit is invalid, not found, or results in no change.
 */
function applySequentialFileEdits({
  filePath,
  fileContents,
  edits
}) {
  let updatedContents = fileContents;
  const previousNewStrings = [];

  for (const edit of edits) {
    // Remove trailing newlines from old_string for comparison
    const trimmedOldString = edit.old_string.replace(/\n+$/, "");

    // Prevent conflicting edits: old_string cannot be a substring of any previous new_string
    for (const previousNewString of previousNewStrings) {
      if (
        trimmedOldString !== "" &&
        previousNewString.includes(trimmedOldString)
      ) {
        throw new Error(
          "Cannot edit file: old_string is a substring of a new_string from a previous edit."
        );
      }
    }

    const previousContents = updatedContents;

    // If old_string is empty, replace with new_string directly; otherwise, use replaceSubstringWithOptionalAll for replacement
    updatedContents =
      edit.old_string === ""
        ? edit.new_string
        : replaceSubstringWithOptionalAll(
            updatedContents,
            edit.old_string,
            edit.new_string,
            edit.replace_all
          );

    // If no change occurred, the old_string was not found
    if (updatedContents === previousContents) {
      throw new Error(
        "String not found in file. Failed to apply edit."
      );
    }

    // Track new_string to prevent future substring conflicts
    previousNewStrings.push(edit.new_string);
  }

  // If no edits actually changed the file, throw an error
  if (updatedContents === fileContents) {
    throw new Error(
      "Original and edited file match exactly. Failed to apply edit."
    );
  }

  return {
    patch: applyEditsAndGenerateDiffHunks({
      filePath,
      fileContents,
      edits: [
        {
          old_string: fileContents,
          new_string: updatedContents
        }
      ]
    }),
    updatedFile: updatedContents
  };
}

module.exports = applySequentialFileEdits;