/**
 * Returns an array with a single interaction entry if the provided file information is valid and not associated with text content.
 *
 * @param {Object} fileInfo - An object containing information about a file.
 * @param {string} fileInfo.filePath - The path to the file.
 * @param {string} [fileInfo.text] - Optional text content associated with the file.
 * @returns {Array<Object>} An array containing a single interaction entry if conditions are met, otherwise an empty array.
 */
function getOpenedFileInteractionEntries(fileInfo) {
  // If filePath is missing or text content exists, return an empty array
  if (!fileInfo?.filePath || fileInfo.text) {
    return [];
  }

  // Return an array with a single interaction entry for the opened file
  return [
    {
      type: "opened_file_in_ide",
      filename: fileInfo.filePath
    }
  ];
}

module.exports = getOpenedFileInteractionEntries;