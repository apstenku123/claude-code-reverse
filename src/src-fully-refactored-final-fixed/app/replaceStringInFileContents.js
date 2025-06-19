/**
 * Applies a string replacement edit to the provided file contents.
 *
 * This function prepares a single string replacement edit (with optional replaceAll)
 * and delegates the actual patching to applyFileEditsWithPatch. It is useful for
 * updating file contents by replacing a specific string with another.
 *
 * @param {Object} params - The parameters for the replacement operation.
 * @param {string} params.filePath - The path to the file being edited (for patch context).
 * @param {string} params.fileContents - The original contents of the file.
 * @param {string} params.oldString - The string to search for and replace.
 * @param {string} params.newString - The string to replace the old string with.
 * @param {boolean} [params.replaceAll=false] - Whether to replace all occurrences (true) or just the first (false).
 * @returns {any} The result of applyFileEditsWithPatch, typically the patched file contents or a patch object.
 */
function replaceStringInFileContents({
  filePath,
  fileContents,
  oldString,
  newString,
  replaceAll = false
}) {
  // Prepare the edit object for applyFileEditsWithPatch
  const edits = [{
    old_string: oldString,
    new_string: newString,
    replace_all: replaceAll
  }];

  // Delegate to applyFileEditsWithPatch (aliased as applyFileEditsWithPatch in original code)
  return applyFileEditsWithPatch({
    filePath,
    fileContents,
    edits
  });
}

module.exports = replaceStringInFileContents;