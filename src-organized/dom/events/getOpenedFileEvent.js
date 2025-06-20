/**
 * Returns an array containing an event object if a file is opened in the IDE and no text is present.
 *
 * @param {Object} fileEvent - The object containing file event details.
 * @param {string} fileEvent.filePath - The path to the file that was opened.
 * @param {string} [fileEvent.text] - The text content associated with the file event (if any).
 * @returns {Array<Object>} An array with a single event object if the file was opened without text, otherwise an empty array.
 */
function getOpenedFileEvent(fileEvent) {
  // If filePath is missing or text is present, return an empty array (no event)
  if (!fileEvent?.filePath || fileEvent.text) {
    return [];
  }

  // Return an array with the opened_file_in_ide event object
  return [
    {
      type: "opened_file_in_ide",
      filename: fileEvent.filePath
    }
  ];
}

module.exports = getOpenedFileEvent;