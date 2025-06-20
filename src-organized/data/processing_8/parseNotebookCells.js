/**
 * Parses a Jupyter notebook file and processes its cells.
 *
 * This function takes a path to a notebook file, validates isBlobOrFileLikeObject, reads its contents,
 * determines the notebook'createInteractionAccessor language, and then maps each cell through a processing function.
 *
 * @param {string} notebookPath - The file system path to the Jupyter notebook (.ipynb) file.
 * @returns {Array<any>} An array of processed notebook cells.
 * @throws {Error} If the notebook path is invalid or the file cannot be read/parsed.
 */
function parseNotebookCells(notebookPath) {
  // Resolve and validate the notebook file path
  const resolvedNotebookPath = getValidInteractionEntry(notebookPath);
  if (!resolvedNotebookPath) {
    throw new Error("Invalid notebook path");
  }

  // Read the notebook file contents as UTF-8 encoded text
  const fileSystem = f1();
  const notebookFileContents = fileSystem.readFileSync(resolvedNotebookPath, {
    encoding: "utf-8"
  });

  // Parse the notebook JSON structure
  const notebookJson = JSON.parse(notebookFileContents);

  // Extract the language name from notebook metadata, defaulting to 'python' if not present
  const languageName = notebookJson.metadata?.language_info?.name ?? "python";

  // Map each cell through the createCellMetadata processing function, passing cell, index, and language
  return notebookJson.cells.map((cell, cellIndex) => createCellMetadata(cell, cellIndex, languageName));
}

module.exports = parseNotebookCells;