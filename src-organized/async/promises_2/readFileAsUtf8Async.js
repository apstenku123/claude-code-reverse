/**
 * Reads the contents of a file asynchronously using UTF-8 encoding.
 * Returns a Promise that resolves with the file contents as a string,
 * or rejects with an error if reading fails.
 *
 * @param {string} filePath - The path to the file to be read.
 * @returns {Promise<string>} a Promise that resolves with the file contents as a string.
 */
function readFileAsUtf8Async(filePath) {
  return new Promise((resolve, reject) => {
    // Read the file asynchronously with UTF-8 encoding
    mQ9.readFile(filePath, "utf8", (error, data) => {
      if (error) {
        // Reject the Promise if an error occurs
        reject(error);
      } else {
        // Resolve the Promise with the file contents
        resolve(data);
      }
    });
  });
}

module.exports = readFileAsUtf8Async;