/**
 * Reads the contents of a file as a UTF-8 encoded string asynchronously.
 *
 * @param {string} filePath - The path to the file to be read.
 * @returns {Promise<string>} a promise that resolves with the file contents as a string, or rejects with an error.
 */
function readFileAsUtf8(filePath) {
  return new Promise((resolve, reject) => {
    // Read the file asynchronously using UTF-8 encoding
    mQ9.readFile(filePath, "utf8", (error, data) => {
      if (error) {
        // Reject the promise if an error occurs
        reject(error);
      } else {
        // Resolve the promise with the file contents
        resolve(data);
      }
    });
  });
}

module.exports = readFileAsUtf8;