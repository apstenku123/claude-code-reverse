/**
 * Creates an object representing a file with a unique identifier and display text.
 *
 * @param {string} fileName - The name or identifier of the file to be displayed.
 * @returns {{ id: string, displayText: string }} An object containing a unique file updateSnapshotAndNotify and the display text.
 */
function createFileDisplayObject(fileName) {
  return {
    // Unique file identifier using the provided file name
    id: `file-${fileName}`,
    // The display text for the file
    displayText: fileName
  };
}

module.exports = createFileDisplayObject;