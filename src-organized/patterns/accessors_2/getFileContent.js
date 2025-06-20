/**
 * Reads the content of a file using the byA.readFile method and returns its content.
 *
 * @param {string} filePath - The path to the file to be read.
 * @returns {string} The content of the file.
 */
function getFileContent(filePath) {
  // Destructure the 'content' property from the object returned by byA.readFile
  const { content } = byA.readFile(filePath);
  return content;
}

module.exports = getFileContent;