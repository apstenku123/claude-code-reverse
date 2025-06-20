/**
 * Reads the contents of a file as a UTF-8 encoded string.
 *
 * @param {string} filePath - The path to the file to be read.
 * @returns {string} The contents of the file as a UTF-8 string.
 */
const readFileAsUtf8 = (filePath) => {
  // Use LK2.readFileSync to synchronously read the file with UTF-8 encoding
  return LK2.readFileSync(filePath, "utf-8");
};

module.exports = readFileAsUtf8;
