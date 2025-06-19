/**
 * Processes a list of string edits for a given file, applying additional string replacements
 * if the original string is not found in the file'createInteractionAccessor content but a mapped replacement is present.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.file_path - The path to the file being edited.
 * @param {Array<Object>} params.edits - The list of edits to apply. Each edit contains:
 *   - old_string: The string to be replaced.
 *   - new_string: The replacement string.
 *   - replace_all: Whether to replace all occurrences.
 * @returns {Object} An object containing the file_path and the processed edits array.
 */
function processFileEditsWithReplacements({ file_path, edits }) {
  // If there are no edits, return early
  if (edits.length === 0) {
    return {
      file_path,
      edits
    };
  }

  try {
    // Read the file content
    const fileContent = f3(file_path);
    // Get a list of all strings present in the file (or some processed form)
    const fileStrings = getFileContent(fileContent);

    return {
      file_path,
      edits: edits.map(({ old_string, new_string, replace_all }) => {
        // If the old_string is present in the file, keep the edit as is
        if (fileStrings.includes(old_string)) {
          return { old_string, new_string, replace_all };
        }

        // Otherwise, try to apply mapped string replacements
        const { result: mappedString, appliedReplacements } = applyReplacementsToString(old_string);

        if (fileStrings.includes(mappedString)) {
          // If the mapped string is present, apply the same replacements to the new_string
          let updatedNewString = new_string;
          for (const { from, to } of appliedReplacements) {
            updatedNewString = updatedNewString.replaceAll(from, to);
          }
          return {
            old_string: mappedString,
            new_string: updatedNewString,
            replace_all
          };
        }

        // If neither the original nor the mapped string is present, return the edit unchanged
        return { old_string, new_string, replace_all };
      })
    };
  } catch (error) {
    // Handle any errors that occur during processing
    reportErrorIfAllowed(error);
  }

  // In case of error, return the original input
  return {
    file_path,
    edits
  };
}

module.exports = processFileEditsWithReplacements;